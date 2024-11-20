import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import type { NavigationBehaviorOptions } from '@angular/router';
import { Router } from '@angular/router';
import type { NzNotificationDataOptions } from 'ng-zorro-antd/notification';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable()
export class CommonService {
	private readonly title = inject(Title);
	private readonly nzNotificationService = inject(NzNotificationService);
	private readonly router = inject(Router);

	public setPageTitle(title: string): void {
		this.title.setTitle(title);
	}

	public showNotification(
		type: 'blank' | 'error' | 'info' | 'success' | 'warning',
		title: string,
		content: string = '',
		options: NzNotificationDataOptions = {}
	): void {
		this.nzNotificationService.create(type, title, content, options);
	}

	public navigateByUrl(link: string, extras?: NavigationBehaviorOptions): void {
		void this.router.navigateByUrl(`/${link}`, extras);
	}
}
