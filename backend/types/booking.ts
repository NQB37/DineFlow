import type { RestaurantTable } from './restaurant.ts';
import type { User } from './user.ts';

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED',
}

export interface Booking {
  id: string;
  customerId?: string | null;
  tableId?: string | null;

  customerName: string;
  customerEmail: string;
  customerPhone?: string | null;

  bookingDate: Date;
  numberOfGuests: number;

  status: BookingStatus;
  note?: string | null;
  rejectReason?: string | null;

  createdAt: Date;
  updatedAt: Date;

  // Relations
  customer?: User | null;
  table?: RestaurantTable | null;
}
