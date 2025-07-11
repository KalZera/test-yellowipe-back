/*
  Warnings:

  - You are about to drop the column `title` on the `posts` table. All the data in the column will be lost.
  - Made the column `content` on table `posts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "title",
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ALTER COLUMN "content" SET NOT NULL,
ALTER COLUMN "published" SET DEFAULT true;
