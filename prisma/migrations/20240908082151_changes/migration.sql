/*
  Warnings:

  - A unique constraint covering the columns `[departmentId]` on the table `Queue` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Queue_departmentId_key" ON "Queue"("departmentId");
