import type { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { CreateUserDTO, UserDTO } from '@shared-models';
import type { Observable } from 'rxjs';

import { UsersStoreService } from './users.store.service';

@Injectable()
export class UsersUiService {
	private readonly usersStoreService = inject(UsersStoreService);

	public readonly usersSignal = this.usersStoreService.usersSignal;

	public getUsers(): Observable<HttpErrorResponse | UserDTO[]> {
		return this.usersStoreService.getUsers();
	}

	public getUser(id: number): Observable<HttpErrorResponse | UserDTO> {
		return this.usersStoreService.getUser(id);
	}

	public addUser(body: CreateUserDTO): Observable<HttpErrorResponse | UserDTO> {
		return this.usersStoreService.addUser(body);
	}

	public updateUser(id: number, body: Partial<CreateUserDTO>): Observable<HttpErrorResponse | UserDTO> {
		return this.usersStoreService.updateUser(id, body);
	}

	public deleteUser(id: number): Observable<HttpErrorResponse | void> {
		return this.usersStoreService.deleteUser(id);
	}
}
