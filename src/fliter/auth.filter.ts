// src/filter/auth.filter.ts
import { Session } from 'koishi';

// 这是一个简单的权限检查，可以扩展
export function checkOwnership(session: Session, todo: { userId: string }): boolean {
  return todo.userId === session.userId;
}
