import { Injectable, BadRequestException, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  private readonly logger = new Logger('AuthService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    
    try {

      const {password, ...rest} = createUserDto;

      const user = this.userRepository.create({
        ...rest,
        password: bcrypt.hashSync(password, 10)
      });
      
      await this.userRepository.save(user);

      delete user.password;
      return {
        ...user,
        token: this.getJwt({id: user.id})
      };

    } catch (error) {
      this.handleExceptions(error);
    }

  }

  async login(loginUserDto: LoginUserDto) {
    
    try {

      const {password, email} = loginUserDto;

      const user = await this.userRepository.findOne({
        where: {email},
        select: {email: true, password: true, id: true}
      });
      
      if(!user) throw new UnauthorizedException('Invalid credentials');

      if(!bcrypt.compareSync(password, user.password)) throw new UnauthorizedException('Invalid credentials');

      delete user.password;
      return {
        ...user,
        token: this.getJwt({id: user.id})
      };

    } catch (error) {
      this.handleExceptions(error);
    }

  }

  async checkAuthStatus(user: User) {
    return {
      ...user,
      token: this.getJwt({id: user.id})
    };
  }

  private getJwt(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleExceptions(error: any): never {
    if(error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(`Can't continue - Check server logs`);
  }
}
