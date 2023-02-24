-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_airmanId_fkey";

-- AlterTable
ALTER TABLE "Notification" ALTER COLUMN "airmanId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_airmanId_fkey" FOREIGN KEY ("airmanId") REFERENCES "Airman"("id") ON DELETE SET NULL ON UPDATE CASCADE;
