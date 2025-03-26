/*
  Warnings:

  - You are about to drop the column `ong_ImagemId` on the `RelocationProduct` table. All the data in the column will be lost.
  - You are about to drop the column `ong_ImagemId` on the `Request` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RelocationProduct" DROP COLUMN "ong_ImagemId",
ADD COLUMN     "post_Imagem" TEXT,
ADD COLUMN     "post_ImagemId" TEXT;

-- AlterTable
ALTER TABLE "Request" DROP COLUMN "ong_ImagemId",
ADD COLUMN     "post_Imagem" TEXT,
ADD COLUMN     "post_ImagemId" TEXT;
