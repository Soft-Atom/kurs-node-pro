export interface IConfigService {
	getOpenweatherApiKey: () => string | null;
	get: (key: string) => string | null;
}
