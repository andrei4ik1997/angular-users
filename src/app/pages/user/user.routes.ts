import type { Routes } from '@angular/router';
import { PAGE_ROUTES, PAGE_TITLES } from '@shared-constants';

const userRoutes: Routes = [
	{
		path: '',
		loadComponent: async () => {
			return import('./main/user.component');
		},
		title: PAGE_TITLES.user,
		children: [
			{
				path: `${PAGE_ROUTES.add}`,
				loadComponent: async () => {
					return import('./components/add-user/add-user.component');
				},
				title: PAGE_TITLES.userAdd,
				pathMatch: 'full',
			},
			{
				path: `:${PAGE_ROUTES.userId}/${PAGE_ROUTES.edit}`,
				loadComponent: async () => {
					return import('./components/edit-user/edit-user.component');
				},
				title: PAGE_TITLES.user,
				pathMatch: 'full',
			},
			{
				path: `:${PAGE_ROUTES.userId}`,
				loadComponent: async () => {
					return import('./components/user-details/user-details.component');
				},
				pathMatch: 'full',
			},
		],
	},
];

export default userRoutes;
