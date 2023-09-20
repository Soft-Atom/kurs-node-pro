import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../common/base-controller/base.controller';
import { IBaseRoute } from '../common/base-controller/base.route.interface';
import { ValidateQueryParams } from '../common/validate/validate-query-params.decorator';
import { CityDto } from './dto/city.dto';
import { IWeatherController } from './weather.controller.interface';
import { TYPES } from '../types';
import { IWeatherAPIService } from './weather.api.service.interface';
import { inject, injectable } from 'inversify';

@injectable()
export class WeatherController extends BaseController implements IWeatherController {
	routes: IBaseRoute[] = [{ path: '/get-by-city', method: 'get', callback: this.getByCity }];

	constructor(@inject(TYPES.IWeatherAPIService) private weatherAPIService: IWeatherAPIService) {
		super('/weather');
		this.bindRoutes();
	}

	@ValidateQueryParams(CityDto)
	async getByCity({ query }: Request, res: Response, next: NextFunction): Promise<void> {
		const { city } = query;
		const result = await this.weatherAPIService.getWeather(city as string);
		if (result instanceof Error) return next(result);
		res.status(200).send(result);
	}
}
