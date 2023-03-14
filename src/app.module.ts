import { Module } from '@nestjs/common';
import { ConfigModule } from './modules/config/config.module';
import { DatabaseModule } from './database/database.module';
import { RestaurantModule } from './modules/restaurant/restaurant.module';
import { MenuModule } from './modules/menu/menu.module';

@Module({
  imports: [ConfigModule, DatabaseModule, RestaurantModule, MenuModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
