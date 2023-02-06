-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Airman', 'Admin', 'Monitor', 'Supervisor');

-- CreateTable
CREATE TABLE "Airman" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "rank" TEXT,
    "firstName" TEXT,
    "middleName" TEXT,
    "lastName" TEXT,
    "organization" TEXT,
    "officeSymbol" TEXT,
    "dodId" TEXT,
    "afsc" TEXT,
    "resetToken" TEXT,
    "resetTokenExpiresAt" TIMESTAMP(3),
    "supervisorId" INTEGER,
    "roles" "Role" NOT NULL DEFAULT 'Airman',

    CONSTRAINT "Airman_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Training" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "link" TEXT,
    "duration" INTEGER,

    CONSTRAINT "Training_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingCollection" (
    "id" SERIAL NOT NULL,
    "trainingId" INTEGER NOT NULL,
    "collectionId" INTEGER NOT NULL,

    CONSTRAINT "TrainingCollection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Airman_email_key" ON "Airman"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Training_name_key" ON "Training"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Collection_name_key" ON "Collection"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TrainingCollection_trainingId_collectionId_key" ON "TrainingCollection"("trainingId", "collectionId");

-- AddForeignKey
ALTER TABLE "Airman" ADD CONSTRAINT "Airman_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES "Airman"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingCollection" ADD CONSTRAINT "TrainingCollection_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingCollection" ADD CONSTRAINT "TrainingCollection_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
