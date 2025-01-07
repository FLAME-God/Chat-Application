/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Avatar` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Avatar_user_id_key" ON "Avatar"("user_id");
