import { ENVIRONMENT_INITIALIZER, inject } from '@angular/core';
import {
	CommonService,
	LazyStylesService,
	LocalStorageService,
	StoreService,
	UsersApiService,
	UsersStoreService,
	UsersUiService,
} from '@shared-services';

export const ENVIRONMENT_INITIALIZERS = [
	{
		provide: ENVIRONMENT_INITIALIZER,
		multi: true,
		useValue(): void {
			inject(LazyStylesService).loadStyles();
		},
	},
];

export const SERVICES = [
	StoreService,
	LocalStorageService,
	CommonService,
	UsersUiService,
	UsersStoreService,
	UsersApiService,
	LazyStylesService,
];
