import { Injectable, NotFoundException } from '@nestjs/common';
import { ITask, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/get-task-filter-dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { UpdateTaskDto } from './dto/updata-task-dto';
@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<ITask>
  ) {}

  async getAllTasks(filterDto) {
   
    const tasks = await this.taskModel.find();
    return tasks;
  }

  async getTask(id: string) {
    const task = await this.taskModel.findById(id);
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto) {
    const createTask = new this.taskModel(createTaskDto);
    const result = await createTask.save();

    return result;
  }

  async deleteTask(id: string) {
    //const check = this.tasks.find((task) => task.id === id);
    const taskData = await this.taskModel.findById(id);
    if (!taskData) {
      throw new NotFoundException();
    }
    // const index = this.tasks.findIndex(p => p.id == id)
    // return this.tasks.slice(index,1)

    const task = await this.taskModel.findByIdAndDelete(id);
    return task;
  }

  async updateTask(id: string, payload: UpdateTaskDto) {
 

    const updatedNote = await this.taskModel.findByIdAndUpdate(id, payload, {
      new: true,
    });
    if (!updatedNote) {
      throw new NotFoundException('Note not found');
    }
    return updatedNote;
  }

  getTaskWithFilter(filterDto: GetTaskFilterDto) {
    // const { status , search} = filterDto;
    // let tasks = this.getAllTasks();
    // if (status ) {
    //   tasks = tasks.filter((task) => task.status === status);
    // }
    // if (search) {
    //   tasks = tasks.filter((task) => {
    //     if (task.title.toLowerCase().includes(search.toLowerCase()) || task.description.toLowerCase().includes(search.toLowerCase())) {
    //       return true;
    //     }
    //     return false;
    //   })
    // }
    // return tasks;
  }
}
