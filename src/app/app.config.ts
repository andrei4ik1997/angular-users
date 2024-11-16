import {provideHttpClient} from '@angular/common/http';
import {ApplicationConfig, inject, isDevMode, provideExperimentalZonelessChangeDetection} from '@angular/core';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {
	IsActiveMatchOptions,
	provideRouter,
	Router,
	ViewTransitionsFeatureOptions,
	withComponentInputBinding,
	withViewTransitions,
} from '@angular/router';
import {provideServiceWorker} from '@angular/service-worker';
import {APP_ROUTES} from './app.routes';

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
		provideHttpClient(),
		provideServiceWorker('ngsw-worker.js', {
			enabled: !isDevMode(),
			registrationStrategy: 'registerWhenStable:30000',
		}),
	],
};
