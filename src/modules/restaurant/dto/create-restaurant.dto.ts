import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNotEmptyObject,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRestaurantDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmptyObject()
  @Type(() => File)
  image: Express.Multer.File;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  qr_code: string;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  opening_time: Date;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  closing_time: Date;
}
