import type { Routes } from '@angular/router';
import { PAGE_ROUTES } from '@shared-constants';

export const APP_ROUTES: Routes = [
	{ path: '', redirectTo: PAGE_ROUTES.users, pathMatch: 'full' },
	{
		path: PAGE_ROUTES.users,
		loadChildren: async () => {
			return import('@pages/users/users.routes');
		},
	},
	{
		path: PAGE_ROUTES.user,
		loadChildren: async () => {
			return import('@pages/user/user.routes');
		},
	},
	{
		path: PAGE_ROUTES.notFound,
		loadChildren: async () => {
			return import('@pages/not-found/not-found.routes');
		},
	},
	{
		path: '**',
		redirectTo: PAGE_ROUTES.notFound,
		pathMatch: 'full',
	},
];
