import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
// import { CreateAuthInput } from './dto/create-auth.input';
// import { UpdateAuthInput } from './dto/update-auth.input';

@Injectable()
export class AuthService {
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);

    return bcrypt.hash(password, salt);
  }

  validatePassword(userPassword, hashedPassword): Promise<boolean> {
    return bcrypt.compare(userPassword, hashedPassword);
  }
}
