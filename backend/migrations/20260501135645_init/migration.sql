-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'REJECTED');

-- CreateEnum
CREATE TYPE "FoodStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "Locale" AS ENUM ('EN', 'VI', 'CS');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'DELIVERING', 'COMPLETED', 'CANCELLED', 'REJECTED');

-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('DELIVERY', 'PICKUP', 'DINE_IN');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('COD');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('UNPAID', 'PAID', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "TableStatus" AS ENUM ('AVAILABLE', 'OCCUPIED', 'RESERVED', 'DISABLED');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'CUSTOMER', 'STAFF');

-- CreateEnum
CREATE TYPE "StaffPosition" AS ENUM ('WAITER', 'CASHIER', 'CHEF', 'DELIVERY');

-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('CREDENTIAL', 'GOOGLE');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'BLOCKED', 'DELETED');

-- CreateEnum
CREATE TYPE "StaffStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "customerId" TEXT,
    "tableId" TEXT,
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "customerPhone" TEXT,
    "bookingDate" TIMESTAMP(3) NOT NULL,
    "numberOfGuests" INTEGER NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "note" TEXT,
    "rejectReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "imageUrl" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryTranslation" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "locale" "Locale" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "CategoryTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Food" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "imageUrl" TEXT,
    "status" "FoodStatus" NOT NULL DEFAULT 'ACTIVE',
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodTranslation" (
    "id" TEXT NOT NULL,
    "foodId" TEXT NOT NULL,
    "locale" "Locale" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "FoodTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "customerId" TEXT,
    "deliveryUserId" TEXT,
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT,
    "customerPhone" TEXT,
    "type" "OrderType" NOT NULL DEFAULT 'DELIVERY',
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "deliveryAddress" TEXT,
    "note" TEXT,
    "subtotal" DECIMAL(10,2) NOT NULL,
    "deliveryFee" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "discountAmount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "totalAmount" DECIMAL(10,2) NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL DEFAULT 'COD',
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'UNPAID',
    "confirmedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "foodId" TEXT,
    "foodName" TEXT NOT NULL,
    "foodImage" TEXT,
    "unitPrice" DECIMAL(10,2) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "totalPrice" DECIMAL(10,2) NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RestaurantTable" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "status" "TableStatus" NOT NULL DEFAULT 'AVAILABLE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RestaurantTable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "provider" "AuthProvider" NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'CUSTOMER',
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "firstName" TEXT,
    "lastName" TEXT,
    "phoneNumber" TEXT,
    "avatarUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "address" TEXT,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StaffProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "position" "StaffPosition" NOT NULL DEFAULT 'WAITER',
    "status" "StaffStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StaffProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Booking_customerId_idx" ON "Booking"("customerId");

-- CreateIndex
CREATE INDEX "Booking_tableId_idx" ON "Booking"("tableId");

-- CreateIndex
CREATE INDEX "Booking_tableId_bookingDate_status_idx" ON "Booking"("tableId", "bookingDate", "status");

-- CreateIndex
CREATE INDEX "Booking_bookingDate_idx" ON "Booking"("bookingDate");

-- CreateIndex
CREATE INDEX "Booking_status_idx" ON "Booking"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE INDEX "CategoryTranslation_locale_idx" ON "CategoryTranslation"("locale");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryTranslation_categoryId_locale_key" ON "CategoryTranslation"("categoryId", "locale");

-- CreateIndex
CREATE INDEX "Food_categoryId_idx" ON "Food"("categoryId");

-- CreateIndex
CREATE INDEX "Food_status_idx" ON "Food"("status");

-- CreateIndex
CREATE INDEX "FoodTranslation_locale_idx" ON "FoodTranslation"("locale");

