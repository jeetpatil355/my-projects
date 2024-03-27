import { Controller, Get, Post } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  // define dependency injection for task service
  constructor(private taskService: TaskService) {}

  @Get()
  getTasks() {
    console.log('inside TaskModule -> TaskController -> getTasks()');
    return this.taskService.getTasks();
  }

  @Post()
  createTask() {
    console.log('inside TaskModule -> TaskController -> createTask()');
    return this.taskService.createTask();
  }
}
