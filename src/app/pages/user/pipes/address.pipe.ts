import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';
import type { UserDTO } from '@shared-models';

@Pipe({
	name: 'address',
	standalone: true,
})
export class AddressPipe implements PipeTransform {
	public transform(address: UserDTO['address']): string {
		return `${address.suite}, ${address.street}, ${address.city} , ${address.zipcode}`;
	}
}
