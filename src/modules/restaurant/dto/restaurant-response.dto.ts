import { ApiResponseProperty } from '@nestjs/swagger';
import { BaseResponseDTO } from 'src/modules/shared/dto/base-response.dto';

export class RestaurantResponseDTO extends BaseResponseDTO {
  @ApiResponseProperty()
  _id: string;

  @ApiResponseProperty()
  name: string;

  @ApiResponseProperty()
  email: string;

  @ApiResponseProperty()
  password: string;

  @ApiResponseProperty()
  phone_number: string;

  @ApiResponseProperty()
  image: string;

  @ApiResponseProperty()
  qr_code: string;

  @ApiResponseProperty()
  opening_time: Date;

  @ApiResponseProperty()
  closing_time: Date;
}
