import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'Task title', default: 'Task 1' })
  title: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Task description',
    default: 'Task description test 1',
  })
  description: string;
}
