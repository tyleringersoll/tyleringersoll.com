import type { Context } from "@netlify/edge-functions";

const EU_UK = new Set([
  "AT","BE","BG","HR","CY","CZ","DK","EE","FI","FR","DE","GR","HU","IE",
  "IT","LV","LT","LU","MT","NL","PL","PT","RO","SK","SI","ES","SE",
  "IS","LI","NO","GB",
]);

export default async function handler(request: Request, context: Context) {
  const response = await context.next();
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("text/html")) return response;

  const code = context.geo?.country?.code?.toUpperCase() ?? "";
  const script = `<script>window.VISITOR_REQUIRES_CONSENT=${EU_UK.has(code)};</script>`;

  const html = await response.text();
  const patched = html.replace(/(<head[^>]*>)/i, `$1${script}`);

  return new Response(patched, {
    status: response.status,
    headers: response.headers,
  });
}
