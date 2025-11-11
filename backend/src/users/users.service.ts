import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserInput.password, 10);
    const createdUser = new this.userModel({
      ...createUserInput,
      password: hashedPassword,
    });
    const saved = await createdUser.save();
    return this.transformUser(saved);
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users.map(user => this.transformUser(user));
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.transformUser(user);
  }

  // CHANGED: Now returns UserDocument | null instead of just UserDocument
  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findByGST(GSTNo: string): Promise<User> {
    const user = await this.userModel.findOne({ GSTNo }).exec();
    if (!user) {
      throw new NotFoundException('User with this GST number not found');
    }
    return this.transformUser(user);
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    const updateData: any = { ...updateUserInput };
    
    if (updateUserInput.password) {
      updateData.password = await bcrypt.hash(updateUserInput.password, 10);
    }
    
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
      
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return this.transformUser(updatedUser);
  }

  async remove(id: string): Promise<string> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('User not found');
    }
    return 'User deleted successfully';
  }

  private transformUser(user: UserDocument): User {
    return {
     
      id: (user._id as Types.ObjectId).toString(),
      name: user.name,
      email: user.email,
      password: user.password,
      address: user.address,
      scope: user.scope,
      startDate: user.startDate,
      endDate: user.endDate,
      GSTNo: user.GSTNo,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
