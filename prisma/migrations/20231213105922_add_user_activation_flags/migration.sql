-- AlterTable
ALTER TABLE "User" ADD COLUMN     "hasEntity" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false;
