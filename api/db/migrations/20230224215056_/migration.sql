-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Airman', 'Admin', 'Monitor', 'Supervisor');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Current', 'Due', 'Overdue');

-- CreateTable
CREATE TABLE "Airman" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT DEFAULT 'fe930258f2ca234018a1302dea5c3130e07890a6f25a76abb2606af1cea4b2ab',
    "salt" TEXT DEFAULT '330e567be2cd8b3eb9599af11b7880f8',
    "rank" TEXT,
    "firstName" TEXT,
    "middleName" TEXT,
    "lastName" TEXT,
    "organization" TEXT,
    "officeSymbol" TEXT,
    "dodId" TEXT,
    "afsc" TEXT,
    "status" "Status" DEFAULT 'Current',
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
    "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,
    "deletedAt" TIMESTAMPTZ(3),
    "deletedBy" TEXT,
    "editedAt" TIMESTAMPTZ(3),
    "editedBy" TEXT,

    CONSTRAINT "Training_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,
    "deletedAt" TIMESTAMPTZ(3),
    "deletedBy" TEXT,
    "editedAt" TIMESTAMPTZ(3),
    "editedBy" TEXT,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certificate" (
    "id" SERIAL NOT NULL,
    "airmanId" INTEGER NOT NULL,
    "trainingId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "completion" TIMESTAMPTZ(3) NOT NULL,
    "validated" BOOLEAN DEFAULT false,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AirmanTraining" (
    "id" SERIAL NOT NULL,
    "airmanId" INTEGER NOT NULL,
    "trainingId" INTEGER NOT NULL,
    "status" "Status" DEFAULT 'Due',
    "start" TIMESTAMP(3),
    "end" TIMESTAMP(3),
    "approval" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AirmanTraining_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingCollection" (
    "id" SERIAL NOT NULL,
    "trainingId" INTEGER NOT NULL,
    "collectionId" INTEGER NOT NULL,

    CONSTRAINT "TrainingCollection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "airmanId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Airman_email_key" ON "Airman"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Training_name_key" ON "Training"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Collection_name_key" ON "Collection"("name");

-- CreateIndex
CREATE UNIQUE INDEX "AirmanTraining_airmanId_trainingId_key" ON "AirmanTraining"("airmanId", "trainingId");

-- CreateIndex
CREATE UNIQUE INDEX "TrainingCollection_trainingId_collectionId_key" ON "TrainingCollection"("trainingId", "collectionId");

-- AddForeignKey
ALTER TABLE "Airman" ADD CONSTRAINT "Airman_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES "Airman"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_airmanId_fkey" FOREIGN KEY ("airmanId") REFERENCES "Airman"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AirmanTraining" ADD CONSTRAINT "AirmanTraining_airmanId_fkey" FOREIGN KEY ("airmanId") REFERENCES "Airman"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AirmanTraining" ADD CONSTRAINT "AirmanTraining_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingCollection" ADD CONSTRAINT "TrainingCollection_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "Training"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingCollection" ADD CONSTRAINT "TrainingCollection_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_airmanId_fkey" FOREIGN KEY ("airmanId") REFERENCES "Airman"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
