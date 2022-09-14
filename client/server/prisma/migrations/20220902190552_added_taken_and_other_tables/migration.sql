-- CreateTable
CREATE TABLE "Taken" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quizId" INTEGER NOT NULL,
    "quizTitle" TEXT NOT NULL,
    "quizDescription" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ownedById" INTEGER,
    CONSTRAINT "Taken_ownedById_fkey" FOREIGN KEY ("ownedById") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Others" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ownedById" INTEGER,
    CONSTRAINT "Others_ownedById_fkey" FOREIGN KEY ("ownedById") REFERENCES "Taken" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
