import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable, multiInject } from 'inversify';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { TYPES } from './types';
import { IBaseController } from './common/base-controller/base.controller.interface';

@injectable()
export class App {
	private express: Express;
	private port: number;
	private server: Server;

	//private controllersList: IBaseController[];

	constructor(
		// @inject(TYPES.FactoryControllersList) controllersListFactory: () => IBaseController[],
		@multiInject(TYPES.IBaseController) private controllersList: IBaseController[],
		@inject(TYPES.IExceptionFilter) private exceptionFilter: IExceptionFilter,
	) {
		this.express = express();
		this.port = 8000;
		// this.controllersList = controllersListFactory();
	}

	run(): void {
		this.useMiddleware();
		this.useRoutes();
		this.useExceptionFilter();
		this.server = this.express.listen(this.port, () => {
			console.log(`Сервер запущен на порту ${this.port}`);
		});
	}

	private useMiddleware(): void {
		this.express.use(express.json());
	}

	private useRoutes(): void {
		this.controllersList.forEach((controller) => {
			this.express.use(controller.path, controller.router);
		});
	}

	private useExceptionFilter(): void {
		this.express.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	stop(): void {
		this.server.close();
	}
}
