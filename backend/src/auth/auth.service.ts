import {
  Injectable,
  Dependencies,
  UnauthorizedException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from 'src/entities/user/user.service';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constantes';
import { User } from 'src/entities/user/user.entity';

@Injectable()
@Dependencies(UserService)
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string, res: any): Promise<void> {
    const user = await this.userService.findOneByEmail(email);
    //on utilise bCrypt pour comparer les mots de passe
    const match = await bcrypt.compare(pass, user.password);
    if (!match) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;

    const payload = { email: user.email, sub: user.id, role: user.role };
    //on verfiie que le jwtService est bien instancié

    //Utilisation du service jwt inclue dans NestJS
    const token = jwt.sign(payload, jwtConstants.secret, {
      expiresIn: '1d',
    });

    // Définir le cookie HTTP-only
    res.cookie('jwtToken', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
    });

    console.log('token', token);

    res.status(HttpStatus.OK).json(result);
  }
}
