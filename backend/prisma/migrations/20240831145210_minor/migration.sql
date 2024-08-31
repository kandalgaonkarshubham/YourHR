/*
  Warnings:

  - You are about to drop the column `department` on the `Jobs` table. All the data in the column will be lost.

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
    "requiredExperience" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "jobType" TEXT NOT NULL,
    "salary" TEXT,
    "requiredSkills" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Jobs_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Departments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Jobs" ("city", "companyDesc", "companyName", "country", "createdAt", "departmentId", "id", "jobDescription", "jobName", "jobType", "pic", "requiredExperience", "requiredSkills", "salary", "serviceType", "updatedAt") SELECT "city", "companyDesc", "companyName", "country", "createdAt", "departmentId", "id", "jobDescription", "jobName", "jobType", "pic", "requiredExperience", "requiredSkills", "salary", "serviceType", "updatedAt" FROM "Jobs";
DROP TABLE "Jobs";
ALTER TABLE "new_Jobs" RENAME TO "Jobs";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
