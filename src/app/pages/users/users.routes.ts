import type { Routes } from '@angular/router';
import { PAGE_TITLES } from '@shared-constants';

const usersRoutes: Routes = [
	{
		path: '',
		loadComponent: async () => {
			return import('./main/users-list.component');
		},
		title: PAGE_TITLES.users,
	},
];

export default usersRoutes;
