import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../models/tasks.model';

export class TasksFilterDto {
  @IsOptional()
  @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN])
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
