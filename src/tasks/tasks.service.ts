import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateTaskDto } from './dto/create-task.dto';
import { TasksFilterDto } from './dto/tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { TaskEntity } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}
  getTasks(tasksFilterDto: TasksFilterDto): Promise<TaskEntity[]> {
    return this.taskRepository.getTasks(tasksFilterDto);
  }

  async getTaskById(id: number): Promise<TaskEntity> {
    const task = await this.taskRepository.findOne(id);
    if (!task) {
      throw new NotFoundException(`Task not found for id = ${id} `);
    }
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    return await this.taskRepository.createTask(createTaskDto);
  }

  async deleteTaskById(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`Task not found for id = ${id} `);
    }
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<void> {
    const result = await this.taskRepository.update(id, { status: status });
    if (!result.affected) {
      throw new NotFoundException(`Task not found for id = ${id} `);
    }
  }
}
