-- CreateTable
CREATE TABLE "NotificationList" (
    "id" SERIAL NOT NULL,
    "airmanId" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "messsage" TEXT NOT NULL,

    CONSTRAINT "NotificationList_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NotificationList" ADD CONSTRAINT "NotificationList_airmanId_fkey" FOREIGN KEY ("airmanId") REFERENCES "Airman"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
