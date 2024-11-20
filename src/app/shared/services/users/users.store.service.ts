import type { HttpErrorResponse } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { LOCAL_STORAGE_KEYS } from '@shared-constants';
import { isHttpErrorResponse, isNil } from '@shared-helpers';
import type { CreateUserDTO, UserDTO } from '@shared-models';
import type { Observable } from 'rxjs';
import { of, tap } from 'rxjs';

import { LocalStorageService } from '../local-storage.service';
import { UsersApiService } from './users.api.service';

@Injectable()
export class UsersStoreService {
	private readonly usersApiService = inject(UsersApiService);
	private readonly localStorageService = inject(LocalStorageService);

	public readonly usersSignal = signal(this.localStorageService.get<UserDTO[]>(LOCAL_STORAGE_KEYS.users) ?? []);

	protected readonly syncUsersStorage = effect(() => {
		this.localStorageService.set(LOCAL_STORAGE_KEYS.users, this.usersSignal());
	});

	public getUsers(): Observable<HttpErrorResponse | UserDTO[]> {
		return this.usersApiService.getUsers().pipe(
			tap((response) => {
				const isError = isHttpErrorResponse(response);

				if (!isError) {
					this.usersSignal.set(response);
				}
			})
		);
	}

	public getUser(id: number): Observable<HttpErrorResponse | UserDTO> {
		const findedUser = this.usersSignal().find((user) => {
			return user.id === id;
		});

		if (isNil(findedUser)) {
			return this.usersApiService.getUser(id);
		}

		return of(findedUser);
	}

	public addUser(body: CreateUserDTO): Observable<HttpErrorResponse | UserDTO> {
		return this.usersApiService.addUser(body).pipe(
			tap((response) => {
				const isError = isHttpErrorResponse(response);

				if (!isError) {
					const copyUsers = structuredClone(this.usersSignal());

					copyUsers.push(response);

					this.usersSignal.set(copyUsers);
				}
			})
		);
	}

	public updateUser(id: number, body: Partial<CreateUserDTO>): Observable<HttpErrorResponse | UserDTO> {
		return this.usersApiService.updateUser(id, body).pipe(
			tap((response) => {
				const isError = isHttpErrorResponse(response);

				if (!isError) {
					const copyUsers = structuredClone(this.usersSignal());

					const modifiedIndex = copyUsers.findIndex((user) => {
						return user.id === id;
					});

					if (modifiedIndex === -1) {
						return;
					}

					const user = copyUsers[modifiedIndex];

					copyUsers[modifiedIndex] = { ...user, ...response };

					this.usersSignal.set(copyUsers);
				}
			})
		);
	}

	public deleteUser(id: number): Observable<HttpErrorResponse | void> {
		return this.usersApiService.deleteUser(id).pipe(
			tap((response) => {
				const isError = isHttpErrorResponse(response);

				if (!isError) {
					const newUsers = this.usersSignal().filter((user) => {
						return user.id !== id;
					});

					this.usersSignal.set(newUsers);
				}
			})
		);
	}
}
