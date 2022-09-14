/*
  Warnings:

  - Added the required column `score` to the `Taken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `score` to the `Others` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Taken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quizId" INTEGER NOT NULL,
    "quizTitle" TEXT NOT NULL,
    "quizDescription" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "score" REAL NOT NULL,
    "ownedById" INTEGER,
    CONSTRAINT "Taken_ownedById_fkey" FOREIGN KEY ("ownedById") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Taken" ("description", "id", "name", "ownedById", "quizDescription", "quizId", "quizTitle") SELECT "description", "id", "name", "ownedById", "quizDescription", "quizId", "quizTitle" FROM "Taken";
DROP TABLE "Taken";
ALTER TABLE "new_Taken" RENAME TO "Taken";
CREATE TABLE "new_Others" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "score" REAL NOT NULL,
    "ownedById" INTEGER,
    CONSTRAINT "Others_ownedById_fkey" FOREIGN KEY ("ownedById") REFERENCES "Taken" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Others" ("description", "id", "name", "ownedById") SELECT "description", "id", "name", "ownedById" FROM "Others";
DROP TABLE "Others";
ALTER TABLE "new_Others" RENAME TO "Others";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
