// src/index.ts
import { Context, Schema } from 'koishi';
import { TodoController } from './controller/todo.controller';
import { TodoService } from './service/todo.service';
import { TodoRepository } from '../generated/todo.repository';

// 插件配置
export const Config = Schema.object({
  // 可以在这里添加插件的配置项
});

export const name = 'todo-plugin';

// 声明插件依赖的服务
export const inject = ['database'];

export function apply(ctx: Context, config: any) {
  // 1. 依赖注入：初始化各层实例
  const todoRepository = new TodoRepository(ctx.database);
  const todoService = new TodoService(todoRepository);
  const todoController = new TodoController(todoService);

  // 2. 扩展数据库模型（如果使用 koishi 内置数据库）
  ctx.model.extend('todo', {
    id: 'unsigned',
    content: 'string',
    completed: 'boolean',
    userId: 'string',
    createdAt: 'timestamp',
  }, {
    autoInc: true,
  });

  // 3. 注册指令
  ctx.command('todo <content:text>', '添加一个待办事项')
    .action(async ({ session }, content) => {
      return todoController.add(session, content);
    });

  ctx.command('todo.list', '查看所有待办事项')
    .action(async ({ session }) => {
      return todoController.list(session);
    });

  ctx.command('todo.done <id:number>', '标记一个待办事项为已完成')
    .action(async ({ session }, id) => {
      return todoController.done(session, id);
    });

  ctx.command('todo.del <id:number>', '删除一个待办事项')
    .action(async ({ session }, id) => {
      return todoController.del(session, id);
    });
}
