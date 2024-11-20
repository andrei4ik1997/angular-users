import { PAGE_ROUTES, PAGE_TITLES } from '@shared-constants';
import type { RouterPageLink, RouterPageName } from '@shared-types';

type NavigationItem = {
	pageName: RouterPageName;
	routerLink: RouterPageLink;
};

export const NAVIGATION_LIST = [
	{
		routerLink: PAGE_ROUTES.users,
		pageName: PAGE_TITLES.users,
	},
] as const satisfies NavigationItem[];
