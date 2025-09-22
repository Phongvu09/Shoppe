import crypto from "crypto";

export function createResetToken(ttlMs = 10 * 60 * 1000) {
  const token = crypto.randomBytes(32).toString("hex");
  const hash = crypto.createHash("sha256").update(token).digest("hex");
  const expires = Date.now() + ttlMs;
  return { token, hash, expires };
}
