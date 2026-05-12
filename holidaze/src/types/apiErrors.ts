export type ApiErrorEntry = {
  message?: string;
  code?: string;
  path?: unknown[];
};

export type ApiErrorBody = {
  errors?: ApiErrorEntry[];
  status?: string;
  statusCode?: number;
};

export async function messageFromFailedResponse(
  response: Response,
  fallback: string,
): Promise<string> {
  const text = await response.text();
  if (!text.trim()) {
    return fallback;
  }
  try {
    const body = JSON.parse(text) as ApiErrorBody;
    const messages = body.errors
      ?.map((e) => e.message)
      .filter((m): m is string => Boolean(m && m.trim()));
    if (messages?.length) {
      return messages.join(" ");
    }
  } catch {}
  return fallback;
}
