/*
  Warnings:

  - You are about to drop the column `city` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `departmentId` on the `Users` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Jobs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pic" TEXT,
    "jobName" TEXT NOT NULL,
    "jobDescription" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "companyDesc" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "departmentId" INTEGER NOT NULL,
    "department" TEXT,
    "requiredExperience" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "jobType" TEXT NOT NULL,
    "salary" TEXT,
    "requiredSkills" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Jobs" ("city", "companyDesc", "companyName", "country", "createdAt", "departmentId", "id", "jobDescription", "jobName", "jobType", "pic", "requiredExperience", "requiredSkills", "salary", "serviceType", "updatedAt") SELECT "city", "companyDesc", "companyName", "country", "createdAt", "departmentId", "id", "jobDescription", "jobName", "jobType", "pic", "requiredExperience", "requiredSkills", "salary", "serviceType", "updatedAt" FROM "Jobs";
DROP TABLE "Jobs";
ALTER TABLE "new_Jobs" RENAME TO "Jobs";
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
    "languages" TEXT,
    "desiredJobType" TEXT,
    "desiredWorkLocation" TEXT,
    "desiredSalary" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Users" ("country", "createdAt", "desiredJobType", "desiredSalary", "desiredWorkLocation", "email", "experience", "fullname", "id", "languages", "number", "password", "pic", "resume", "skills", "updatedAt") SELECT "country", "createdAt", "desiredJobType", "desiredSalary", "desiredWorkLocation", "email", "experience", "fullname", "id", "languages", "number", "password", "pic", "resume", "skills", "updatedAt" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
