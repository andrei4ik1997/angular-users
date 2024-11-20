import { inject, Injectable } from '@angular/core';
import type { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { isHttpErrorResponse } from '@shared-helpers';
import { UsersApiService, UsersUiService } from '@shared-services';
import type { Observable } from 'rxjs';
import { map, of } from 'rxjs';

import { VALIDATOR_ERROR_CODE } from '../entities/constants';

@Injectable()
export class UniqueUserNameValidator implements AsyncValidator {
	private readonly usersApiService = inject(UsersApiService);
	private readonly usersUiService = inject(UsersUiService);

	public validate(
		control: AbstractControl<string>
	): Observable<ValidationErrors | null> | Promise<ValidationErrors | null> {
		const username = control.value.trim();

		if (username.length === 0) {
			return of(null);
		}

		const isUserExist = this.usersUiService.usersSignal().some((user) => {
			return user.username === username;
		});

		if (isUserExist) {
			return of({ [VALIDATOR_ERROR_CODE.isExist]: true });
		}

		return this.usersApiService.getUsersByUsername(username).pipe(
			map((response) => {
				const isError = isHttpErrorResponse(response);

				if (!isError) {
					return response.length === 0 ? null : { [VALIDATOR_ERROR_CODE.isExist]: true };
				}

				return null;
			})
		);
	}
}
