import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { isNil } from '@shared-helpers';
import type { LocalStorageKeys } from '@shared-types';

@Injectable()
export class LocalStorageService {
	private readonly localStorage = inject(DOCUMENT, { optional: true })?.defaultView?.localStorage;

	public get<T>(key: LocalStorageKeys): T | null {
		const item = this.localStorage?.getItem(key);

		if (isNil(item)) {
			return null;
		}

		return this.isJSONValid(item) ? (JSON.parse(item) as T) : (item as T);
	}

	public set(key: LocalStorageKeys, value: unknown): void {
		this.localStorage?.setItem(key, JSON.stringify(value));
	}

	public remove(key: LocalStorageKeys): void {
		this.localStorage?.removeItem(key);
	}

	public removeKeys(keys: LocalStorageKeys[]): void {
		keys.forEach((key) => {
			return this.localStorage?.removeItem(key);
		});
	}

	public clear(): void {
		this.localStorage?.clear();
	}

	private isJSONValid(value: string): boolean {
		try {
			JSON.parse(value);

			return true;
		} catch (error) {
			console.error(error);

			return false;
		}
	}
}
