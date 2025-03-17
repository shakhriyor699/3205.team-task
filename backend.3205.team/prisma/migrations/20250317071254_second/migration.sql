-- CreateTable
CREATE TABLE "Click" (
    "id" TEXT NOT NULL,
    "shortUrl" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "clickedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Click_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Click" ADD CONSTRAINT "Click_shortUrl_fkey" FOREIGN KEY ("shortUrl") REFERENCES "Url"("shortUrl") ON DELETE CASCADE ON UPDATE CASCADE;
