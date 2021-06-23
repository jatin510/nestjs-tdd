import { Controller, Get, Post, Query, Body, Req, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Request, Response } from 'express';

@Controller('users')
export class UsersController {
  @Get()
  //   @Redirect('https://google.com')
  findAll(@Req() req: Request, @Res() res: Response): string {
    console.log('return');

    res.send('hello from users');
    return 'Get all users';
  }

  @Post()
  create(@Body() createItemDto: CreateUserDto): string {
    console.log(createItemDto);
    return 'Create items';
  }
}
