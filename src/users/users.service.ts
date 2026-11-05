import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model.js';
import { CreateUserPayload } from './dto/createuser.dto.js';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async createUser(newUserPayload: CreateUserPayload): Promise<string> {
    try {
      await this.userModel.create({
        firstName: newUserPayload.firstName,
        lastName: newUserPayload.lastName,
        user_id: randomUUID(),
      });
      return 'created user';
    } catch (e) {
      throw e;
    }
  }

  findOne(id: string): Promise<User | null> {
    return this.userModel.findOne({
      where: {
        user_id: id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    if (!user) return;
    await user.destroy();
  }
}
