// src/repository/base.repository.ts
import { Database } from 'koishi';
import { Todo } from '../entity/todo.entity';

// 使用泛型定义一个基础的仓库接口
export interface BaseRepository<T> {
  create(data: Partial<T>): Promise<T>;
  findById(id: number): Promise<T>;
  findMany(filter: Partial<T>): Promise<T[]>;
  update(id: number, data: Partial<T>): Promise<T>;
  delete(id: number): Promise<void>;
}

// 基础仓库实现，使用 Koishi 的数据库
export abstract class KoishiBaseRepository<T extends { id: number }> implements BaseRepository<T> {
  protected db: Database;
  protected table: string;

  constructor(db: Database, table: string) {
    this.db = db;
    this.table = table;
  }

  async create(data: Partial<T>): Promise<T> {
    // @ts-ignore
    return this.db.create(this.table, data);
  }

  async findById(id: number): Promise<T> {
    // @ts-ignore
    return this.db.get(this.table, { id });
  }

  async findMany(filter: Partial<T>): Promise<T[]> {
    // @ts-ignore
    return this.db.get(this.table, filter);
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    // @ts-ignore
    return this.db.upsert(this.table, { id, ...data });
  }

  async delete(id: number): Promise<void> {
    // @ts-ignore
    this.db.remove(this.table, { id });
  }
}