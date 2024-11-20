import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class StoreService {
	private readonly loadingSubject$ = new BehaviorSubject(false);
	public readonly loading$ = this.loadingSubject$.asObservable();

	public setLoading(isLoading: boolean): void {
		this.loadingSubject$.next(isLoading);
	}
}
