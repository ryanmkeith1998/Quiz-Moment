/*
  Warnings:

  - Made the column `published` on table `Quiz` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Quiz" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL,
    "ownedById" INTEGER,
    CONSTRAINT "Quiz_ownedById_fkey" FOREIGN KEY ("ownedById") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Quiz" ("createdAt", "description", "id", "ownedById", "published", "title") SELECT "createdAt", "description", "id", "ownedById", "published", "title" FROM "Quiz";
DROP TABLE "Quiz";
ALTER TABLE "new_Quiz" RENAME TO "Quiz";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
