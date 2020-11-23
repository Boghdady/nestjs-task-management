import { EntityRepository, Repository } from 'typeorm';

import { CreateTaskDto } from './dto/create-task.dto';
import { TasksFilterDto } from './dto/tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { TaskEntity } from './task.entity';

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
  //==============================(getTasks)====================================================//
  // Useing repository to build a query
  async getTasks(tasksFilterDto: TasksFilterDto): Promise<TaskEntity[]> {
    const { status, search } = tasksFilterDto;
    // 1) Build a query
    const query = this.createQueryBuilder('task');
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
