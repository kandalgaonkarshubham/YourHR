/*
  Warnings:

  - You are about to drop the `_JobSkills` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserSkills` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Jobs" ADD COLUMN "requiredSkills" TEXT;

-- AlterTable
ALTER TABLE "Users" ADD COLUMN "skills" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_JobSkills";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_UserSkills";
PRAGMA foreign_keys=on;
