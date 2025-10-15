#!/bin/bash
# scripts/generate.sh

echo "--- 正在生成 TodoRepository ---"
# 在真实项目中，这里会是一个 node.js 脚本，读取 entity/todo.entity.ts
# 然后生成 src/generated/todo.repository.ts 文件
# 我们现在只是模拟一下
mkdir -p src/generated
cat <<EOF > src/generated/todo.repository.ts
// --- 此文件由 scripts/generate.sh 自动生成，请勿手动修改 ---

import { KoishiBaseRepository } from '../repository/base.repository';
import { Todo } from '../entity/todo.entity';

export class TodoRepository extends KoishiBaseRepository<Todo> {
  constructor(db) {
    super(db, 'todo');
  }

  async findByUserId(userId: string): Promise<Todo[]> {
    return this.findMany({ userId });
  }
}
EOF

echo "✅ 生成完成！"
