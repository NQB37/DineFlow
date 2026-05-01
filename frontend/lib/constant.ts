export const USER_ROLE = {
  ADMIN: 'admin',
  CUSTOMER: 'customer',
  STAFF: 'staff',
} as const;

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];
