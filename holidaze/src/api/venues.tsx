// noroff api url
const apiUrl = import.meta.env.VITE_API_URL;

// get all venues
export const getVenues = async (page = 1, limit = 24) => {
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
