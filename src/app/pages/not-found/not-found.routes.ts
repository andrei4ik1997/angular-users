import type { Routes } from '@angular/router';
import { PAGE_TITLES } from '@shared-constants';

const notFoundRoutes: Routes = [
	{
		path: '',
		loadComponent: async () => {
			return import('./main/not-found.component');
		},
		title: PAGE_TITLES.notFound,
	},
];

export default notFoundRoutes;
