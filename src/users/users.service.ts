import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

// ORM Approach
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  // constructor

  async findAll(): Promise<IUser[]> {
    return await this.userModel.find();
  }

  async findOne(id: string): Promise<IUser> {
    return await this.userModel.findOne({ _id: id });
  }

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }
}
