-- CreateTable
CREATE TABLE "ONGdata" (
    "id_bd" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "is_formalized" BOOLEAN NOT NULL,
    "start_year" INTEGER NOT NULL,
    "contact_phone" TEXT NOT NULL,
    "instagram_link" TEXT NOT NULL,
    "x_link" TEXT NOT NULL,
    "facebook_link" TEXT NOT NULL,
    "pix_qr_code_link" TEXT NOT NULL,
    "gallery_images_url" TEXT NOT NULL,
    "skills" TEXT NOT NULL,
    "causes" TEXT NOT NULL,
    "sustainable_development_goals" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ONGdata_id_key" ON "ONGdata"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ONGdata_name_key" ON "ONGdata"("name");
