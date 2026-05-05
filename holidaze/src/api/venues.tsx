// noroff api url
const apiUrl = import.meta.env.VITE_API_URL;

// get all venues
export const getVenues = async () => {
  const response = await fetch(`${apiUrl}`);
  const data = await response.json();
  return data;
};
