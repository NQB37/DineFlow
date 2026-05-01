import type { Booking } from './booking';

export enum TableStatus {
  AVAILABLE = 'AVAILABLE',
  OCCUPIED = 'OCCUPIED',
  RESERVED = 'RESERVED',
  DISABLED = 'DISABLED',
}

export interface RestaurantTable {
  id: string;
  code: string;
  capacity: number;
  status: TableStatus;

  createdAt: Date;
  updatedAt: Date;

  // Relations
  bookings?: Booking[];
}
