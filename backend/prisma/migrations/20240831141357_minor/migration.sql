/*
  Warnings:

  - You are about to drop the column `languages` on the `Users` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "pic" TEXT,
    "country" TEXT,
    "experience" TEXT,
    "department" TEXT,
    "resume" TEXT,
    "skills" TEXT,
    "desiredJobType" TEXT,
    "desiredWorkLocation" TEXT,
    "desiredSalary" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Users" ("country", "createdAt", "department", "desiredJobType", "desiredSalary", "desiredWorkLocation", "email", "experience", "fullname", "id", "number", "password", "pic", "resume", "skills", "updatedAt") SELECT "country", "createdAt", "department", "desiredJobType", "desiredSalary", "desiredWorkLocation", "email", "experience", "fullname", "id", "number", "password", "pic", "resume", "skills", "updatedAt" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
