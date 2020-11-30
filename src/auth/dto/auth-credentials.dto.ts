import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MaxLength(20)
  @MinLength(4)
  @ApiProperty({
    type: String,
    description: 'The unique username for the user',
    default: 'user1',
  })
  username: string;

  @IsString()
  @MaxLength(20)
  @MinLength(8)
  // Passwords will contain at least 1 upper case letter
  // Passwords will contain at least 1 lower case letter
  // Passwords will contain at least 1 number or special character
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password should be strong',
  })
  @ApiProperty({
    type: 'String',
    description: 'Password for user',
    default: 'In@in2016',
  })
  password: string;
}
