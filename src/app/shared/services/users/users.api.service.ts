import type { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { handleHttpError } from '@shared-helpers';
import type { CreateUserDTO, UserDTO } from '@shared-models';
import type { Observable } from 'rxjs';
import { catchError } from 'rxjs';

@Injectable()
export class UsersApiService {
	private readonly httpClient = inject(HttpClient);

	public getUsers(): Observable<HttpErrorResponse | UserDTO[]> {
		return this.httpClient
			.get<HttpErrorResponse | UserDTO[]>('users')
			.pipe(catchError(handleHttpError('Get users')));
	}

	public getUser(id: number): Observable<HttpErrorResponse | UserDTO> {
		return this.httpClient
			.get<HttpErrorResponse | UserDTO>(`users/${id}`)
			.pipe(catchError(handleHttpError('Get user')));
	}

	public getUsersByUsername(username: string): Observable<HttpErrorResponse | UserDTO[]> {
		return this.httpClient
			.get<HttpErrorResponse | UserDTO[]>(`users?username=${username}`)
			.pipe(catchError(handleHttpError('Get user by username')));
	}

	public getUsersByEmail(email: string): Observable<HttpErrorResponse | UserDTO[]> {
		return this.httpClient
			.get<HttpErrorResponse | UserDTO[]>(`users?email=${email}`)
			.pipe(catchError(handleHttpError('Get user by email')));
	}

	public addUser(body: CreateUserDTO): Observable<HttpErrorResponse | UserDTO> {
		return this.httpClient
			.post<HttpErrorResponse | UserDTO>('users', body)
			.pipe(catchError(handleHttpError('Add user')));
	}

	public updateUser(id: number, body: Partial<CreateUserDTO>): Observable<HttpErrorResponse | UserDTO> {
		return this.httpClient
			.put<HttpErrorResponse | UserDTO>(`users/${id}`, body)
			.pipe(catchError(handleHttpError('Update user')));
	}

	public deleteUser(id: number): Observable<HttpErrorResponse | void> {
		return this.httpClient
			.delete<HttpErrorResponse | void>(`users/${id}`, {})
			.pipe(catchError(handleHttpError('Delete user')));
	}
}
