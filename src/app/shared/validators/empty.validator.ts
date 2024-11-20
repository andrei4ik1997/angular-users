import type { AbstractControl, ValidatorFn } from '@angular/forms';
import { VALIDATOR_ERROR_CODE } from '@shared-constants';

export function emptyStringValidator(): ValidatorFn {
	return (control: AbstractControl<string>) => {
		const value = control.value;

		if (value.trim().length === 0) {
			return { [VALIDATOR_ERROR_CODE.empty]: true };
		}

		return null;
	};
}
