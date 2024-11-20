import type { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse, HttpEventType, HttpStatusCode } from '@angular/common/http';
import { map } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
	return next(req).pipe(
		map((res) => {
			if (res.type === HttpEventType.Response) {
				if (res.status === (HttpStatusCode.NotFound as number)) {
					// eslint-disable-next-line @typescript-eslint/only-throw-error
					throw new HttpErrorResponse({ error: 'Error response' });
				}

				return res;
			}

			return res;
		})
	);
};
