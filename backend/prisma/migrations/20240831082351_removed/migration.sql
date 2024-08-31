/*
  Warnings:

  - You are about to drop the `Languages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserLanguages` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN "languages" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Languages";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_UserLanguages";
PRAGMA foreign_keys=on;
