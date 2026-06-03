/*
  Best-effort, in-memory rate limiter — zero dependencies, no external store.

  State lives in this module's `Map`, so it is per serverless instance: under
  horizontal scaling the limit is enforced independently per warm lambda, not
  globally. That makes it a soft cap, not a guarantee — the contact form's
  honeypot is the primary bot defense; this just blunts naive flooding of the
  endpoint from a single source.
*/

const hits = new Map<string, number[]>();

/**
 * Returns `true` if the call is within budget (and records it), `false` if the
 * key has already hit `limit` calls inside the trailing `windowMs`.
 */
export function rateLimit(key: string, limit = 5, windowMs = 600_000): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  return true;
}
