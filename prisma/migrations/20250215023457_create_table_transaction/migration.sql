-- CreateEnum
CREATE TYPE "DelivetyType" AS ENUM ('HOME_DELIVERY', 'STORE_PICKUP');

-- AlterTable
ALTER TABLE "checkouts" ADD COLUMN     "transaction_id" TEXT;

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "total_price" INTEGER NOT NULL DEFAULT 0,
    "delivery_fee" INTEGER NOT NULL DEFAULT 0,
    "asurance_fee" INTEGER NOT NULL DEFAULT 0,
    "aplication_fee" INTEGER NOT NULL DEFAULT 0,
    "grand_total_price" INTEGER NOT NULL DEFAULT 0,
    "deliveryType" "DelivetyType" NOT NULL DEFAULT 'HOME_DELIVERY',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "checkouts" ADD CONSTRAINT "checkouts_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "transactions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
