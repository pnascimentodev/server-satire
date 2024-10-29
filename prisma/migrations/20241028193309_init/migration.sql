-- CreateTable
CREATE TABLE "Users" (
    "user_id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Emotions" (
    "emotion_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "emotion_type" VARCHAR(50) NOT NULL,
    "emotion_intensity" INTEGER NOT NULL DEFAULT 1,
    "description" TEXT,
    "emotion_date" DATE NOT NULL,

    CONSTRAINT "Emotions_pkey" PRIMARY KEY ("emotion_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Emotions" ADD CONSTRAINT "Emotions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
