import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from 'src/user/user.module';
import { OtpService } from './otp.service';

import { JWT_SECRET } from 'src/util/environment';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '60d' },
    }),
  ],
  providers: [AuthResolver, AuthService, OtpService, JwtStrategy, AuthGuard],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
