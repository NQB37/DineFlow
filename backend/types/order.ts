import type { User } from './user';
import type { Food } from './menu';

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PREPARING = 'PREPARING',
  READY = 'READY',
  DELIVERING = 'DELIVERING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  REJECTED = 'REJECTED',
}

export enum OrderType {
  DELIVERY = 'DELIVERY',
  PICKUP = 'PICKUP',
  DINE_IN = 'DINE_IN',
}

export enum PaymentMethod {
  COD = 'COD',
}

export enum PaymentStatus {
  UNPAID = 'UNPAID',
  PAID = 'PAID',
}

export interface Order {
  id: string;
  orderNumber: string;

  customerId?: string | null;
  deliveryUserId?: string | null;

  customerName: string;
  customerEmail?: string | null;
  customerPhone?: string | null;

  type: OrderType;
  status: OrderStatus;

  deliveryAddress?: string | null;
  note?: string | null;

  subtotal: number;
  deliveryFee: number;
  discountAmount: number;
  totalAmount: number;

  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;

  confirmedAt?: Date | null;
  completedAt?: Date | null;
  cancelledAt?: Date | null;

  createdAt: Date;
  updatedAt: Date;

  // Relations
  customer?: User | null;
  deliveryUser?: User | null;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  foodId?: string | null;

  foodName: string;
  foodImage?: string | null;
  unitPrice: number;
  quantity: number;
  totalPrice: number;

  note?: string | null;

  createdAt: Date;

  // Relations
  order?: Order;
  food?: Food | null;
}
