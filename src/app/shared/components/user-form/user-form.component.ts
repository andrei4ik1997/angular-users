import { ChangeDetectionStrategy, Component, DestroyRef, effect, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PAGE_ROUTES } from '@shared-constants';
import { isHttpErrorResponse, isNil } from '@shared-helpers';
import type { CreateUserDTO, UserDTO } from '@shared-models';
import { CommonService, StoreService, UsersApiService, UsersUiService } from '@shared-services';
import { emptyStringValidator } from '@shared-validators';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { NzFlexDirective } from 'ng-zorro-antd/flex';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputGroupComponent } from 'ng-zorro-antd/input';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';

import { COUNTRY_PHONE_PREFIXES, FORM_FIELDS, VALIDATOR_ERROR_CODE } from './entities/constants';
import type { CountryPrefixesType, UserForm, UserFormValue } from './entities/types';
import { uniqueEmailValidator } from './validators/unique-email.validator';
import { UniqueUserNameValidator } from './validators/unique-username.validator';

@Component({
	selector: 'app-user-form',
	templateUrl: './user-form.component.html',
	styleUrl: './user-form.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [
		ReactiveFormsModule,
		NzFormModule,
		NzButtonComponent,
		NzInputGroupComponent,
		NzSelectComponent,
		NzOptionComponent,
		NzGridModule,
		NzDividerComponent,
		NzFlexDirective,
	],
	providers: [UniqueUserNameValidator],
})
export class UserFormComponent {
	private readonly uniqueUserNameValidator = inject(UniqueUserNameValidator);
	private readonly usersApiService = inject(UsersApiService);
	private readonly usersUiService = inject(UsersUiService);
	private readonly destroyRef = inject(DestroyRef);
	private readonly storeService = inject(StoreService);
	private readonly commonService = inject(CommonService);
	private readonly router = inject(Router);

	private readonly initialFormValues = signal<UserFormValue | null>(null);

	private readonly uniqueAsyncEmailValidator = uniqueEmailValidator(this.usersApiService, this.usersUiService);
	private readonly uniqueAsyncUserNameValidator = this.uniqueUserNameValidator.validate.bind(
		this.uniqueUserNameValidator
	);

	public readonly user = input<UserDTO | null>(null);
	public readonly isEditMode = input<boolean>(false);

	protected readonly loading = toSignal(this.storeService.loading$, { initialValue: false });

	protected readonly formFields = FORM_FIELDS;
	protected readonly validatorErrorCode = VALIDATOR_ERROR_CODE;
	protected readonly phonePrefixes = Object.entries(COUNTRY_PHONE_PREFIXES);

	protected readonly userFormGroup: UserForm = new FormGroup({
		[this.formFields.firstName]: new FormControl('', {
			nonNullable: true,
			validators: [Validators.required, emptyStringValidator()],
		}),
		[this.formFields.lastName]: new FormControl('', {
			nonNullable: true,
			validators: [Validators.required, emptyStringValidator()],
		}),
		[this.formFields.username]: new FormControl('', {
			nonNullable: true,
			validators: [Validators.required, emptyStringValidator()],
			asyncValidators: [this.uniqueAsyncUserNameValidator],
			updateOn: 'blur',
		}),
		[this.formFields.email]: new FormControl('', {
			nonNullable: true,
			validators: [Validators.email],
			asyncValidators: [this.uniqueAsyncEmailValidator],
			updateOn: 'blur',
		}),
		[this.formFields.phone]: new FormGroup({
			[this.formFields.phonePrefix]: new FormControl<CountryPrefixesType>(COUNTRY_PHONE_PREFIXES.None, {
				nonNullable: true,
			}),
			[this.formFields.phoneNumber]: new FormControl('', {
				nonNullable: true,
			}),
		}),
		[this.formFields.website]: new FormControl('', {
			nonNullable: true,
		}),
		[this.formFields.address]: new FormGroup({
			[this.formFields.city]: new FormControl('', { nonNullable: true }),
			[this.formFields.street]: new FormControl('', { nonNullable: true }),
			[this.formFields.suite]: new FormControl('', { nonNullable: true }),
			[this.formFields.zipcode]: new FormControl('', { nonNullable: true }),
		}),
		[this.formFields.company]: new FormGroup({
			[this.formFields.companyName]: new FormControl('', {
				nonNullable: true,
			}),
			[this.formFields.companyBs]: new FormControl('', {
				nonNullable: true,
			}),
			[this.formFields.companyCatchPhrase]: new FormControl('', {
				nonNullable: true,
			}),
		}),
	});

	constructor() {
		effect(
			() => {
				const user = this.user();

				if (!isNil(user)) {
					this.setDataToForm(user);
				}
			},
			{ allowSignalWrites: true }
		);
	}

	protected confirm(): void {
		if (this.isEditMode()) {
			this.editUser();
		} else {
			this.addUser();
		}
	}

