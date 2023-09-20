import { ContainerModule, inject, interfaces } from 'inversify';
import { IWeatherController } from './weather/weather.controller.interface';
import { TYPES } from './types';
import { IBaseController } from './common/base-controller/base.controller.interface';
import { WeatherController } from './weather/weather.controller';

const controllersListFactory = (context: interfaces.Context) => (): IBaseController[] => [
	context.container.get<IWeatherController>(TYPES.IWeatherController),
];

export const controllersListContainerModule = new ContainerModule((bind) => {
	bind<IWeatherController>(TYPES.IWeatherController).to(WeatherController);
	bind<interfaces.Factory<IBaseController[]>>(TYPES.FactoryControllersList).toFactory<
		IBaseController[]
	>(controllersListFactory);
});
