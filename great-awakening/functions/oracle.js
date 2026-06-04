/**
 * THE GREAT AWAKENING — Oracle API Proxy
 * Cloudflare Pages Function
 *
 * Handles all Anthropic API calls server-side so the API key
 * never appears in the browser. The key is stored as a
 * Cloudflare Pages environment variable named ANTHROPIC_API_KEY.
 *
 * Route: /oracle  (POST)
 */

export async function onRequestPost(context) {
  const { request, env } = context;

  // ── CORS headers ──────────────────────────────────────────────
  // Restrict to your own domain in production.
  // During initial testing you can set this to '*'.
  const corsHeaders = {
    "Access-Control-Allow-Origin": "https://awakening.coldalchemygames.com",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  // ── Pre-flight ─────────────────────────────────────────────────
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  // ── Validate API key is configured ────────────────────────────
  const apiKey = env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "ANTHROPIC_API_KEY environment variable is not set." }),
      { status: 500, headers: corsHeaders }
    );
  }

  // ── Parse incoming request body ───────────────────────────────
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid JSON in request body." }),
      { status: 400, headers: corsHeaders }
    );
  }

  // ── Validate required fields ──────────────────────────────────
  const { messages, max_tokens } = body;
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return new Response(
      JSON.stringify({ error: "Request must include a non-empty messages array." }),
      { status: 400, headers: corsHeaders }
    );
  }

  // ── Forward to Anthropic ──────────────────────────────────────
  let anthropicResponse;
  try {
    anthropicResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: max_tokens || 1000,
        messages,
      }),
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Failed to reach Anthropic API.", detail: err.message }),
      { status: 502, headers: corsHeaders }
    );
  }

  // ── Pass Anthropic's response back to the client ──────────────
  const data = await anthropicResponse.json();

  return new Response(JSON.stringify(data), {
    status: anthropicResponse.status,
    headers: corsHeaders,
  });
}

// Handle OPTIONS pre-flight at the function level too
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "https://awakening.coldalchemygames.com",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
