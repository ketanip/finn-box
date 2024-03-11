-- CreateEnum
CREATE TYPE "TRANSACTION_TYPE" AS ENUM ('INCOME', 'EXPENSE');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transcactions" (
    "id" SERIAL NOT NULL,
    "transaction_type" "TRANSACTION_TYPE" NOT NULL,
    "source_destination" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "transaction_method" TEXT NOT NULL,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "transcactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "transcactions" ADD CONSTRAINT "transcactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
