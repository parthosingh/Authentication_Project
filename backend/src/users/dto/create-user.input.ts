import { InputType, Field } from '@nestjs/graphql';
import { UserRole } from '../schemas/user.schema';

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  scope?: string;

  @Field({ nullable: true })
  startDate?: string;

  @Field({ nullable: true })
  endDate?: string;

  @Field({ nullable: true })
  GSTNo?: string;

  @Field(() => UserRole, { defaultValue: UserRole.USER })
  role: UserRole;
}