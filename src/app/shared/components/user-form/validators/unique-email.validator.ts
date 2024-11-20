import type { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { isHttpErrorResponse } from '@shared-helpers';
import type { UsersApiService, UsersUiService } from '@shared-services';
import { map, of, take } from 'rxjs';

import { VALIDATOR_ERROR_CODE } from '../entities/constants';

export function uniqueEmailValidator(
	usersApiService: UsersApiService,
	usersUiService: UsersUiService
): AsyncValidatorFn {
	return (control: AbstractControl<string>) => {
		const email = control.value.trim();

		if (email.length === 0) {
			return of(null);
		}

		const isUserExist = usersUiService.usersSignal().some((user) => {
			return user.email === email;
		});

		if (isUserExist) {
			return of({ [VALIDATOR_ERROR_CODE.isExist]: true });
		}

		return usersApiService.getUsersByEmail(email).pipe(
			take(1),
			map((response) => {
				const isError = isHttpErrorResponse(response);

				if (!isError) {
					return response.length === 0 ? null : { [VALIDATOR_ERROR_CODE.isExist]: true };
				}

				return null;
			})
		);
	};
}
