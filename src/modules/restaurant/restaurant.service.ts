import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { CreateRestaurantDTO } from './dto/create-restaurant.dto';
import { UpdateRestaurantDTO } from './dto/update-restaurant.dto';
import { RestaurantEntity } from './entity/restaurant.entity';
import { ResponseHelper } from '../shared/utils/response-helper';
import { UpdateRestaurantMenuTypeEnum } from './enum/update-restaurant-menu-type.enum';
import { CloudinaryService } from 'src/libs/cloudinary/cloudinary.service';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(RestaurantEntity.name)
    private readonly restaurantModel: Model<RestaurantEntity>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  public async addRestaurant(
    body: CreateRestaurantDTO,
    image?: Express.Multer.File,
  ) {
    if (image) {
      const uploadedImage = await this.cloudinaryService.uploadImage(image);
      body.image = uploadedImage.secure_url;
    }

    const restaurant = new this.restaurantModel(body);
    return restaurant.save();
  }

  public getAllRestaurant() {
    return this.restaurantModel.find().populate('menus');
  }

  public getRestaurantById(id: string | MongooseSchema.Types.ObjectId) {
    return this.restaurantModel.findById(id).lean().populate({ path: 'menus' });
  }

  public async getRestaurant(id: string | MongooseSchema.Types.ObjectId) {
    const restaurant = await this.getRestaurantById(id);
    if (!restaurant) {
      throw new NotFoundException(`No such restaurant exists.`);
    }

    return restaurant;
  }

  public async updateRestaurant(
    id: string | MongooseSchema.Types.ObjectId,
    body: UpdateRestaurantDTO,
    image?: Express.Multer.File,
  ) {
    await this.getRestaurant(id);

    if (image) {
      const uploadedImage = await this.cloudinaryService.uploadImage(image);
      body.image = uploadedImage.secure_url;
    }

    const updatedRestaurant = await this.restaurantModel.updateOne(
      { _id: id },
      body,
      { new: true },
    );

    const isUpdated = updatedRestaurant.modifiedCount ? true : false;
    return ResponseHelper.updateResponse(id, isUpdated);
  }

  public async deleteRestaurant(id: string | MongooseSchema.Types.ObjectId) {
    const restaurant = await this.getRestaurant(id);
    if (restaurant?.menus?.length) {
      throw new BadRequestException(
        'This restaurant already tagged with menu. Please delete them to delete it.',
      );
    }

    const deleted = await this.restaurantModel.deleteOne({
      _id: id,
    });

    const isDeleted = deleted.deletedCount ? true : false;
    return ResponseHelper.deleteResponse(id, isDeleted);
  }

  public async updateRestaurantMenu(
    restaurantId: string | MongooseSchema.Types.ObjectId,
    menuId: string | MongooseSchema.Types.ObjectId,
    type: UpdateRestaurantMenuTypeEnum,
  ) {
    if (type === UpdateRestaurantMenuTypeEnum.INSERT) {
      await this.restaurantModel.findOneAndUpdate(
        { id: restaurantId },
        { $push: { menus: menuId } },
        { new: true },
      );
    } else {
      await this.restaurantModel.findOneAndUpdate(
        { id: restaurantId },
        { $pull: { menus: menuId } },
        { new: true },
      );
    }
  }
}
