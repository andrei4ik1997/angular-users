import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, numberAttribute, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { AddressPipe } from '@pages/user/pipes/address.pipe';
import { GoogleMapLinkPipe } from '@pages/user/pipes/google-map.pipe';
import { NoResultComponent } from '@shared-components';
import { EXTRAS_STATE_USER_DATA_KEY, PAGE_ROUTES } from '@shared-constants';
import { isHttpErrorResponse, isNil } from '@shared-helpers';
import type { UserDTO } from '@shared-models';
import { CommonService, StoreService, UsersUiService } from '@shared-services';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzCardComponent, NzCardMetaComponent } from 'ng-zorro-antd/card';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { NzFlexDirective } from 'ng-zorro-antd/flex';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSkeletonComponent } from 'ng-zorro-antd/skeleton';

@Component({
	selector: 'app-user-details',
	templateUrl: './user-details.component.html',
	styleUrl: './user-details.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [
		NzCardComponent,
		NzCardMetaComponent,
		NzSkeletonComponent,
		NzIconDirective,
		NzFlexDirective,
		NzButtonComponent,
		NzDividerComponent,
		NzPopconfirmModule,
		GoogleMapLinkPipe,
		AddressPipe,
		NoResultComponent,
	],
})
export default class UserDetailsComponent implements OnInit {
	private readonly storeService = inject(StoreService);
	private readonly usersUiService = inject(UsersUiService);
	private readonly destroyRef = inject(DestroyRef);
	private readonly commonService = inject(CommonService);

	public readonly userId = input(null, { alias: 'userID', transform: numberAttribute });

	protected readonly loading = toSignal(this.storeService.loading$, { initialValue: false });
	protected readonly user = signal<UserDTO | null>(null);
	protected readonly isError = signal(false);

	protected readonly deleteUserPopupMessage = 'Are you sure to delete this user?' as const;

	public ngOnInit(): void {
		this.getUser();
	}

	protected retry(): void {
		this.getUser();
	}

	protected editUser(): void {
		const user = this.user();

		if (!isNil(user)) {
			this.commonService.navigateByUrl(`${PAGE_ROUTES.user}/${user.id}/${PAGE_ROUTES.edit}`, {
				state: {
					[EXTRAS_STATE_USER_DATA_KEY]: structuredClone(user),
				},
			});
		}
	}

	protected deleteUser(): void {
		const user = this.user();

		if (!isNil(user)) {
			this.usersUiService
				.deleteUser(user.id)
				.pipe(takeUntilDestroyed(this.destroyRef))
				.subscribe((response) => {
					const isError = isHttpErrorResponse(response);

					if (isError) {
						this.commonService.showNotification('error', 'Delete User Error');
					} else {
						this.commonService.navigateByUrl(PAGE_ROUTES.users);
						this.commonService.showNotification('success', 'User was successfully deleted');
					}
				});
		}
	}

	private getUser(): void {
		this.isError.set(false);

		const userId = this.userId();

		if (isNil(userId)) {
			this.isError.set(true);
		} else {
			this.usersUiService
				.getUser(userId)
				.pipe(takeUntilDestroyed(this.destroyRef))
				.subscribe((response) => {
					const isError = isHttpErrorResponse(response);

					if (isError) {
						this.isError.set(true);
						this.commonService.showNotification('error', 'Get User Error');
					} else {
						this.user.set(response);
						this.commonService.setPageTitle(response.name);
					}
				});
		}
	}
}
