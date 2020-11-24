import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';

import { CreateTaskDto } from './dto/create-task.dto';
import { TasksFilterDto } from './dto/tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { TaskEntity } from './task.entity';

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
  //==============================(getTasks)====================================================//
  // Useing repository to build a query
  async getTasks(
    tasksFilterDto: TasksFilterDto,
    user: User,
  ): Promise<TaskEntity[]> {
    const { status, search } = tasksFilterDto;
    // 1) Build a query
    const query = this.createQueryBuilder('task');

    query.where('task.userId = :userId', { userId: user.id });

    if (status) {
      query.andWhere('task.status = :status ', {
        status: status,
      });
    }
    if (search) {
      query.andWhere(
        'task.title LIKE :search OR task.description LIKE :search',
        { search: `%${search}%` },
      );
    }
    // 2) Execute the query
    const tasks = await query.getMany();
    return tasks;
  }
  //==============================(createTask)====================================================//
  // 1) Using Entity
  async createTask(
    createTaskDto: CreateTaskDto,
    user: User,
  ): Promise<TaskEntity> {
    const { title, description } = createTaskDto;
    const taskEntity = new TaskEntity();

    taskEntity.title = title;
    taskEntity.description = description;
    taskEntity.status = TaskStatus.OPEN;
    taskEntity.user = user;

    await taskEntity.save();

    delete taskEntity.user;
    return taskEntity;
  }
}
