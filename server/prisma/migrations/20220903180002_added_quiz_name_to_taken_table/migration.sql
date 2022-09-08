/*
  Warnings:

  - Added the required column `quizName` to the `Taken` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Taken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quizId" INTEGER NOT NULL,
    "quizName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "score" REAL NOT NULL,
    "ownedById" INTEGER,
    CONSTRAINT "Taken_ownedById_fkey" FOREIGN KEY ("ownedById") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Taken" ("description", "id", "name", "ownedById", "quizId", "score") SELECT "description", "id", "name", "ownedById", "quizId", "score" FROM "Taken";
DROP TABLE "Taken";
ALTER TABLE "new_Taken" RENAME TO "Taken";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
