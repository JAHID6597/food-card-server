import { MenuEntity } from './../../menu/entity/menu.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true, collection: 'restaurants' })
export class RestaurantEntity extends Document {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ required: true, type: String })
  phone_number: string;

  @Prop({ type: String })
  image: string;

  @Prop({ required: true, type: String })
  qr_code: string;

  @Prop({ type: Date })
  opening_time: Date;

  @Prop({ type: Date })
  closing_time: Date;

  @Prop({ default: true })
  is_active: boolean;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'MenuEntity' }] })
  menus: MenuEntity[];
}

export const RestaurantSchema = SchemaFactory.createForClass(RestaurantEntity);
