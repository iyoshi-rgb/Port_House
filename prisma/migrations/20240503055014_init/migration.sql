/*
  Warnings:

  - You are about to drop the column `summary` on the `Article` table. All the data in the column will be lost.
  - Added the required column `contents` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagePath` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `public` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

ALTER TABLE "Article" DROP COLUMN "summary",
ADD COLUMN     "contents" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "imagePath" TEXT NOT NULL,
ADD COLUMN     "public" BOOLEAN NOT NULL,
ALTER COLUMN "id" SET DEFAULT uuid_generate_v4();
