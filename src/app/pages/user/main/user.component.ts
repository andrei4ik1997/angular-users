import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { PAGE_ROUTES } from '@shared-constants';
import { CommonService } from '@shared-services';
import { filter } from 'rxjs';

@Component({
	selector: 'app-user',
	template: '<router-outlet />',
	styleUrl: './user.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [RouterOutlet],
})
export default class UserComponent {
	private readonly router = inject(Router);
	private readonly commonService = inject(CommonService);

	constructor() {
		this.router.events
			.pipe(
				filter((event) => {
					return event instanceof NavigationEnd;
				}),
				takeUntilDestroyed()
			)
			.subscribe(() => {
				if (this.router.url === `/${PAGE_ROUTES.user}`) {
					this.commonService.navigateByUrl(PAGE_ROUTES.notFound);
				}
			});
	}
}
