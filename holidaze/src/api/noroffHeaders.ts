const apiKey = import.meta.env.VITE_NOROFF_API_KEY;

function normalizeBearer(accessToken: string): string {
  const t = accessToken.trim();
  return t.toLowerCase().startsWith("bearer ") ? t.slice(7).trim() : t;
}

export function noroffHeaders(options?: {
  accessToken?: string;
  json?: boolean;
}): HeadersInit {
  const headers: Record<string, string> = {};

  const key = apiKey?.trim();
  if (key) {
    headers["X-Noroff-API-Key"] = key;
  }

  if (options?.accessToken?.trim()) {
    headers.Authorization = `Bearer ${normalizeBearer(options.accessToken)}`;
  }

  if (options?.json) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
}
