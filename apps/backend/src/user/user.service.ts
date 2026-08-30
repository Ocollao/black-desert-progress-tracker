import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

export interface CreateUserDto {
  email: string;
  password: string;
  username: string;
  avatarUrl?: string;
}

export interface UpdateUserDto {
  username?: string;
  avatarUrl?: string;
  isActive?: boolean;
}

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const emailExists = await this.userRepository.existsByEmail(
      createUserDto.email,
    );
    if (emailExists) {
      throw new ConflictException('Email already registered');
    }

    const usernameExists = await this.userRepository.existsByUsername(
      createUserDto.username,
    );
    if (usernameExists) {
      throw new ConflictException('Username already taken');
    }

    const passwordHash = await bcrypt.hash(createUserDto.password, 12);

    const user = await this.userRepository.create({
      email: createUserDto.email,
      passwordHash,
      username: createUserDto.username,
      avatarUrl: createUserDto.avatarUrl,
    });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findByUsername(username);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);

    if (updateUserDto.username && updateUserDto.username !== user.username) {
      const usernameExists = await this.userRepository.existsByUsername(
        updateUserDto.username,
      );
      if (usernameExists) {
        throw new ConflictException('Username already taken');
      }
    }

    const updatedUser = await this.userRepository.update(id, updateUserDto);
    if (!updatedUser) {
      throw new NotFoundException('User not found after update');
    }
    return updatedUser;
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.userRepository.delete(id);
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.passwordHash);
  }
}
