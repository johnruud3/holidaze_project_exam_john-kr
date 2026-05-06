import introImage from "../assets/intro_image.jpg";
import SearchBar from "../components/SearchBar";
import React, { useEffect, useState } from "react";
import { getVenues } from "../api/venues";
import fallback_img from "../assets/fallback_img.png";

type Venue = {
  id: string;
  name: string;
  media?: { url: string; alt?: string }[];
  description: string;
  price: number;
  maxGuests: number;
  rating: number;
  created: string;
  updated: string;
  meta: {
    wifi: boolean;
    parking: boolean;
    breakfast: boolean;
    pets: boolean;
  };
  location: {
    address: string;
    city: string;
    zip: string;
    country: string;
    continent: string;
    lat: number;
    lng: number;
  };
};

type VenuesPagination = {
  data: Venue[];
  meta: {
    isFirstPage: boolean;
    isLastPage: boolean;
    currentPage: number;
    previousPage: number | null;
    nextPage: number | null;
    pageCount: number;
    totalCount: number;
  };
};

const LandingPage = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const loadVenues = async () => {
      try {
        const result = await getVenues();
        setVenues(Array.isArray(result?.data) ? result.data : []);
      } catch (err) {
        setError("Failed to load venues");
      } finally {
        setLoading(false);
      }
    };

    loadVenues();
  }, []);
  if (loading) return <p>Loading venues...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-white">
      <div
        className="relative min-h-[420px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${introImage})` }}
      >
        <div className="absolute inset-0 bg-slate-950/45" />
        <div className="relative mx-auto flex min-h-[420px] w-full max-w-5xl items-center px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:items-start sm:max-w-2xl">
            <h1 className="text-4xl font-bold text-white md:text-5xl">
              Welcome to Holidaze
            </h1>
            <p className="mt-4 text-lg text-slate-100">
              Holidaze is a platform for finding and booking venues for your
              next adventure.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <SearchBar />
      </div>
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <hr className="my-10 border-t border-slate-300 " />
      </div>

      <section className="px-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {venues.map((venue) => (
            <div
              key={venue.id}
              className="rounded-lg bg-white shadow-lg cursor-pointer hover:shadow-xl transition-shadow transform hover:scale-101 "
            >
              <img
                src={venue.media?.[0]?.url || fallback_img}
                alt={venue.media?.[0]?.alt || venue.name}
                className="h-48 w-full rounded-t-lg object-cover"
                onError={(e) => {
                  e.currentTarget.src = fallback_img;
                }}
              />

              <div className="p-4">
                <h3 className="text-lg font-bold">{venue.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
