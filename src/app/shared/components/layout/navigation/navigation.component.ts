import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import type { RouterPageLink } from '@shared-types';
import { NzMenuDirective, NzMenuItemComponent } from 'ng-zorro-antd/menu';
import { filter } from 'rxjs';

import { NAVIGATION_LIST } from './navigation-list.constant';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrl: './navigation.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [NzMenuDirective, NzMenuItemComponent, RouterLink],
})
export class NavigationComponent {
	private readonly router = inject(Router);
	private readonly activatedRoute = inject(ActivatedRoute);
	private readonly changeDetectorRef = inject(ChangeDetectorRef);

	protected readonly navigationList = NAVIGATION_LIST;

	constructor() {
		this.router.events
			.pipe(
				filter((event) => {
					return event instanceof NavigationEnd;
				}),
				takeUntilDestroyed()
			)
			.subscribe(() => {
				this.changeDetectorRef.detectChanges();
			});
	}

	protected isRouteActive(link: RouterPageLink): boolean {
		return this.router.isActive(
			this.router.createUrlTree([link], {
				relativeTo: this.activatedRoute,
			}),
			{
				paths: 'subset',
				queryParams: 'ignored',
				fragment: 'ignored',
				matrixParams: 'ignored',
			}
		);
	}
}
