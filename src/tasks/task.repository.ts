import { EntityRepository, Repository } from 'typeorm';

import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { TaskEntity } from './task.entity';

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
  // 1) Using Entity
  async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    const { title, description } = createTaskDto;
    const taskEntity = new TaskEntity();

    taskEntity.title = title;
    taskEntity.description = description;
    taskEntity.status = TaskStatus.OPEN;

    await taskEntity.save();
    return taskEntity;
  }
}
