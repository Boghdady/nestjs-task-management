import { TaskStatus } from '../models/tasks.model';

export class TasksFilterDto {
  status: TaskStatus;
  search: string;
}
