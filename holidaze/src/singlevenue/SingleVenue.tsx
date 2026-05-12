import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleVenues } from "../api/venues";
import type { Venue } from "../types/venues";
import fallback_img from "../assets/fallback_img.png";
import { StarHalf, StarIcon } from "lucide-react";

const SingleVenue = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState<Venue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"info" | "book">("info");

  useEffect(() => {
    const loadVenue = async () => {
      if (!id) {
        setError("Missing venue id");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        const result = await getSingleVenues(id);
        setVenue(result);
      } catch {
        setError("Failed to load venue");
      } finally {
        setLoading(false);
      }
    };

    loadVenue();
  }, [id]);

  const renderStars = (rawRating: number) => {
    const ratingValue = Number.isFinite(rawRating) ? rawRating : 0;
    const fullStars = Math.floor(ratingValue);
    const hasHalfStar = ratingValue - fullStars >= 0.5;

    return (
      <span className="inline-flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => {
          const n = i + 1;
          const isFull = n <= fullStars;
          const isHalf = !isFull && hasHalfStar && n === fullStars + 1;

          if (isHalf) {
            return <StarHalf key={n} className="h-4 w-4 text-yellow-400" />;
          }

          return (
            <StarIcon
              key={n}
              className={`h-4 w-4 ${
                isFull ? "text-yellow-400 fill-yellow-400" : "text-slate-300"
              }`}
            />
          );
        })}
        <span className="ml-1 text-sm text-slate-600">{ratingValue}</span>
      </span>
    );
  };

  return (
    <section className="min-h-screen bg-white">
      <div className="flex flex-col items-center px-4 py-8 text-left text-slate-900">
        {loading && <p className="text-sm text-slate-600">Loading venue…</p>}
        {!loading && error && <p className="text-sm text-red-600">{error}</p>}
        {!loading && !error && venue && (
          <h3 className="px-5 text-xl font-bold md:text-5xl break-all">
            {venue.name || "No name provided"}
          </h3>
        )}
      </div>

      {!loading && !error && venue && (
        <div className="mx-auto w-full max-w-5xl px-4 pb-10">
          <img
            src={venue.media?.[0]?.url || fallback_img}
            alt={venue.media?.[0]?.alt || venue.name}
            className="h-[420px] w-full rounded-2xl object-cover"
            onError={(e) => {
              e.currentTarget.src = fallback_img;
            }}
          />
          <div className="mt-6 flex gap-2">
            <button
              type="button"
              onClick={() => setTab("info")}
              className={`rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer ${
                tab === "info"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              Info
            </button>

            <button
              type="button"
              onClick={() => setTab("book")}
              className={`rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer ${
                tab === "book"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              Book now
            </button>
          </div>

          {tab === "info" && (
            <div className="mt-4">
              <div className="flex flex-col items-start px-4 py-8 text-left text-slate-900">
                <p className="text-slate-700">{venue.description}</p>
                <p className="mt-3 text-sm text-slate-700">
                  {venue.price} kr/night
                </p>
                <p className="text-sm text-slate-700">
                  {venue.maxGuests} guests
                </p>

                <div className="mt-4 flex w-full flex-wrap items-center justify-between gap-3">
                  <p className="text-sm">
                    Ratings: {renderStars(venue.rating)}
                  </p>
                  <p className="text-xs text-slate-500">
                    Created: {new Date(venue.created).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-slate-500">
                    Updated: {new Date(venue.updated).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          )}

          {tab === "book" && (
            <div className="mt-4">
              <form>
                <div className="flex flex-col items-center px-4 py-8 text-left text-slate-900">
                  <label htmlFor="name" className="text-sm text-slate-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="text-sm text-slate-700"
                  />
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default SingleVenue;
