import { Injectable } from '@angular/core';
import { isNil } from '@shared-helpers';

@Injectable()
export class LazyStylesService {
	public loadStyles(): void {
		const element = this.getStylesLinkElement();
		const url = 'styles.css'; // see "styles" "bundleName" property in angular.json

		element.setAttribute('href', url);
	}

	private getStylesLinkElement(): HTMLLinkElement {
		const linkElementIdName = 'appStyles';
		const stylesheetCssSelector = 'link[rel="stylesheet"]';
		const titleCssSelector = 'title';

		const existingLinkElement = document.head.querySelector<HTMLLinkElement>(`#${linkElementIdName}`);

		if (!isNil(existingLinkElement)) {
			return existingLinkElement;
		}

		const linkElement = document.createElement('link');

		linkElement.setAttribute('rel', 'stylesheet');
		linkElement.setAttribute('id', linkElementIdName);
		const lastStylesheetElem = document.head.querySelector(`${stylesheetCssSelector}:last-of-type`);

		if (isNil(lastStylesheetElem)) {
			document.head.querySelector(titleCssSelector)?.after(linkElement);
		} else {
			lastStylesheetElem.after(linkElement);
		}

		return linkElement;
	}
}
