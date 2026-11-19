export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export function getApiBaseUrl(): string | null {
  const value = process.env.NEXT_PUBLIC_API_BASE_URL?.trim() ?? "";
  if (!value) return null;
  return value.replace(/\/$/, "");
}

export function isAspNetProviderEnabled(): boolean {
  return process.env.DATA_PROVIDER === "aspnet" && getApiBaseUrl() !== null;
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const base = getApiBaseUrl();
  if (!base) {
    throw new ApiError("API base URL is not configured.", 500);
  }

  const headers = new Headers(init?.headers);
  if (!headers.has("Accept")) headers.set("Accept", "application/json");
  if (init?.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${base}${path.startsWith("/") ? path : `/${path}`}`, {
    ...init,
    headers,
  });

  if (!response.ok) {
    throw new ApiError(`API request failed with status ${response.status}.`, response.status);
  }

  return (await response.json()) as T;
}
