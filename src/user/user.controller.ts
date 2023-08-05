import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Throttle(10, 60)
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Throttle(10, 60)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException("User tidak ditemukan");
    }
    return this.userService.findOne(+id);
  }

  @SkipThrottle()
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: CreateUserDto) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException("User tidak ditemukan");
    }
    return this.userService.update(+id, updateUserDto);
  }

  @SkipThrottle()
  @Delete(':id')
  async remove(@Param('id') id: number) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException("User tidak ditemukan");
    }
    return this.userService.remove(+id);
  }
}
