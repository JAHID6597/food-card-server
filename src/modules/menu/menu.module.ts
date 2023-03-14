import { Module } from '@nestjs/common';
import { RestaurantModule } from './../restaurant/restaurant.module';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { MenuEntity, MenuSchema } from './entity/menu.entity';
import { CloudinaryModule } from './../../libs/cloudinary/cloudinary.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: MenuEntity.name, schema: MenuSchema }]),
    RestaurantModule,
    CloudinaryModule,
  ],
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}
