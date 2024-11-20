import type { FormControl, FormGroup } from '@angular/forms';
import type { LOCAL_STORAGE_KEYS, PAGE_ROUTES, PAGE_TITLES } from '@shared-constants';

export type RouterPageLink = (typeof PAGE_ROUTES)[keyof typeof PAGE_ROUTES];
export type RouterPageName = (typeof PAGE_TITLES)[keyof typeof PAGE_TITLES];

export type ToFormGroupType<T> = FormGroup<{
	[key in keyof T]: T[key] extends object ? ToFormGroupType<T[key]> : FormControl<T[key]>;
}>;

export type LocalStorageKeys = (typeof LOCAL_STORAGE_KEYS)[keyof typeof LOCAL_STORAGE_KEYS];