-- CreateIndex
CREATE UNIQUE INDEX "FoodTranslation_foodId_locale_key" ON "FoodTranslation"("foodId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderNumber_key" ON "Order"("orderNumber");

-- CreateIndex
CREATE INDEX "Order_customerId_idx" ON "Order"("customerId");

-- CreateIndex
CREATE INDEX "Order_deliveryUserId_idx" ON "Order"("deliveryUserId");

-- CreateIndex
CREATE INDEX "Order_status_idx" ON "Order"("status");

-- CreateIndex
CREATE INDEX "Order_createdAt_idx" ON "Order"("createdAt");

-- CreateIndex
CREATE INDEX "OrderItem_orderId_idx" ON "OrderItem"("orderId");

-- CreateIndex
CREATE INDEX "OrderItem_foodId_idx" ON "OrderItem"("foodId");

-- CreateIndex
CREATE UNIQUE INDEX "RestaurantTable_code_key" ON "RestaurantTable"("code");

-- CreateIndex
CREATE INDEX "RestaurantTable_status_idx" ON "RestaurantTable"("status");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerProfile_userId_key" ON "CustomerProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "StaffProfile_userId_key" ON "StaffProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_confirmed_table_start_key" ON "Booking"("tableId", "bookingDate")
WHERE "tableId" IS NOT NULL AND "status" IN ('CONFIRMED', 'COMPLETED');

-- AddCheckConstraint
ALTER TABLE "User" ADD CONSTRAINT "User_credential_password_check"
CHECK ("provider" <> 'CREDENTIAL' OR NULLIF(BTRIM("passwordHash"), '') IS NOT NULL);

-- AddCheckConstraint
ALTER TABLE "RestaurantTable" ADD CONSTRAINT "RestaurantTable_capacity_positive_check"
CHECK ("capacity" > 0);

-- AddCheckConstraint
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_numberOfGuests_positive_check"
CHECK ("numberOfGuests" > 0);

-- AddCheckConstraint
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_confirmed_table_required_check"
CHECK ("status" NOT IN ('CONFIRMED', 'COMPLETED') OR "tableId" IS NOT NULL);

-- AddCheckConstraint
ALTER TABLE "Food" ADD CONSTRAINT "Food_price_nonnegative_check"
CHECK ("price" >= 0);

-- AddCheckConstraint
ALTER TABLE "Order" ADD CONSTRAINT "Order_amounts_consistent_check"
CHECK (
    "subtotal" >= 0
    AND "deliveryFee" >= 0
    AND "discountAmount" >= 0
    AND "totalAmount" >= 0
    AND "totalAmount" = "subtotal" + "deliveryFee" - "discountAmount"
);

-- AddCheckConstraint
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_amounts_consistent_check"
CHECK (
    "unitPrice" >= 0
    AND "quantity" > 0
    AND "totalPrice" >= 0
    AND "totalPrice" = "unitPrice" * "quantity"
);

-- CreateFunction
CREATE FUNCTION "ensure_customer_profile_role"()
RETURNS trigger AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM "User"
        WHERE "id" = NEW."userId" AND "role" = 'CUSTOMER'
    ) THEN
        RAISE EXCEPTION 'CustomerProfile requires a CUSTOMER user';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- CreateFunction
CREATE FUNCTION "ensure_staff_profile_role"()
RETURNS trigger AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM "User"
        WHERE "id" = NEW."userId" AND "role" = 'STAFF'
    ) THEN
        RAISE EXCEPTION 'StaffProfile requires a STAFF user';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- CreateFunction
CREATE FUNCTION "ensure_user_profile_role"()
RETURNS trigger AS $$
BEGIN
    IF NEW."role" <> 'CUSTOMER' AND EXISTS (
        SELECT 1 FROM "CustomerProfile" WHERE "userId" = NEW."id"
    ) THEN
        RAISE EXCEPTION 'Users with CustomerProfile must have CUSTOMER role';
    END IF;

    IF NEW."role" <> 'STAFF' AND EXISTS (
        SELECT 1 FROM "StaffProfile" WHERE "userId" = NEW."id"
    ) THEN
        RAISE EXCEPTION 'Users with StaffProfile must have STAFF role';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- CreateFunction
CREATE FUNCTION "ensure_booking_table_capacity"()
RETURNS trigger AS $$
DECLARE
    table_capacity INTEGER;
BEGIN
    IF NEW."tableId" IS NULL THEN
        RETURN NEW;
    END IF;

    SELECT "capacity" INTO table_capacity
    FROM "RestaurantTable"
    WHERE "id" = NEW."tableId";

    IF table_capacity IS NOT NULL AND NEW."numberOfGuests" > table_capacity THEN
        RAISE EXCEPTION 'Booking guests exceed assigned table capacity';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- CreateFunction
