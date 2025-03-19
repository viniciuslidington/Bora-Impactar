/*
  Warnings:

  - You are about to drop the column `number` on the `RelocationProduct` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RelocationProduct" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "ong_Id" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_RelocationProduct" ("category", "createdAt", "description", "id", "ong_Id", "title", "updatedAt") SELECT "category", "createdAt", "description", "id", "ong_Id", "title", "updatedAt" FROM "RelocationProduct";
DROP TABLE "RelocationProduct";
ALTER TABLE "new_RelocationProduct" RENAME TO "RelocationProduct";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
