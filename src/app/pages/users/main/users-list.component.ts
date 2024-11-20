import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { LOCAL_STORAGE_KEYS, PAGE_ROUTES } from '@shared-constants';
import type { UserDTO } from '@shared-models';
import { CommonService, LocalStorageService, StoreService, UsersUiService } from '@shared-services';

import { UsersTableComponent } from '../components/users-table/users-table.component';

@Component({
	selector: 'app-users-list',
	templateUrl: './users-list.component.html',
	styleUrl: './users-list.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [UsersTableComponent],
})
export default class UsersListComponent implements OnInit {
	private readonly usersUiService = inject(UsersUiService);
	private readonly storeService = inject(StoreService);
	private readonly commonService = inject(CommonService);
	private readonly destroyRef = inject(DestroyRef);
	private readonly localStorageService = inject(LocalStorageService);

	protected readonly usersSignal = this.usersUiService.usersSignal;
	protected readonly loading = toSignal(this.storeService.loading$, { initialValue: false });

	public ngOnInit(): void {
		const users = this.localStorageService.get<UserDTO[]>(LOCAL_STORAGE_KEYS.users) ?? [];

		if (users.length === 0) {
			this.getUsers();
		}
	}

	protected retry(): void {
		this.getUsers();
	}

	protected addUser(): void {
		this.commonService.navigateByUrl(`${PAGE_ROUTES.user}/${PAGE_ROUTES.add}`);
	}

	private getUsers(): void {
		this.usersUiService
			.getUsers()
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(() => {});
	}
}
