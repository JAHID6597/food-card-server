import { ApiResponseProperty } from '@nestjs/swagger';

export class DeleteResponseDTO {
  @ApiResponseProperty()
  id: string;

  @ApiResponseProperty()
  is_deleted: boolean;

  @ApiResponseProperty()
  message: string;

  constructor(id: string) {
    this.id = id;
  }
}
