/*
  Warnings:

  - You are about to drop the column `result` on the `Choice` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Choice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "resultId" INTEGER,
    "value" INTEGER NOT NULL,
    "ownedById" INTEGER,
    CONSTRAINT "Choice_resultId_fkey" FOREIGN KEY ("resultId") REFERENCES "Result" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Choice_ownedById_fkey" FOREIGN KEY ("ownedById") REFERENCES "Question" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Choice" ("content", "id", "ownedById", "value") SELECT "content", "id", "ownedById", "value" FROM "Choice";
DROP TABLE "Choice";
ALTER TABLE "new_Choice" RENAME TO "Choice";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
