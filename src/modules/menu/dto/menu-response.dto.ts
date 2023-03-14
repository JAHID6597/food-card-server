import { ApiResponseProperty } from '@nestjs/swagger';
import { BaseResponseDTO } from './../../shared/dto/base-response.dto';

export class MenuResponseDTO extends BaseResponseDTO {
  @ApiResponseProperty()
  name: string;

  @ApiResponseProperty()
  price: number;

  @ApiResponseProperty()
  quantity: number;

  @ApiResponseProperty()
  type: string;

  @ApiResponseProperty()
  image: string;

  @ApiResponseProperty()
  opening_time: Date;

  @ApiResponseProperty()
  closing_time: Date;
}
