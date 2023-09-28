import 'reflect-metadata';
import { App } from './app';
import { ExceptionFilter } from './errors/exception.filter';
import { Container, ContainerModule } from 'inversify';
import { TYPES } from './types';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { IConfigService } from './config/config.service.interface';
import { ConfigService } from './config/config.service';
import { IWeatherAPIService } from './weather/weather.api.service.interface';
import { OpenWeatherAPIService } from './weather/openweather.api.service';
import { controllersListContainerModule } from './controllers-list.container-module';

const containerModule = new ContainerModule((bind) => {
	bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter).inSingletonScope();
	bind<IConfigService>(TYPES.IConfigService).to(ConfigService).inSingletonScope();
	bind<IWeatherAPIService>(TYPES.IWeatherAPIService).to(OpenWeatherAPIService).inSingletonScope();
	bind<App>(TYPES.App).to(App);
});

const main = (): void => {
	const appContainer = new Container();
	appContainer.load(controllersListContainerModule, containerModule);
	const app = appContainer.get<App>(TYPES.App);
	app.run();
};
main();