	protected resetForm(): void {
		this.removeAsyncValidators();

		this.userFormGroup.reset(this.initialFormValues() ?? {});

		this.addAsyncValidators();
	}

	private addUser(): void {
		const body = this.getBody();

		this.usersUiService
			.addUser(body)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe((response) => {
				const isError = isHttpErrorResponse(response);

				if (isError) {
					this.commonService.showNotification('error', 'Add User Error');
				} else {
					this.resetForm();
					this.commonService.showNotification('info', 'User was successfully added');
				}
			});
	}

	private editUser(): void {
		const user = this.user();

		if (isNil(user)) {
			return;
		}

		const body = this.getBody();

		this.usersUiService
			.updateUser(user.id, body)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe((response) => {
				const isError = isHttpErrorResponse(response);

				if (isError) {
					this.commonService.showNotification('error', 'Update User Error');
				} else {
					this.resetForm();

					this.commonService.showNotification('info', 'User was successfully updated');
					void this.router.navigateByUrl(`${PAGE_ROUTES.user}/${user.id}`);
				}
			});
	}

	private getBody(): CreateUserDTO {
		const formValue: UserFormValue = this.userFormGroup.getRawValue();
		const phonePrefix =
			formValue.phone.phonePrefix === COUNTRY_PHONE_PREFIXES.None ? '' : formValue.phone.phonePrefix;
		const phoneNumber =
			formValue.phone.phoneNumber.trim().length === 0
				? ''
				: `${phonePrefix}${formValue.phone.phoneNumber.trim()}`;

		const body: CreateUserDTO = {
			address: {
				city: formValue.address.city.trim(),
				street: formValue.address.city.trim(),
				suite: formValue.address.city.trim(),
				zipcode: formValue.address.city.trim(),
				geo: this.generateRandomCoordinates(formValue.address),
			},
			company: {
				bs: formValue.company.companyBs.trim(),
				catchPhrase: formValue.company.companyCatchPhrase.trim(),
				name: formValue.company.companyName.trim(),
			},
			email: formValue.email.trim(),
			name: `${formValue.firstName.trim()} ${formValue.lastName.trim()}}`,
			phone: phoneNumber,
			username: formValue.username.trim(),
			website: formValue.website.trim(),
		};

		return body;
	}

	private setDataToForm(user: UserDTO): void {
		const [firstName, ...lastName] = user.name.split(' ');
		const phone = this.extractCountryCode(user.phone);

		const formValue: UserFormValue = {
			address: {
				city: user.address.city,
				street: user.address.street,
				suite: user.address.suite,
				zipcode: user.address.zipcode,
			},
			company: {
				companyBs: user.company.bs,
				companyCatchPhrase: user.company.catchPhrase,
				companyName: user.company.name,
			},
			email: user.email,
			firstName,
			lastName: lastName.join(' '),
			phone: {
				phoneNumber: phone.phoneNumber,
				phonePrefix: phone.phonePrefix,
			},
			username: user.username,
			website: user.website,
		};

		this.initialFormValues.set(formValue);

		this.removeAsyncValidators();

		this.userFormGroup.setValue(formValue);

		this.addAsyncValidators();
	}

	private removeAsyncValidators(): void {
		this.userFormGroup.controls.username.removeAsyncValidators(this.uniqueAsyncUserNameValidator);
		this.userFormGroup.controls.email.removeAsyncValidators(this.uniqueAsyncEmailValidator);
		this.userFormGroup.updateValueAndValidity();
	}

	private addAsyncValidators(): void {
		this.userFormGroup.controls.username.addAsyncValidators(this.uniqueAsyncUserNameValidator);
		this.userFormGroup.controls.email.addAsyncValidators(this.uniqueAsyncEmailValidator);
		this.userFormGroup.updateValueAndValidity();
	}

	private generateRandomCoordinates(address: Omit<UserDTO['address'], 'geo'>): UserDTO['address']['geo'] {
		if (address.city.trim().length === 0) {
			return { lat: '', lng: '' };
		}

		const fixedNumber = 6;
		const maxLatitude = 90;
		const maxLongitude = 180;
		const fullCircle = 360;

		const latitude = (Math.random() * maxLatitude).toFixed(fixedNumber);
		const longitude = (Math.random() * fullCircle - maxLongitude).toFixed(fixedNumber);

		return { lat: latitude, lng: longitude };
	}

	private extractCountryCode(phoneNumber: string): UserFormValue['phone'] {
		for (const [, prefix] of Object.entries(COUNTRY_PHONE_PREFIXES)) {
			if (phoneNumber.startsWith(prefix)) {
				const restOfNumber = phoneNumber.slice(prefix.length);

				return { phonePrefix: prefix, phoneNumber: restOfNumber };
			}
		}

		return { phonePrefix: COUNTRY_PHONE_PREFIXES.None, phoneNumber };
	}
}
