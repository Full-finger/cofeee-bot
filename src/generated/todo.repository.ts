// --- 此文件由 scripts/generate.sh 自动生成，请勿手动修改 ---

import { KoishiBaseRepository } from '../src/repository/base.repository';
import { Todo } from '../src/entity/todo.entity';

export class TodoRepository extends KoishiBaseRepository<Todo> {
  constructor(db) {
    super(db, 'todo');
  }

  async findByUserId(userId: string): Promise<Todo[]> {
    return this.findMany({ userId });
  }
}
