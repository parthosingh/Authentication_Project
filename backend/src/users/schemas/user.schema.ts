import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

registerEnumType(UserRole, {
  name: 'UserRole',
});

@ObjectType()
@Schema({ timestamps: true })
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop({ required: true, unique: true }) 
  email: string;

  @Prop({ required: true })
  password: string;

  @Field({ nullable: true })
  @Prop()
  address?: string;

  @Field({ nullable: true })
  @Prop()
  scope?: string;

  @Field({ nullable: true })
  @Prop()
  startDate?: string;

  @Field({ nullable: true })
  @Prop()
  endDate?: string;

  @Field({ nullable: true })
  @Prop()
  GSTNo?: string;

  @Field(() => UserRole)
  @Prop({ required: true, enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Field()
  @Prop()
  createdAt: Date;

  @Field()
  @Prop()
  updatedAt: Date;
}

export type UserDocument = User & Document & {
  _id: Types.ObjectId;
};

export const UserSchema = SchemaFactory.createForClass(User);
