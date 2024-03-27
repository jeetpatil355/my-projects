import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  getTasks() {
    return [];
  }

  createTask() {
    console.log('task created');
    return true;
  }
}
