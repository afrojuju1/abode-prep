-- CreateTable
CREATE TABLE "AddressLookup" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "ownerName" TEXT,
    "mailingAddress" TEXT,
    "value2024" TEXT,
    "houseSqft" INTEGER,
    "lotSqft" INTEGER,
    "county" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AddressLookup_pkey" PRIMARY KEY ("id")
);
