export class HTTPError extends Error {
	messages: string[];
	constructor(
		public statusCode: number,
		...messages: string[]
	) {
		super(messages.join(' '));
		this.messages = messages;
	}
}

export const HTTPError500 = (): HTTPError => {
	return new HTTPError(500, 'Внутренняя ошибка сервера');
};
