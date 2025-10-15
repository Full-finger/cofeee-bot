// src/generated/todo.repository.ts
// --- 此文件由 scripts/generate.sh 自动生成，请勿手动修改 ---

import { KoishiBaseRepository } from '../src/repository/base.repository';
import { Todo } from '../src/entity/todo.entity';

// 继承基础仓库，获得所有CRUD方法
export class TodoRepository extends KoishiBaseRepository<Todo> {
  constructor(db) {
    super(db, 'todo'); // 指定表名为 'todo'
  }

  // 这里可以添加根据 Todo 实体字段生成的特定查询方法
  async findByUserId(userId: string): Promise<Todo[]> {
    return this.findMany({ userId });
  }
}