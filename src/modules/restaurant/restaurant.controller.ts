import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Schema as MongooseSchema } from 'mongoose';
import { DeleteResponseDTO } from './../shared/dto/delete-response.dto';
import { UpdateResponseDTO } from './../shared/dto/update-response.dto';
import { CreateRestaurantDTO } from './dto/create-restaurant.dto';
import { RestaurantResponseDTO } from './dto/restaurant-response.dto';
import { UpdateRestaurantDTO } from './dto/update-restaurant.dto';
import { RestaurantService } from './restaurant.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Restaurant APIs')
@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @ApiOkResponse({ type: CreateRestaurantDTO })
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('image'))
  @Post('add')
  public async addRestaurant(
    @Body() body: CreateRestaurantDTO,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return await this.restaurantService.addRestaurant(body, image);
  }

  @ApiOkResponse({ type: [RestaurantResponseDTO] })
  @HttpCode(HttpStatus.OK)
  @Get('all')
  public getAllRestaurant() {
    return this.restaurantService.getAllRestaurant();
  }

  @ApiOkResponse({ type: RestaurantResponseDTO })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getRestaurantById(
    @Param('id') id: string | MongooseSchema.Types.ObjectId,
  ) {
    return await this.restaurantService.getRestaurant(id);
  }

  @ApiOkResponse({ type: UpdateResponseDTO })
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('image'))
  @Patch(':id')
  public async updateRestaurant(
    @Param('id') id: string | MongooseSchema.Types.ObjectId,
    @Body() body: UpdateRestaurantDTO,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return await this.restaurantService.updateRestaurant(id, body, image);
  }

  @ApiOkResponse({ type: DeleteResponseDTO })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  public async deleteRestaurant(
    @Param('id') id: string | MongooseSchema.Types.ObjectId,
  ) {
    return await this.restaurantService.deleteRestaurant(id);
  }
}
