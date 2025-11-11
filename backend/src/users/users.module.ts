import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule implements OnModuleInit {
  constructor(@InjectConnection() private connection: Connection) {}

  async onModuleInit() {
    try {
      // Drop the old mobileNumber index
      const collection = this.connection.collection('users');
      await collection.dropIndex('mobileNumber_1');
      console.log('✅ Old mobileNumber index dropped successfully');
    } catch (error) {
      // Index might already be dropped, ignore error
      console.log('ℹ️ Index already dropped or does not exist');
    }
  }
}