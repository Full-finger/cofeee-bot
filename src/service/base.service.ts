// src/service/base.service.ts
import { TodoRepository } from '../generated/todo.repository';
import { TodoHelper } from '../helper/todo.helper';

// 定义你的 IBaseService
export interface IBaseService {
  getRepository(): TodoRepository;
  getHelper(): typeof TodoHelper;
}

// 基础服务实现
export abstract class BaseService implements IBaseService {
  protected repository: TodoRepository;
  protected helper: typeof TodoHelper;

  constructor(repository: TodoRepository) {
    this.repository = repository;
    this.helper = TodoHelper;
  }

  getRepository(): TodoRepository {
    return this.repository;
  }

  getHelper(): typeof TodoHelper {
    return this.helper;
  }
}
