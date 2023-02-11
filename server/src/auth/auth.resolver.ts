import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { Mutation, Args, Resolver } from '@nestjs/graphql';
import { EmailService } from 'src/email.service';

import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

import { AuthService } from './auth.service';
import { LoginRequest, LoginResponse, RegistrationDto } from './auth.types';
import { OtpService } from './otp.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
@Resolver(() => User)
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private otpService: OtpService,
    private emailService: EmailService,
    private jwtTokenService: JwtService,
  ) {}

  @Mutation(() => LoginResponse)
  async login(@Args('loginRequest') loginRequest: LoginRequest) {
    const user = await this.userService.findUserByEmail(loginRequest.email);
    if (!user) {
      throw new BadRequestException(`No user found `);
    }
    const passwordValid = await this.authService.validatePassword(
      loginRequest.password,
      user.password,
    );
    if (!passwordValid) {
      throw new BadRequestException(`Wrong password`);
    }
    const payload = {
      email: user.email,
      fullName: user.fullName,
      id: user._id,
    };
    return {
      jwt: this.jwtTokenService.sign(payload),
    };
  }

  @Mutation(() => Boolean)
  async registration(
    @Args('registrationRequest') registrationData: RegistrationDto,
  ) {
    console.log('registrationData', registrationData);
    const userByEmail = await this.userService.findUserByEmail(
      registrationData.email.trim(),
    );
    if (userByEmail) {
      throw new ConflictException('User already exist');
    }
    const code = this.otpService.generateOtp({
      key: 'registration',
      data: registrationData,
      delTimeOut: 5 * 60 * 1000,
    });

    try {
      await this.emailService.sendEmail({
        to: registrationData.email,
        subject: `[HomeLand] : ${code} is your pin.`,
        body: `Your pin for signing up to HomeLand is ${code} , it will expire after 5 minutes.`,
      });
      return true;
    } catch (e) {
      throw new BadRequestException('sending email failed');
    }
  }

  @Mutation(() => Boolean)
  async confirmRegister(@Args('pin') pin: number) {
    const data = await this.otpService.getOtpData({
      key: 'registration',
      code: pin,
    });

    if (data) {
      //else :
      //hash password
      const hash = await this.authService.hashPassword(data.password);

      data.password = hash;
      //create a new user

      const created = await this.userService.createUser(data);
      if (created) {
        await this.emailService.sendEmail({
          to: data.email,
          subject: `Welcome to HomeLand`,
          body: `Enjoy Traveling`,
        });
        return true;
      } else {
        throw new BadRequestException('somthing went wrong');
      }
    }
  }
}
