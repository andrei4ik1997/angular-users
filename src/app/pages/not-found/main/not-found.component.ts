import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NoResultComponent } from '@shared-components';
import { CommonService } from '@shared-services';

@Component({
	selector: 'app-not-found',
	templateUrl: './not-found.component.html',
	styleUrl: './not-found.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [NoResultComponent],
})
export default class NotFoundComponent {
	private readonly commonService = inject(CommonService);

	protected goToMain(): void {
		this.commonService.navigateByUrl(``);
	}
}
