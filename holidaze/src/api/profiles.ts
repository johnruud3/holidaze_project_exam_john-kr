import type { HolidazeProfileResponse } from "../types/profile";
import { messageFromFailedResponse } from "../types/apiErrors";
import { noroffHeaders } from "./noroffHeaders";

const apiBase = import.meta.env.VITE_API_URL;

export async function getHolidazeProfile(
  profileName: string,
  accessToken: string,
): Promise<HolidazeProfileResponse> {
  const url = new URL(
    `/holidaze/profiles/${encodeURIComponent(profileName)}`,
    apiBase,
  );

  const response = await fetch(url, {
    headers: noroffHeaders({ accessToken }),
  });

  if (!response.ok) {
    const message = await messageFromFailedResponse(
      response,
      `Failed to load profile (${response.status}).`,
    );
    throw new Error(message);
  }

  return response.json();
}
