// src/helper/todo.helper.ts
import { Todo } from '../entity/todo.entity';

export class TodoHelper {
  /**
   * 根据用户输入创建一个待办事项实体
   * @param content 用户输入的内容
   * @param userId 用户ID
   */
  static create(content: string, userId: string): Omit<Todo, 'id'> {
    if (!content || content.trim().length === 0) {
      throw new Error('待办事项内容不能为空！');
    }
    return {
      content: content.trim(),
      completed: false,
      userId,
      createdAt: new Date(),
    };
  }

  /**
   * 格式化待办事项为可读字符串
   */
  static format(todo: Todo): string {
    const status = todo.completed ? '✅' : '⏳';
    return `[${todo.id}] ${status} ${todo.content}`;
  }
}
