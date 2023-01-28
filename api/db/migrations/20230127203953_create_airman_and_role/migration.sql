-- CreateTable
CREATE TABLE "Airman" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "firstName" TEXT,
    "middleName" TEXT,
    "lastName" TEXT,
    "organization" TEXT,
    "dodId" TEXT,
    "rank" TEXT,
    "officeSymbol" TEXT,
    "roles" TEXT,
    "resetToken" TEXT,
    "resetTokenExpiresAt" TIMESTAMP(3),
    "supervisorId" INTEGER[],
    "monitorId" INTEGER[],

    CONSTRAINT "Airman_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Airman_email_key" ON "Airman"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- AddForeignKey
ALTER TABLE "Airman" ADD CONSTRAINT "Airman_roles_fkey" FOREIGN KEY ("roles") REFERENCES "Role"("name") ON DELETE SET NULL ON UPDATE CASCADE;
