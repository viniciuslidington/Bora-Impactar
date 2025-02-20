-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ONGdata" (
    "id_bd" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_ONGdata" ("causes", "contact_phone", "createdAt", "description", "facebook_link", "gallery_images_url", "id", "id_bd", "instagram_link", "is_formalized", "name", "pix_qr_code_link", "skills", "start_year", "sustainable_development_goals", "updatedAt", "x_link") SELECT "causes", "contact_phone", "createdAt", "description", "facebook_link", "gallery_images_url", "id", "id_bd", "instagram_link", "is_formalized", "name", "pix_qr_code_link", "skills", "start_year", "sustainable_development_goals", "updatedAt", "x_link" FROM "ONGdata";
DROP TABLE "ONGdata";
ALTER TABLE "new_ONGdata" RENAME TO "ONGdata";
CREATE UNIQUE INDEX "ONGdata_id_key" ON "ONGdata"("id");
CREATE UNIQUE INDEX "ONGdata_name_key" ON "ONGdata"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
