// src/controller/todo.controller.ts
import { Session } from 'koishi';
import { TodoService } from '../service/todo.service';
import { logExecution } from '../aop/logger';
import { checkOwnership } from '../filter/auth.filter';

export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @logExecution
  async add(session: Session, content: string) {
    try {
      const newTodo = await this.todoService.addTodo(content, session.userId);
      return `✅ 添加成功！\n${this.todoService.getHelper().format(newTodo)}`;
    } catch (e) {
      return `❌ 添加失败：${e.message}`;
    }
  }

  @logExecution
  async list(session: Session) {
    const todos = await this.todoService.listTodos(session.userId);
    // 确保todos是数组后再使用map方法
    if (!Array.isArray(todos) || todos.length === 0) {
      return '📝 你还没有任何待办事项哦。';
    }
    const message = todos.map(todo => this.todoService.getHelper().format(todo)).join('\n');
    return `📝 你的待办事项：\n${message}`;
  }

  @logExecution
  async done(session: Session, todoId: number) {
    const todo = await this.todoService.completeTodo(todoId, session.userId);
    if (!todo) {
      return '❌ 操作失败：找不到该待办事项或无权操作。';
    }
    return `🎉 标记完成！\n${this.todoService.getHelper().format(todo)}`;
  }

  @logExecution
  async del(session: Session, todoId: number) {
    const success = await this.todoService.deleteTodo(todoId, session.userId);
    if (!success) {
      return '❌ 删除失败：找不到该待办事项或无权操作。';
    }
    return `🗑️ 已删除待办事项 #${todoId}`;
  }
}