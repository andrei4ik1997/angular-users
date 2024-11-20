import { provideHttpClient, withInterceptors } from '@angular/common/http';
import type { ApplicationConfig } from '@angular/core';
import { inject, isDevMode, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import type { IsActiveMatchOptions, ViewTransitionsFeatureOptions } from '@angular/router';
import { provideRouter, Router, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { apiUrlInterceptor, errorInterceptor, loaderInterceptor } from '@shared-interceptors';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';

import { ENVIRONMENT_INITIALIZERS, SERVICES } from './app.initializers';
import { APP_ROUTES } from './app.routes';

const viewTransitionConfig: ViewTransitionsFeatureOptions = {
	onViewTransitionCreated: (transitionInfo) => {
		const router = inject(Router);
		const targetUrl = router.getCurrentNavigation()?.finalUrl ?? '';

		const config: IsActiveMatchOptions = {
			paths: 'exact',
			matrixParams: 'exact',
			fragment: 'ignored',
			queryParams: 'ignored',
		};

		// Skip the transition if the only thing changing is the fragment and queryParams
		if (router.isActive(targetUrl, config)) {
			transitionInfo.transition.skipTransition();
		}
	},
};

export const appConfig: ApplicationConfig = {
	providers: [
		provideExperimentalZonelessChangeDetection(),
		provideRouter(APP_ROUTES, withComponentInputBinding(), withViewTransitions(viewTransitionConfig)),
		provideAnimationsAsync(),
		provideHttpClient(withInterceptors([apiUrlInterceptor, loaderInterceptor, errorInterceptor])),
		provideServiceWorker('ngsw-worker.js', {
			enabled: !isDevMode(),
			registrationStrategy: 'registerWhenStable:30000',
		}),
		provideNzI18n(en_US),
		...SERVICES,
		...ENVIRONMENT_INITIALIZERS,
	],
};
