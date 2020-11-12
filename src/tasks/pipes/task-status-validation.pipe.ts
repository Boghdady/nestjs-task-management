import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../models/tasks.model';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];
  transform(value: any) {
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is not a valid status`);
    }
    return value;
  }

  private isStatusValid(status: any): boolean {
    // if index of status exist will return 1 id not will return -1
    const idx: number = this.allowedStatus.indexOf(status);
    return idx !== -1;
  }
}
