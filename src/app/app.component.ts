import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LayoutComponent } from '@shared-components';
import { NzFlexDirective } from 'ng-zorro-antd/flex';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [LayoutComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	hostDirectives: [{ directive: NzFlexDirective }],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
