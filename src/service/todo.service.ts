// src/service/todo.service.ts
import { BaseService } from './base.service';
import { TodoRepository } from '../generated/todo.repository';
import { Todo } from '../entity/todo.entity';

export class TodoService extends BaseService {
  constructor(repository: TodoRepository) {
    super(repository);
  }

  async addTodo(content: string, userId: string): Promise<Todo> {
    const newTodoData = this.getHelper().create(content, userId);
    return this.getRepository().create(newTodoData);
  }

  async listTodos(userId: string): Promise<Todo[]> {
    const todoRepo = this.getRepository() as TodoRepository;
    const todos = await todoRepo.findByUserId(userId);
    // 确保返回的是数组
    return Array.isArray(todos) ? todos : [];
  }

  async completeTodo(todoId: number, userId: string): Promise<Todo | null> {
    const todo = await this.getRepository().findById(todoId);
    if (!todo || todo.userId !== userId) {
      return null; // 不存在或不属于当前用户
    }
    return this.getRepository().update(todoId, { completed: true });
  }

  async deleteTodo(todoId: number, userId: string): Promise<boolean> {
    const todo = await this.getRepository().findById(todoId);
    if (!todo || todo.userId !== userId) {
      return false;
    }
    await this.getRepository().delete(todoId);
    return true;
  }
}