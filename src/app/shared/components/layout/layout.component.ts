import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzFlexDirective } from 'ng-zorro-antd/flex';
import { NzContentComponent, NzFooterComponent, NzHeaderComponent, NzLayoutComponent } from 'ng-zorro-antd/layout';

import { NavigationComponent } from './navigation/navigation.component';

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrl: './layout.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [
		NzLayoutComponent,
		NzHeaderComponent,
		NzContentComponent,
		NzFooterComponent,
		NzFlexDirective,
		RouterOutlet,
		NavigationComponent,
	],
	hostDirectives: [{ directive: NzFlexDirective, inputs: ['nzVertical'] }],
})
export class LayoutComponent {
	protected get year(): number {
		return new Date().getFullYear();
	}
}
