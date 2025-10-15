// src/entity/todo.entity.ts
export interface Todo {
  id: number;
  content: string;
  completed: boolean;
  userId: string; // 关联到用户
  createdAt: Date;
}
