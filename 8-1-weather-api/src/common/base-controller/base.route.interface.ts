import { NextFunction, Request, Response, Router } from 'express';

export interface IBaseRoute {
	path: string;
	method: keyof Pick<Router, 'get' | 'post' | 'put' | 'delete'>;
	callback: (req: Request, res: Response, next: NextFunction) => void;
}
