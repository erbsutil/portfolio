/**
 * Optional bearer auth + sliding-window rate limit for the remote MCP endpoint.
 * Env:
 *   MCP_API_KEY — if set, require `Authorization: Bearer <key>`
 *   MCP_RATE_LIMIT — max requests per window per IP (default 60)
 *   MCP_RATE_WINDOW_MS — window length (default 60000)
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

function clientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): { ok: true } | { ok: false; retryAfter: number } {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || now >= bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }
  if (bucket.count >= limit) {
    return { ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }
  bucket.count += 1;
  return { ok: true };
}

/** Opportunistic cleanup so the Map does not grow forever on a warm isolate. */
function pruneBuckets() {
  const now = Date.now();
  if (buckets.size < 500) return;
  for (const [k, v] of buckets) {
    if (now >= v.resetAt) buckets.delete(k);
  }
}

function envString(key: string): string | undefined {
  const value = (import.meta.env as Record<string, string | undefined>)[key];
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

export function guardMcpRequest(request: Request): Response | null {
  const apiKey = envString("MCP_API_KEY");
  if (apiKey) {
    const auth = request.headers.get("authorization") || "";
    const match = /^Bearer\s+(.+)$/i.exec(auth);
    if (!match || match[1] !== apiKey) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
          "WWW-Authenticate": 'Bearer realm="erbsu-mcp"',
        },
      });
    }
  }

  const limit = Number(envString("MCP_RATE_LIMIT") ?? 60);
  const windowMs = Number(envString("MCP_RATE_WINDOW_MS") ?? 60_000);
  const ip = clientIp(request);
  pruneBuckets();
  const result = rateLimit(`mcp:${ip}`, Number.isFinite(limit) ? limit : 60, Number.isFinite(windowMs) ? windowMs : 60_000);
  if (!result.ok) {
    return new Response(JSON.stringify({ error: "Too many requests" }), {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "Retry-After": String(result.retryAfter),
      },
    });
  }

  return null;
}
