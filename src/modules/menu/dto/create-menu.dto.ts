import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMenuDTO {
  @ApiProperty()
  @IsNotEmpty()
  restaurant: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmptyObject()
  @Type(() => File)
  image: Express.Multer.File;

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
