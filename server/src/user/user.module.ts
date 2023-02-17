import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { UserRepository } from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.schema';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/util/environment';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '60d' },
    }),
  ],
  providers: [UserResolver, UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
