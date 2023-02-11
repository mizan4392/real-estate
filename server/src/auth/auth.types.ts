import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class RegistrationDto {
  @Field({ description: 'Email of the user' })
  email: string;

  @Field({ description: 'Password of the user' })
  password: string;

  @Field({ description: 'FullName  of the user' })
  fullName: string;
}

@InputType()
export class LoginRequest {
  @Field({ description: 'Email of the user' })
  email: string;

  @Field({ description: 'Password of the user' })
  password: string;
}

@ObjectType({
  description: `Authenticate response`,
})
export class LoginResponse {
  @Field({ description: 'The jwt token that contains the authenticated user.' })
  jwt: string;
}
