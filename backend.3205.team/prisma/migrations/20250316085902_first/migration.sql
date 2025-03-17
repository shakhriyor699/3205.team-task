-- CreateTable
CREATE TABLE "Url" (
    "id" TEXT NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "shortUrl" TEXT NOT NULL,
    "alias" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "clickCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Url_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Url_shortUrl_key" ON "Url"("shortUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Url_alias_key" ON "Url"("alias");
