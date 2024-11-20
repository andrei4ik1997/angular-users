import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserFormComponent } from '@shared-components';

@Component({
	selector: 'app-add-user',
	templateUrl: './add-user.component.html',
	styleUrl: './add-user.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [UserFormComponent],
})
export default class AddUserComponent {}
