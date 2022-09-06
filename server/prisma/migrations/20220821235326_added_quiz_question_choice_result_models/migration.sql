-- CreateTable
CREATE TABLE "Quiz" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ownedById" INTEGER,
    CONSTRAINT "Quiz_ownedById_fkey" FOREIGN KEY ("ownedById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "ownedById" INTEGER,
    CONSTRAINT "Question_ownedById_fkey" FOREIGN KEY ("ownedById") REFERENCES "Quiz" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Choice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "ownedById" INTEGER,
    CONSTRAINT "Choice_ownedById_fkey" FOREIGN KEY ("ownedById") REFERENCES "Question" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Result" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ownedById" INTEGER,
    CONSTRAINT "Result_ownedById_fkey" FOREIGN KEY ("ownedById") REFERENCES "Quiz" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
