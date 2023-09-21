import { ContainerModule } from 'inversify';
import { TYPES } from './types';
import { IBaseController } from './common/base-controller/base.controller.interface';
import { WeatherController } from './weather/weather.controller';

const CONTROLLERS_LIST: (new (...args: any[]) => IBaseController)[] = [WeatherController];

export const controllersListContainerModule = new ContainerModule((bind) => {
	CONTROLLERS_LIST.forEach((controller) => {
		bind<IBaseController>(TYPES.IBaseController).to(controller);
	});
});
