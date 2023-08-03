import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) { }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepo.create(createUserDto);
    await this.userRepo.save(newUser);
    return newUser;
  }

  async findAll(): Promise<User[]> {
    const data = await this.userRepo.find();
    return data;
  }

  async findOne(id: number): Promise<User> {
    const data = await this.userRepo.findOne({ where: { id } });
    return data;
  }

  async update(id: number, updateUserDto: CreateUserDto): Promise<User> {
    await this.userRepo.update(id, updateUserDto);
    return this.userRepo.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.userRepo.delete(id);
  }
}
