import { Request, Response, NextFunction } from 'express';
import { HTTPError } from './http-error';

export interface IExceptionFilter {
	catch: (error: HTTPError | Error, req: Request, res: Response, next: NextFunction) => void;
}
