import { IsDefined } from 'class-validator';

export class OpenweatherResDto {
	name: string;
	weather: [
		{
			icon: string;
			description: string;
		},
	];
	main: {
		temp: number;
		feels_like: number;
		humidity: number;
	};
}
