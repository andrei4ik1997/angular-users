import type { PipeTransform } from '@angular/core';
import { Pipe } from '@angular/core';
import type { UserDTO } from '@shared-models';

@Pipe({
	name: 'googleMapLink',
	standalone: true,
})
export class GoogleMapLinkPipe implements PipeTransform {
	public transform(address: UserDTO['address']): string {
		return `https://www.google.com/maps?q=${address.geo.lat},${address.geo.lng}`;
	}
}
