import { HTTPError, HTTPError500 } from '../../errors/http-error';

export class MyFetch {
	constructor(
		private url: string,
		private params?: any,
	) {}

	async get(): Promise<Response | HTTPError> {
		this.url = this.params ? `${this.url}?${new URLSearchParams(this.params)}` : this.url;
		return this.myFetch();
	}

	async post(): Promise<Response | HTTPError> {
		const init: RequestInit | undefined = this.params
			? { body: JSON.stringify(this.params) }
			: undefined;
		return this.myFetch(init);
	}

	private async myFetch(init?: RequestInit): Promise<Response | HTTPError> {
		try {
			const res = await fetch(this.url, init);
			return res.json();
		} catch (e) {
			return HTTPError500();
		}
	}
}
