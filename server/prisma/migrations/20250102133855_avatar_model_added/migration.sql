-- DropIndex
DROP INDEX "Users_username_key";

-- CreateTable
CREATE TABLE "Avatar" (
    "avatar_id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Avatar_pkey" PRIMARY KEY ("avatar_id")
);

-- AddForeignKey
ALTER TABLE "Avatar" ADD CONSTRAINT "Avatar_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
