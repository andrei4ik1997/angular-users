import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzFlexDirective } from 'ng-zorro-antd/flex';
import { NzResultComponent } from 'ng-zorro-antd/result';

@Component({
	selector: 'app-no-result',
	templateUrl: './no-result.component.html',
	styleUrl: './no-result.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [NzResultComponent, NzButtonComponent, NzFlexDirective],
})
export class NoResultComponent {
	public title = input.required<string>();
	public subTitle = input.required<string>();
	public buttonText = input.required<string>();

	protected readonly onButtonClick = output();

	protected buttonClick(): void {
		this.onButtonClick.emit();
	}
}
