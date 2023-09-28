import { Request, Response, NextFunction } from 'express';
import { ValidatorOptions, validate } from 'class-validator';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { HTTPError } from '../../errors/http-error';

export function ValidateQueryParams(
	classToValidate: ClassConstructor<object>,
	validatorOptions: ValidatorOptions = {},
) {
	return (target: Object, propertyKey: string, propertyDescriptor: PropertyDescriptor): void => {
		const method = propertyDescriptor.value;
		type TMethodReturn = ReturnType<typeof method> | ReturnType<NextFunction>;

		propertyDescriptor.value = async function (
			...args: [Request, Response, NextFunction]
		): Promise<TMethodReturn> {
			const [{ query }, , next] = args;
			const instanceFromQuery = plainToClass(classToValidate, query);
			const errors = await validate(instanceFromQuery, validatorOptions);

			if (errors.length) {
				const messages: string[] = errors.reduce<string[]>((acc: string[], err) => {
					acc.push(...Object.values(err.constraints!));
					return acc;
				}, [] as string[]);

				return next(new HTTPError(422, ...messages));
			} else return method.apply(this, args);
		};
	};
}
