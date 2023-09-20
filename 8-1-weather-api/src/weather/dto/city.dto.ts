import { IsDefined, IsString } from 'class-validator';

export class CityDto {
	@IsDefined({ message: 'Не указан город' })
	city: string;
}
