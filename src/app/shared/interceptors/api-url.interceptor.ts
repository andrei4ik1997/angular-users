import type { HttpInterceptorFn } from '@angular/common/http';

export const apiUrlInterceptor: HttpInterceptorFn = (req, next) => {
	const baseUrl = 'https://jsonplaceholder.typicode.com';

	const newReq = req.clone({
		url: `${baseUrl}/${req.url}`,
	});

	return next(newReq);
};
