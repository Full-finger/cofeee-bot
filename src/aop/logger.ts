// src/aop/logger.ts
import { Context, Session } from 'koishi';

export function logExecution(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  // 检查 descriptor 是否存在并且有 value 属性
  if (!descriptor || !descriptor.value) {
    return descriptor;
  }

  const method = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    const session: Session = args[0];
    console.log(`[AOP] 用户 ${session?.userId ?? '未知用户'} 尝试执行 ${target.constructor.name}.${propertyName}`);
    const result = await method.apply(this, args);
    console.log(`[AOP] ${target.constructor.name}.${propertyName} 执行完毕`);
    return result;
  };

  return descriptor;
}