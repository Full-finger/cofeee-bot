// src/entity/messagetable.entity.ts
export interface MessageTable {
  channelId: number;            // 频道ID
  capacity: number;             // 最大容量
  threshold: number;            // 触发阈值
  value: number;                // 当前值
  length: number;               // 已使用容量
  messageIn: message[];         // 消息队列
  lifeRest: number;             // 消息列表剩余寿命
}

export interface message {
  id: number;                   // 消息ID（主要用来确定回复）
  originator: number;           // 发送者ID
  recipient: number;            // 接收者ID
  content: string;              // 消息内容
  createdAt: Date;              // 创建时间
}