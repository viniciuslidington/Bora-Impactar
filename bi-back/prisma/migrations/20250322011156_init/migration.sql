-- CreateEnum
CREATE TYPE "UrgencyLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "Categoria" AS ENUM ('ELETRODOMESTICOS_E_MOVEIS', 'UTENSILIOS_GERAIS', 'ROUPAS_E_CALCADOS', 'SAUDE_E_HIGIENE', 'MATERIAIS_EDUCATIVOS_E_CULTURAIS', 'ITENS_DE_INCLUSAO_E_MOBILIDADE', 'ELETRONICOS', 'ITENS_PET', 'OUTROS');

-- CreateTable
CREATE TABLE "RelocationProduct" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "category" "Categoria" NOT NULL,
    "description" TEXT,
    "ong_Id" INTEGER,
    "ong_Nome" TEXT,
    "ong_Imagem" TEXT,
    "ong_Phone" TEXT,
    "ong_Email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expirationDate" TIMESTAMP(3),

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
    "ong_Nome" TEXT,
    "ong_Imagem" TEXT,
    "ong_Phone" TEXT,
    "ong_Email" TEXT,
    "requestTime" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expirationDate" TIMESTAMP(3),

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
