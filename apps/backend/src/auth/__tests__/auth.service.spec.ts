/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException, ConflictException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';
import { User } from '../../user/user.entity';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';

describe('AuthService', () => {
  let service: AuthService;
  let userService: jest.Mocked<UserService>;
  let jwtService: jest.Mocked<JwtService>;

  const mockUser: User = {
    id: 'test-id',
    email: 'test@example.com',
    passwordHash: 'hashed-password',
    username: 'testuser',
    avatarUrl: null,
    isActive: true,
    isAdmin: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    characters: [],
  };

  beforeEach(async () => {
    const mockUserService = {
      findByEmail: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      validatePassword: jest.fn(),
    };

    const mockJwtService = {
      sign: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get(UserService);
    jwtService = module.get(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    const loginDto: LoginDto = {
      email: 'test@example.com',
      password: 'password123',
    };

    it('should return access token and user on successful login', async () => {
      userService.findByEmail.mockResolvedValue(mockUser);
      userService.validatePassword.mockResolvedValue(true);
      jwtService.sign.mockReturnValue('mock-jwt-token');

      const result = await service.login(loginDto);

      expect(result).toEqual({
        accessToken: 'mock-jwt-token',
        user: mockUser,
      });
      expect(userService.findByEmail).toHaveBeenCalledWith(loginDto.email);
      expect(userService.validatePassword).toHaveBeenCalledWith(
        mockUser,
        loginDto.password,
      );
      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: mockUser.id,
        email: mockUser.email,
        username: mockUser.username,
      });
    });

    it('should throw UnauthorizedException if user not found', async () => {
      userService.findByEmail.mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
      expect(userService.findByEmail).toHaveBeenCalledWith(loginDto.email);
    });

    it('should throw UnauthorizedException if password is invalid', async () => {
      userService.findByEmail.mockResolvedValue(mockUser);
      userService.validatePassword.mockResolvedValue(false);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException if user is inactive', async () => {
      const inactiveUser = { ...mockUser, isActive: false };
      userService.findByEmail.mockResolvedValue(inactiveUser);
      userService.validatePassword.mockResolvedValue(true);

      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('register', () => {
    const registerDto: RegisterDto = {
      email: 'new@example.com',
      password: 'password123',
      username: 'newuser',
    };

    it('should create user and return access token', async () => {
      const newUser = { ...mockUser, ...registerDto, passwordHash: 'hashed' };
      userService.create.mockResolvedValue(newUser);
      jwtService.sign.mockReturnValue('mock-jwt-token');

      const result = await service.register(registerDto);

      expect(result).toEqual({
        accessToken: 'mock-jwt-token',
        user: newUser,
      });
      expect(userService.create).toHaveBeenCalledWith({
        email: registerDto.email,
        password: registerDto.password,
        username: registerDto.username,
        avatarUrl: undefined,
      });
    });

    it('should throw ConflictException if email exists', async () => {
      userService.create.mockRejectedValue(
        new ConflictException('Email already registered'),
      );

      await expect(service.register(registerDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('validateUser', () => {
    it('should return user if valid', async () => {
      userService.findById.mockResolvedValue(mockUser);

      const result = await service.validateUser({
        sub: 'test-id',
        email: 'test@example.com',
        username: 'testuser',
      });

      expect(result).toEqual(mockUser);
    });

    it('should throw UnauthorizedException if user not found', async () => {
      userService.findById.mockResolvedValue(null);

      await expect(
        service.validateUser({
          sub: 'test-id',
          email: 'test@example.com',
          username: 'testuser',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if user is inactive', async () => {
      const inactiveUser = { ...mockUser, isActive: false };
      userService.findById.mockResolvedValue(inactiveUser);

      await expect(
        service.validateUser({
          sub: 'test-id',
          email: 'test@example.com',
          username: 'testuser',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('getProfile', () => {
    it('should return user profile', async () => {
      userService.findById.mockResolvedValue(mockUser);

      const result = await service.getProfile('test-id');

      expect(result).toEqual(mockUser);
    });
  });
});
