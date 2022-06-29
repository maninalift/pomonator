-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Authentication" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires" DATETIME NOT NULL DEFAULT (datetime('now','+1 day')),
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Authentication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Authentication" ("createdAt", "expires", "id", "userId") SELECT "createdAt", "expires", "id", "userId" FROM "Authentication";
DROP TABLE "Authentication";
ALTER TABLE "new_Authentication" RENAME TO "Authentication";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
