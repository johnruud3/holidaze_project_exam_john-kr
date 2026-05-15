const KEY = "holidaze_profile_name";

export function readStoredProfileName(): string | null {
  return localStorage.getItem(KEY);
}

export function writeStoredProfileName(name: string): void {
  localStorage.setItem(KEY, name.trim());
}

export function clearStoredProfileName(): void {
  localStorage.removeItem(KEY);
}
