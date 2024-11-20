import type { ToFormGroupType } from '@shared-types';

import type { COUNTRY_PHONE_PREFIXES } from './constants';

export type CountryPrefixesType = (typeof COUNTRY_PHONE_PREFIXES)[keyof typeof COUNTRY_PHONE_PREFIXES];

export type UserFormValue = {
	address: {
		city: string;
		street: string;
		suite: string;
		zipcode: string;
	};
	company: { companyBs: string; companyCatchPhrase: string; companyName: string };
	email: string;
	firstName: string;
	lastName: string;
	phone: {
		phoneNumber: string;
		phonePrefix: CountryPrefixesType;
	};
	username: string;
	website: string;
};

export type UserForm = ToFormGroupType<UserFormValue>;
