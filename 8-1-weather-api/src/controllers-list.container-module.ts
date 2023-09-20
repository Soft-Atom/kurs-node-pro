import { ContainerModule } from 'inversify';
import { TYPES } from './types';
import { IBaseController } from './common/base-controller/base.controller.interface';
import { WeatherController } from './weather/weather.controller';

export const controllersListContainerModule = new ContainerModule((bind) => {
	bind<IBaseController>(TYPES.IBaseController).to(WeatherController);
});
