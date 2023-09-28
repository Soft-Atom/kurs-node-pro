import { IExceptionFilter } from './exception.filter.interface';
import { HTTPError } from './http-error';
import { IErrorDto } from './dto/error.dto.interface';
import { NextFunction, Response, Request } from 'express';
import { injectable } from 'inversify';

@injectable()
export class ExceptionFilter implements IExceptionFilter {
	catch(error: HTTPError | Error, req: Request, res: Response, next: NextFunction): void {
		let statusCode = 500;
		const errorDto: IErrorDto = {};

		if (error instanceof HTTPError) {
			statusCode = error.statusCode;

			if (error.messages.length > 1) errorDto.errors = error.messages;
			else errorDto.error = error.messages.length > 0 ? error.message : 'Неизвестная ошибка';
		} else errorDto.error = error.message;

		res.status(statusCode).send(errorDto);
	}
}
