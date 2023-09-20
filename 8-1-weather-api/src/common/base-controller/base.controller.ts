import { Router } from 'express';
import { IBaseRoute } from './base.route.interface';
import { IBaseController } from './base.controller.interface';
import { injectable } from 'inversify';

@injectable()
export abstract class BaseController implements IBaseController {
	private readonly _router: Router;
	protected routes: IBaseRoute[];

	constructor(private readonly _path: string) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	get path(): string {
		return this._path;
	}

	protected bindRoutes(): void {
		this.routes.forEach((r) => {
			this.router[r.method](r.path, r.callback.bind(this));
		});
	}
}
