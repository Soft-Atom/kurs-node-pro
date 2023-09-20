import { HTTPError } from '../errors/http-error';

export interface IWeatherAPIService {
	getWeather(city: string): Promise<HTTPError | unknown>;
}
