import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks: string[];

  getAllTasks(): string[] {
    this.tasks = ['ahmed', 'mohamed'];
    return this.tasks;
  }
}
