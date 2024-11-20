import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { PAGE_ROUTES } from '@shared-constants';
import type { UserDTO } from '@shared-models';

import type { TableColumnConfig } from '../types/users-table.types';

export const COLUMNS_CONFIG = (data: UserDTO[]): TableColumnConfig[] => {
	const uniqCompanySet = new Set<string>();
	const uniqCitiesSet = new Set<string>();

	data.forEach((item) => {
		uniqCompanySet.add(item.company.name);
		uniqCitiesSet.add(item.address.city);
	});

	const uniqCompanies = [...uniqCompanySet].sort((a, b) => {
		return a.localeCompare(b);
	});
	const uniqCities = [...uniqCitiesSet].sort((a, b) => {
		return a.localeCompare(b);
	});

	return [
		{
			name: 'Name',
			showSort: true,
			sortOrder: 'ascend',
			sortFn: (a, b) => {
				return a.name.localeCompare(b.name);
			},
			isCustomFilter: true,
			dataProperty: 'name',
		},
		{
			name: 'Username',
			showSort: true,
			sortFn: (a, b) => {
				return a.username.localeCompare(b.username);
			},
			dataProperty: 'username',
		},
		{
			name: 'Phone',
			dataProperty: 'phone',
		},
		{
			name: 'Company',
			showSort: true,
			sortFn: (a, b) => {
				return a.company.name.localeCompare(b.company.name);
			},
			listOfFilter: uniqCompanies.map((company) => {
				return { text: company, value: company };
			}),
			filterMultiple: true,
			filterFn: (checkedCompany: string[] | string, row) => {
				if (Array.isArray(checkedCompany)) {
					return checkedCompany.some((company) => {
						return row.company.name === company;
					});
				}

				return row.company.name === checkedCompany;
			},
			dataProperty: 'company',
			additionalDataProperty: 'name',
		},
		{
			name: 'City',
			showSort: true,
			sortFn: (a, b) => {
				return a.address.city.localeCompare(b.address.city);
			},
			listOfFilter: uniqCities.map((city) => {
				return { text: city, value: city };
			}),
			filterMultiple: true,
			filterFn: (checkedCity: string[] | string, row) => {
				if (Array.isArray(checkedCity)) {
					return checkedCity.some((city) => {
						return row.address.city === city;
					});
				}

				return row.address.city === checkedCity;
			},
			dataProperty: 'address',
			additionalDataProperty: 'city',
		},
		{
			name: 'Email',
			showSort: true,
			sortFn: (a, b) => {
				return a.email.localeCompare(b.email);
			},
			dataProperty: 'email',
		},
		{
			name: 'Action',
			type: 'button',
			dataProperty: null,
			icon: 'user',
			text: 'Details',
			actionFn: (_, userData) => {
				void inject(Router).navigateByUrl(`${PAGE_ROUTES.user}/${userData.id}`);
			},
			cellAlign: 'center',
		},
	];
};
