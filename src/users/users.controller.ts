import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserPayload } from './dto/createuser.dto.js';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {  }


  @Get()
  async getAllUsers() {
    return await this.usersService.findAll();         
  }

  @Post()
  async addUser(@Body() newUser : CreateUserPayload) {
    return await this.usersService.createUser(newUser);
  }

  @Get(':id')
  async getUser(@Param('id') id:string){
    return await this.usersService.findOne(id);
  }


}
