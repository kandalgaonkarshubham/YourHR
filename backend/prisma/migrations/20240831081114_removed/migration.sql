/*
  Warnings:

  - You are about to drop the column `education` on the `Users` table. All the data in the column will be lost.

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
    "city" TEXT,
    "experience" TEXT,
    "departmentId" INTEGER,
    "resume" TEXT,
    "skills" TEXT,
    "desiredJobType" TEXT,
    "desiredWorkLocation" TEXT,
    "desiredSalary" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Users_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Departments" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Users" ("city", "country", "createdAt", "departmentId", "desiredJobType", "desiredSalary", "desiredWorkLocation", "email", "experience", "fullname", "id", "number", "password", "pic", "resume", "skills", "updatedAt") SELECT "city", "country", "createdAt", "departmentId", "desiredJobType", "desiredSalary", "desiredWorkLocation", "email", "experience", "fullname", "id", "number", "password", "pic", "resume", "skills", "updatedAt" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
