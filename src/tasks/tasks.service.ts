import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  private tasks: Task[] = []; 

  create(createTaskDto: CreateTaskDto): Task {
    const novaTarefa: Task = {
      id: this.tasks.length + 1,
      titulo: createTaskDto.titulo,
      descricao: createTaskDto.descricao,
    };
    this.tasks.push(novaTarefa);
    return novaTarefa; // RETORNA O OBJETO, NÃO O PUSH
  }

  findAll(): Task[] {
    return this.tasks;
  }

  // Se o Controller reclamar que não achou esses, adicione-os:
  findOne(id: number) {
    return this.tasks.find(t => t.id === id);
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    const tarefa = this.findOne(id);
    if (tarefa) {
      Object.assign(tarefa, updateTaskDto);
    }
    return tarefa;
  }

  remove(id: number) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    return { apagado: true };
  }
}