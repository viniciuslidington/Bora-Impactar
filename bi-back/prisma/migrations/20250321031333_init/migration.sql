-- CreateEnum
CREATE TYPE "UrgencyLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "Categoria" AS ENUM ('ALIMENTO', 'SERVICOS', 'UTENSILIOS', 'MEDICAMENTOS_HIGIENE', 'BRINQUEDOS_LIVROS', 'MOVEIS', 'ITEMPET', 'AJUDAFINANCEIRA', 'OUTRA');

-- CreateTable
CREATE TABLE "RelocationProduct" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "category" "Categoria" NOT NULL,
    "description" TEXT,
    "ong_Id" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RelocationProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Request" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "category" "Categoria" NOT NULL,
    "urgency" "UrgencyLevel" NOT NULL,
    "quantity" INTEGER,
    "description" TEXT,
    "ong_Id" INTEGER,
    "requestTime" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ONGdata" (
    "id_bd" SERIAL NOT NULL,
    "id" INTEGER,
    "name" TEXT,
    "description" TEXT,
    "is_formalized" BOOLEAN,
    "start_year" INTEGER,
    "contact_phone" TEXT,
    "instagram_link" TEXT,
    "x_link" TEXT,
    "facebook_link" TEXT,
    "pix_qr_code_link" TEXT,
    "gallery_images_url" TEXT,
    "skills" TEXT,
    "causes" TEXT,
    "sustainable_development_goals" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ONGdata_pkey" PRIMARY KEY ("id_bd")
);

-- CreateIndex
CREATE UNIQUE INDEX "ONGdata_id_key" ON "ONGdata"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ONGdata_name_key" ON "ONGdata"("name");