CREATE FUNCTION "ensure_table_capacity_covers_bookings"()
RETURNS trigger AS $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM "Booking"
        WHERE "tableId" = NEW."id" AND "numberOfGuests" > NEW."capacity"
    ) THEN
        RAISE EXCEPTION 'Table capacity cannot be below assigned booking guests';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- CreateFunction
CREATE FUNCTION "ensure_order_subtotal_matches_items_by_order_id"(order_id TEXT)
RETURNS void AS $$
DECLARE
    item_subtotal DECIMAL(10, 2);
    order_subtotal DECIMAL(10, 2);
BEGIN
    SELECT COALESCE(SUM("totalPrice"), 0)
    INTO item_subtotal
    FROM "OrderItem"
    WHERE "orderId" = order_id;

    SELECT "subtotal"
    INTO order_subtotal
    FROM "Order"
    WHERE "id" = order_id;

    IF order_subtotal IS NOT NULL AND order_subtotal <> item_subtotal THEN
        RAISE EXCEPTION 'Order subtotal must match sum of order item totals';
    END IF;
END;
$$ LANGUAGE plpgsql;

-- CreateFunction
CREATE FUNCTION "ensure_order_subtotal_matches_items_from_order"()
RETURNS trigger AS $$
BEGIN
    PERFORM "ensure_order_subtotal_matches_items_by_order_id"(NEW."id");
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- CreateFunction
CREATE FUNCTION "ensure_order_subtotal_matches_items_from_item"()
RETURNS trigger AS $$
BEGIN
    PERFORM "ensure_order_subtotal_matches_items_by_order_id"(COALESCE(NEW."orderId", OLD."orderId"));

    IF TG_OP = 'UPDATE' THEN
        IF NEW."orderId" <> OLD."orderId" THEN
            PERFORM "ensure_order_subtotal_matches_items_by_order_id"(OLD."orderId");
        END IF;
    END IF;

    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- CreateTrigger
CREATE TRIGGER "CustomerProfile_role_check"
BEFORE INSERT OR UPDATE OF "userId" ON "CustomerProfile"
FOR EACH ROW EXECUTE FUNCTION "ensure_customer_profile_role"();

-- CreateTrigger
CREATE TRIGGER "StaffProfile_role_check"
BEFORE INSERT OR UPDATE OF "userId" ON "StaffProfile"
FOR EACH ROW EXECUTE FUNCTION "ensure_staff_profile_role"();

-- CreateTrigger
CREATE TRIGGER "User_profile_role_check"
BEFORE UPDATE OF "role" ON "User"
FOR EACH ROW EXECUTE FUNCTION "ensure_user_profile_role"();

-- CreateTrigger
CREATE TRIGGER "Booking_table_capacity_check"
BEFORE INSERT OR UPDATE OF "tableId", "numberOfGuests" ON "Booking"
FOR EACH ROW EXECUTE FUNCTION "ensure_booking_table_capacity"();

-- CreateTrigger
CREATE TRIGGER "RestaurantTable_capacity_booking_check"
BEFORE UPDATE OF "capacity" ON "RestaurantTable"
FOR EACH ROW EXECUTE FUNCTION "ensure_table_capacity_covers_bookings"();

-- CreateTrigger
CREATE CONSTRAINT TRIGGER "Order_subtotal_matches_items_check"
AFTER INSERT OR UPDATE OF "subtotal" ON "Order"
DEFERRABLE INITIALLY DEFERRED
FOR EACH ROW EXECUTE FUNCTION "ensure_order_subtotal_matches_items_from_order"();

-- CreateTrigger
CREATE CONSTRAINT TRIGGER "OrderItem_subtotal_matches_order_check"
AFTER INSERT OR UPDATE OR DELETE ON "OrderItem"
DEFERRABLE INITIALLY DEFERRED
FOR EACH ROW EXECUTE FUNCTION "ensure_order_subtotal_matches_items_from_item"();

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "RestaurantTable"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryTranslation" ADD CONSTRAINT "CategoryTranslation_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Food" ADD CONSTRAINT "Food_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodTranslation" ADD CONSTRAINT "FoodTranslation_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_deliveryUserId_fkey" FOREIGN KEY ("deliveryUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerProfile" ADD CONSTRAINT "CustomerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffProfile" ADD CONSTRAINT "StaffProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
