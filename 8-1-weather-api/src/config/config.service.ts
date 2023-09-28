import { config } from 'dotenv';
import { IConfigService } from './config.service.interface';
import { injectable } from 'inversify';

@injectable()
export class ConfigService implements IConfigService {
	private config;
	constructor() {
		const result = config();

		if (!result.error) {
			this.config = result.parsed;
		}
	}

	getOpenweatherApiKey(): string | null {
		return this.get('OPENWEATHER_API_KEY');
	}

	get(key: string): string | null {
		if (this.config && this.config[key]) {
			return this.config[key];
		}
		return null;
	}
}
