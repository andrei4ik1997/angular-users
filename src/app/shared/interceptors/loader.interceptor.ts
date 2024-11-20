import type { HttpInterceptorFn } from '@angular/common/http';
import { HttpEventType } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

import { StoreService } from '../services';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
	const storeService = inject(StoreService);

	storeService.setLoading(true);

	return next(req).pipe(
		tap((res) => {
			if (res.type === HttpEventType.Response) {
				storeService.setLoading(false);
			}
		})
	);
};
