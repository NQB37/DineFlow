import type { Booking } from './booking';
import type { Order } from './order';

export enum UserRole {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
  STAFF = 'STAFF',
}

export enum StaffPosition {
  WAITER = 'WAITER',
  CASHIER = 'CASHIER',
  CHEF = 'CHEF',
  DELIVERY = 'DELIVERY',
}

export enum AuthProvider {
  CREDENTIAL = 'CREDENTIAL',
  GOOGLE = 'GOOGLE',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  BLOCKED = 'BLOCKED',
  DELETED = 'DELETED',
}

export enum StaffStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface User {
  id: string;
  email: string;
  passwordHash?: string | null;
  provider: AuthProvider;
  role: UserRole;
  status: UserStatus;

  firstName?: string | null;
  lastName?: string | null;
  phoneNumber?: string | null;
  avatarUrl?: string | null;

  createdAt: Date;
  updatedAt: Date;

  // Relations (optional because they are conditionally included)
  customerProfile?: CustomerProfile | null;
  staffProfile?: StaffProfile | null;
  refreshTokens?: RefreshToken[];
  bookings?: Booking[];
  orders?: Order[];
  deliveryOrders?: Order[];
}

export interface CustomerProfile {
  id: string;
  userId: string;

  address?: string | null;
  note?: string | null;

  createdAt: Date;
  updatedAt: Date;

  // Relations
  user?: User;
}

export interface StaffProfile {
  id: string;
  userId: string;

  position: StaffPosition;
  status: StaffStatus;

  createdAt: Date;
  updatedAt: Date;

  // Relations
  user?: User;
}

export interface RefreshToken {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  revokedAt?: Date | null;
  replacedBy?: string | null;
  createdAt: Date;

  // Relations
  user?: User;
}
