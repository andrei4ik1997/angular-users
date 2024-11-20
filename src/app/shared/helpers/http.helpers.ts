import { HttpErrorResponse } from '@angular/common/http';
import type { Observable } from 'rxjs';
import { of } from 'rxjs';

export function isHttpErrorResponse<T>(resp: HttpErrorResponse | T): resp is HttpErrorResponse {
	return resp instanceof HttpErrorResponse;
}

export function handleHttpError<ReturnType = HttpErrorResponse>(operation: string, returnValue?: ReturnType) {
	return (error: HttpErrorResponse): Observable<ReturnType> => {
		if (error.status === 0) {
			console.error('%s error: %o', operation, error);
		} else {
			console.error('%s server error; code: %d, error body: %o', operation, error.status, error);
		}

		return of(returnValue ?? (error as ReturnType));
	};
}
