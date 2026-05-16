/*
  Warnings:

  - Added the required column `senha` to the `Paciente` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Paciente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "prioridade" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Paciente" ("createdAt", "id", "nome", "prioridade") SELECT "createdAt", "id", "nome", "prioridade" FROM "Paciente";
DROP TABLE "Paciente";
ALTER TABLE "new_Paciente" RENAME TO "Paciente";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
