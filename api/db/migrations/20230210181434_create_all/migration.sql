-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMPTZ(3),
ADD COLUMN     "deletedBy" TEXT,
ADD COLUMN     "editedAt" TIMESTAMPTZ(3),
ADD COLUMN     "editedBy" TEXT;

-- AlterTable
ALTER TABLE "Training" ADD COLUMN     "createdAt" TIMESTAMPTZ(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "deletedAt" TIMESTAMPTZ(3),
ADD COLUMN     "deletedBy" TEXT,
ADD COLUMN     "editedAt" TIMESTAMPTZ(3),
ADD COLUMN     "editedBy" TEXT;
