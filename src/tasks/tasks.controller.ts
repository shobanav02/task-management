import { Controller , Get , Query, Post, Body , Param , Delete, Put, Patch, UseGuards} from '@nestjs/common';
import { TasksService } from './tasks.service';
import {  TaskStatus } from './tasks.model';
import { title } from 'process';
import { CreateTaskDto } from './dto/create-task-dto';
import { Console } from 'console';
import { GetTaskFilterDto } from './dto/get-task-filter-dto';
import { UpdateTaskDto } from './dto/updata-task-dto';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
   constructor ( private readonly tasksService: TasksService,
    private configService:  ConfigService
    ) {
      console.log(configService.get('TEST_VALUE'))
    }
   

    @Get()
    getTasks(@Query() filterDto: GetTaskFilterDto) {
         return this.tasksService.getAllTasks(filterDto);
      
    }

    @Get('/:id')
    getTask(@Param('id') id:string)  {
      return this.tasksService.getTask(id)
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto)  {
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id:string)  {
      return this.tasksService.deleteTask(id)
    }

    @Patch('/:id/status')
    updateTask (
      @Param('id') id:string,
      @Body() updateTaskDto:UpdateTaskDto
    ) {
      
      const { status} = updateTaskDto;
       return this.tasksService.updateTask (id, updateTaskDto);
    }
    
}
