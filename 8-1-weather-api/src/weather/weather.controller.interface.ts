import { NextFunction, Response, Request } from 'express';
import { IBaseController } from '../common/base-controller/base.controller.interface';

export interface IWeatherController extends IBaseController {
	getByCity: (req: Request, res: Response, next: NextFunction) => void;
}
