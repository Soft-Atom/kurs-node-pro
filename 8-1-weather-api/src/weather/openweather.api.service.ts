import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';
import { IWeatherAPIService } from './weather.api.service.interface';
import { OpenweatherResDto } from './dto/openweather.res.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { HTTPError, HTTPError500 } from '../errors/http-error';
import { MyFetch } from '../common/my-fetch/my-fetch';
import { IWeatherResponseDTO } from './dto/weather.res.dto';
import { WEATHER_ICONS } from './weather-icons';

@injectable()
export class OpenWeatherAPIService implements IWeatherAPIService {
	constructor(@inject(TYPES.IConfigService) private configService: IConfigService) {}

	async getWeather(city: string): Promise<IWeatherResponseDTO | HTTPError> {
		const res = await this.openWeatherRequestByCity(city);

		if (res instanceof HTTPError) return res;

		const instanceFromRes = plainToClass(OpenweatherResDto, res);
		const errors = await validate(instanceFromRes);

		if (errors.length) {
			console.log(errors);
			return HTTPError500();
		}
		return this.convertToIWeatherResponseDTO(instanceFromRes);
	}

	private async openWeatherRequestByCity(city: string): Promise<Response | HTTPError> {
		const token = this.configService.getOpenweatherApiKey();
		if (!token) return HTTPError500();

		const params = {
			q: city,
			appid: token,
			lang: 'ru',
			units: 'metric',
		};

		const url = 'https://api.openweathermap.org/data/2.5/weather';

		const res = await new MyFetch(url, params).get();

		if (res instanceof HTTPError) return res;

		if ('cod' in res) {
			if (res.cod === 200) return res;
			else if (res.cod === '404') return new HTTPError(404, 'Не верно указан город');
		}

		return HTTPError500();
	}

	private convertToIWeatherResponseDTO(obj: unknown): IWeatherResponseDTO | HTTPError {
		if (obj instanceof OpenweatherResDto) {
			return {
				city: obj.name,
				icon: this.getWeatherIcon(obj.weather[0].icon),
				description: obj.weather[0].description,
				temp: obj.main.temp,
				feels_like: obj.main.feels_like,
				humidity: obj.main.humidity,
			};
		}
		return HTTPError500();
	}

	private getWeatherIcon(icon: string): string {
		if (icon in WEATHER_ICONS) return WEATHER_ICONS[icon];
		return icon;
	}
}
