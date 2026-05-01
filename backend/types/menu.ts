import type { OrderItem } from './order.ts';

export enum FoodStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum Locale {
  EN = 'EN',
  VI = 'VI',
  CS = 'CS',
}

export interface Category {
  id: string;
  slug: string;
  imageUrl?: string | null;
  sortOrder: number;
  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;

  // Relations
  translations?: CategoryTranslation[];
  foods?: Food[];
}

export interface CategoryTranslation {
  id: string;
  categoryId: string;
  locale: Locale;

  name: string;
  description?: string | null;

  // Relations
  category?: Category;
}

export interface Food {
  id: string;
  categoryId: string;

  price: number;
  imageUrl?: string | null;
  status: FoodStatus;

  isFeatured: boolean;
  sortOrder: number;

  createdAt: Date;
  updatedAt: Date;

  // Relations
  category?: Category;
  translations?: FoodTranslation[];
  orderItems?: OrderItem[];
}

export interface FoodTranslation {
  id: string;
  foodId: string;
  locale: Locale;

  name: string;
  description?: string | null;

  // Relations
  food?: Food;
}
