// noroff api url
const apiUrl = import.meta.env.VITE_API_URL;
import type { VenuesPagination, Venue } from "../types/venues";

// get all venues
export const getVenues = async (
  page = 1,
  limit = 24,
): Promise<VenuesPagination> => {
  const url = new URL(apiUrl);
  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(limit));

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch venues: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

// get signle venues
export const getSingleVenues = async (id: string): Promise<Venue> => {
  const url = new URL(`${apiUrl}/${id}`);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch venue ${id}: ${response.status}`);
  }

  const data = await response.json();
  return data?.data ?? data;
};
