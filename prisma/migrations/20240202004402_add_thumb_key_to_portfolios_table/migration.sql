/*
  Warnings:

  - Added the required column `thumbKey` to the `portifolios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "portifolios" ADD COLUMN     "thumbKey" TEXT NOT NULL;
