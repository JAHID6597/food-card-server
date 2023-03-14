import { RestaurantService } from './../restaurant/restaurant.service';
import { MenuEntity } from './entity/menu.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { CreateMenuDTO } from './dto/create-menu.dto';
import { UpdateMenuDTO } from './dto/update-menu.dto';
import { ResponseHelper } from '../shared/utils/response-helper';
import { UpdateRestaurantMenuTypeEnum } from '../restaurant/enum/update-restaurant-menu-type.enum';
import { CloudinaryService } from 'src/libs/cloudinary/cloudinary.service';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(MenuEntity.name)
    private readonly menuModel: Model<MenuEntity>,
    private readonly restaurantService: RestaurantService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  public async addMenu(body: CreateMenuDTO, image?: Express.Multer.File) {
    if (image) {
      const uploadedImage = await this.cloudinaryService.uploadImage(image);
      body.image = uploadedImage.secure_url;
    }

    const menu = new this.menuModel(body);

    const newMenu = await menu.save();

    await this.restaurantService.updateRestaurantMenu(
      body.restaurant,
      newMenu._id,
      UpdateRestaurantMenuTypeEnum.INSERT,
    );

    return newMenu;
  }

  public getAllMenu() {
    return this.menuModel
      .find()
      .populate({ path: 'restaurant', select: '-menus' });
  }

  public getAllMenuByRestaurant(
    restaurantId: string | MongooseSchema.Types.ObjectId,
  ) {
    return this.menuModel
      .find({ restaurant: restaurantId })
      .populate({ path: 'restaurant', select: '-menus' });
  }

  public getMenuById(id: string | MongooseSchema.Types.ObjectId) {
    return this.menuModel
      .findById(id)
      .lean()
      .populate({ path: 'restaurant', select: '-menus' });
  }

  public async getMenu(id: string | MongooseSchema.Types.ObjectId) {
    const menu = await this.getMenuById(id);
    if (!menu) {
      throw new NotFoundException(`No such menu exists.`);
    }

    return menu;
  }

  public async updateMenu(
    id: string | MongooseSchema.Types.ObjectId,
    body: UpdateMenuDTO,
    image?: Express.Multer.File,
  ) {
    if (image) {
      const uploadedImage = await this.cloudinaryService.uploadImage(image);
      body.image = uploadedImage.secure_url;
    }

    await this.getMenu(id);

    const updatedMenu = await this.menuModel.updateOne({ _id: id }, body, {
      new: true,
    });

    const isUpdated = updatedMenu.modifiedCount ? true : false;
    return ResponseHelper.updateResponse(id, isUpdated);
  }

  public async deleteMenu(id: string | MongooseSchema.Types.ObjectId) {
    const menu = await this.getMenu(id);

    const deleted = await this.menuModel.deleteOne({
      _id: id,
    });

    await this.restaurantService.updateRestaurantMenu(
      menu?.restaurant?._id,
      menu._id,
      UpdateRestaurantMenuTypeEnum.REMOVE,
    );

    const isDeleted = deleted.deletedCount ? true : false;
    return ResponseHelper.deleteResponse(id, isDeleted);
  }
}
