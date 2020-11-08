import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';

// Root module for the application
@Module({
  imports: [TasksModule],
})
export class AppModule {}
