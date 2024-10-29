/*
  Warnings:

  - You are about to drop the `Emotions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Emotions" DROP CONSTRAINT "Emotions_user_id_fkey";

-- DropTable
DROP TABLE "Emotions";

-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Emotion" (
    "emotion_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "emotion_type" VARCHAR(50) NOT NULL,
    "emotion_intensity" INTEGER NOT NULL DEFAULT 1,
    "description" TEXT,
    "emotion_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Emotion_pkey" PRIMARY KEY ("emotion_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Emotion" ADD CONSTRAINT "Emotion_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
