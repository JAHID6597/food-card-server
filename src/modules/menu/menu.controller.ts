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
import { MenuService } from './menu.service';
import { MenuResponseDTO } from './dto/menu-response.dto';
import { CreateMenuDTO } from './dto/create-menu.dto';
import { UpdateMenuDTO } from './dto/update-menu.dto';
import { DeleteResponseDTO } from './../shared/dto/delete-response.dto';
import { UpdateResponseDTO } from './../shared/dto/update-response.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Menu APIs')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @ApiOkResponse({ type: CreateMenuDTO })
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('image'))
  @Post('add')
  public addMenu(
    @Body() body: CreateMenuDTO,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return this.menuService.addMenu(body, image);
  }

  @ApiOkResponse({ type: [MenuResponseDTO] })
  @HttpCode(HttpStatus.OK)
  @Get('all')
  public getAllMenu() {
    return this.menuService.getAllMenu();
  }

  @ApiOkResponse({ type: MenuResponseDTO })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  public async getMenuById(
    @Param('id') id: string | MongooseSchema.Types.ObjectId,
  ) {
    return await this.menuService.getMenu(id);
  }

  @ApiOkResponse({ type: [MenuResponseDTO] })
  @HttpCode(HttpStatus.OK)
  @Get('all/restaurant/:restaurantId')
  public getAllMenuByRestaurant(
    @Param('restaurantId') restaurantId: string | MongooseSchema.Types.ObjectId,
  ) {
    return this.menuService.getAllMenuByRestaurant(restaurantId);
  }

  @ApiOkResponse({ type: UpdateResponseDTO })
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('image'))
  @Patch(':id')
  public async updateMenu(
    @Param('id') id: string | MongooseSchema.Types.ObjectId,
    @Body() body: UpdateMenuDTO,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return await this.menuService.updateMenu(id, body, image);
  }

  @ApiOkResponse({ type: DeleteResponseDTO })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  public async deleteMenu(
    @Param('id') id: string | MongooseSchema.Types.ObjectId,
  ) {
    return await this.menuService.deleteMenu(id);
  }
}
