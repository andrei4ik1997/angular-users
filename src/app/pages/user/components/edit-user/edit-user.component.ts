import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, numberAttribute, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { NoResultComponent, UserFormComponent } from '@shared-components';
import { EXTRAS_STATE_USER_DATA_KEY } from '@shared-constants';
import { isHttpErrorResponse, isNil } from '@shared-helpers';
import type { UserDTO } from '@shared-models';
import { CommonService, UsersUiService } from '@shared-services';

@Component({
	selector: 'app-edit-user',
	templateUrl: './edit-user.component.html',
	styleUrl: './edit-user.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [NoResultComponent, UserFormComponent],
})
export default class EditUserComponent implements OnInit {
	private readonly commonService = inject(CommonService);
	private readonly usersUiService = inject(UsersUiService);
	private readonly destroyRef = inject(DestroyRef);
	private readonly router = inject(Router);

	public readonly userId = input(null, { alias: 'userID', transform: numberAttribute });

	protected readonly user = signal<UserDTO | null>(null);
	protected readonly isError = signal(false);

	public ngOnInit(): void {
		const routerExtrasUserData = (this.router.lastSuccessfulNavigation?.extras.state?.[
			EXTRAS_STATE_USER_DATA_KEY
		] ?? null) as UserDTO | null;

		if (isNil(routerExtrasUserData)) {
			this.getUser();
		} else {
			this.user.set(routerExtrasUserData);
			this.commonService.setPageTitle(routerExtrasUserData.name);
		}
	}

	protected retry(): void {
		this.getUser();
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
