import type { Booking } from './booking';
import type { Order } from './order';

export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'Customer',
  STAFF = 'staff',
}

export enum StaffPosition {
  WAITER = 'waiter',
  CASHIER = 'cashier',
  CHEF = 'chef',
  DELIVERY = 'delivery',
}

export enum AuthProvider {
  CREDENTIAL = 'credential',
  GOOGLE = 'google',
}

export enum UserStatus {
  ACTIVE = 'active',
  BLOCKED = 'blocked',
  DELETED = 'deleted',
}

export enum StaffStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
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
