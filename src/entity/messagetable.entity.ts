// src/entity/messagetable.entity.ts
export interface MessageTable {
  channelId: number;
  capacity: number;
  threshold: number;
  value: number;
  messageIn: message[];
}

export interface message {
  id: number;
  originator: number;
  recipient: number;
  content: string;
  createdAt: Date;
}