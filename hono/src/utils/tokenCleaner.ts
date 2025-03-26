// Tambahkan ini di file baru src/utils/tokenCleaner.ts
import { db } from "../db";
import { blacklistedTokens } from "../db/schema";
import { lt } from "drizzle-orm";

export async function cleanExpiredTokens() {
  try {
    const now = new Date();
    await db
      .delete(blacklistedTokens)
      .where(lt(blacklistedTokens.expiresAt, now));
    console.log("Expired tokens cleaned successfully");
  } catch (error) {
    console.error("Error cleaning expired tokens:", error);
  }
}
