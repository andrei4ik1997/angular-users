import {
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	Injector,
	input,
	output,
	runInInjectionContext,
	signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { COLUMNS_CONFIG } from '@pages/users/entities/constants/users-table.constants';
import { NoResultComponent } from '@shared-components';
import { isNil } from '@shared-helpers';
import type { UserDTO } from '@shared-models';
import { emptyStringValidator } from '@shared-validators';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzFlexDirective } from 'ng-zorro-antd/flex';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';

import type { TableColumnConfig } from '../../entities/types/users-table.types';

@Component({
	selector: 'app-users-table',
	templateUrl: './users-table.component.html',
	styleUrl: './users-table.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [
		NzTableModule,
		NzButtonComponent,
		NzDropdownMenuComponent,
		NzFlexDirective,
		NzIconDirective,
		NzInputDirective,
		ReactiveFormsModule,
		NoResultComponent,
		NzTooltipDirective,
	],
})
export class UsersTableComponent {
	private readonly injector = inject(Injector);

	public readonly loading = input.required<boolean, boolean | null>({ transform: booleanAttribute });
	public readonly data = input.required<UserDTO[], UserDTO[] | null>({
		transform: (value) => {
			if (isNil(value)) {
				return [];
			}

			return value;
		},
	});

	protected readonly onRetry = output();
	protected readonly onAddUser = output();

	protected readonly searchFormControl = new FormControl('', {
		nonNullable: true,
		validators: [emptyStringValidator()],
	});

	protected readonly searchNameValue = signal('');
	protected readonly isVisibleSearchUserMenu = signal(false);
	protected readonly selectedTableFilters = signal(new Map<TableColumnConfig['name'], string[]>());

	protected readonly tableData = computed(() => {
		const data = this.data();
		const searchNameValue = this.searchNameValue();

		if (searchNameValue.trim().length === 0 || data.length === 0) {
			return data;
		}

		return data.filter((user) => {
			return user.name.toLowerCase().includes(searchNameValue.toLowerCase());
		});
	});

	protected readonly tableColumnsConfig = computed(() => {
		if (this.selectedTableFilters().size === 0) {
			return COLUMNS_CONFIG(this.data());
		}

		return [];
	});

	protected filterChanged(columnName: TableColumnConfig['name'], value: string[] | string): void {
		const currentFilters = this.selectedTableFilters();

		const filters = Array.isArray(value) ? value : [value];

		if (filters.length === 0) {
			currentFilters.delete(columnName);
		} else {
			currentFilters.set(columnName, filters);
		}

		this.selectedTableFilters.set(currentFilters);
	}

	protected clearFilters(): void {
		this.searchFormControl.reset();
		this.searchNameValue.set('');
		this.selectedTableFilters.set(new Map());
	}

	protected changeVisibilitySearchUserMenu(isVisible: boolean): void {
		this.isVisibleSearchUserMenu.set(isVisible);
	}

	protected resetSearchUsername(): void {
		this.searchFormControl.reset();
		this.searchByUsername();
	}

	protected searchByUsername(): void {
		const searchControlValue = this.searchFormControl.value;

		this.searchNameValue.set(searchControlValue);
		this.changeVisibilitySearchUserMenu(false);
		this.filterChanged('Username', searchControlValue.length === 0 ? [] : [searchControlValue]);
	}

	protected retry(): void {
		this.clearFilters();

		this.onRetry.emit();
	}

	protected addUser(): void {
		this.onAddUser.emit();
	}

	protected test($event: MouseEvent, column: TableColumnConfig, userData: UserDTO): void {
		runInInjectionContext(this.injector, () => {
			if (column.actionFn !== undefined) {
				return column.actionFn($event, userData);
			}
		});
	}
}
