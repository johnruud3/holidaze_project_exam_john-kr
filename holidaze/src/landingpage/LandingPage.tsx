import introImage from "../assets/intro_image.jpg";
import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";
import { getVenues } from "../api/venues";
import fallback_img from "../assets/fallback_img.png";
import {
  Coffee,
  Dog,
  ParkingSquare,
  StarHalf,
  StarIcon,
  Wifi,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Venue, VenuesPagination } from "../types/venues";

const LandingPage = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [pagination, setPagination] = useState<VenuesPagination["meta"] | null>(
    null,
  );
  const [page, setPage] = useState(1);
  const [goToPage, setGoToPage] = useState("1");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const limit = 24;

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

  useEffect(() => {
    const loadVenues = async () => {
      try {
        setLoading(true);
        setError("");

        const result: VenuesPagination = await getVenues(page, limit);
        setVenues(Array.isArray(result?.data) ? result.data : []);
        setPagination(result?.meta ?? null);
      } catch (err) {
        setError("Failed to load venues");
      } finally {
        setLoading(false);
      }
    };

    loadVenues();
  }, [page]);

  const totalPages = pagination?.pageCount ?? 1;

  const getPageItems = () => {
    const current = page;
    const last = totalPages;

    if (last <= 7) return Array.from({ length: last }, (_, i) => i + 1);

    const items: Array<number | "..."> = [];
    const add = (v: number | "...") => {
      if (items[items.length - 1] === v) return;
      items.push(v);
    };

    add(1);

    const start = Math.max(2, current - 1);
    const end = Math.min(last - 1, current + 1);

    if (start > 2) add("...");
    for (let p = start; p <= end; p++) add(p);
    if (end < last - 1) add("...");

    add(last);
    return items;
  };

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
          {loading && (
            <p className="text-left text-sm text-slate-600">Loading venues…</p>
          )}
          {!loading && error && (
            <p className="text-left text-sm text-red-600">{error}</p>
          )}
          {venues.map((venue) => (
            <div
              key={venue.id}
              className="flex flex-col h-full rounded-lg bg-white shadow-lg cursor-pointer hover:shadow-xl transition-shadow transform hover:scale-101 "
            >
              <div className="relative">
                <img
                  src={venue.media?.[0]?.url || fallback_img}
                  alt={venue.media?.[0]?.alt || venue.name}
                  className="h-48 w-full rounded-t-lg object-cover"
                  onError={(e) => {
                    e.currentTarget.src = fallback_img;
                  }}
                />

                <div className="absolute left-3 top-3 flex items-center gap-2">
                  <div className="rounded-full bg-slate-900/45 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                    {venue.price} kr/night
                  </div>
                </div>

                <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-slate-900/35 px-2 py-1 backdrop-blur">
                  <span
                    className={`rounded-full p-1 ${
                      venue.meta?.wifi ? "text-white" : "text-white/35"
                    }`}
                    title={venue.meta?.wifi ? "WiFi" : "No WiFi"}
                  >
                    <Wifi className="h-4 w-4" />
                  </span>
                  <span
                    className={`rounded-full p-1 ${
                      venue.meta?.parking ? "text-white" : "text-white/35"
                    }`}
                    title={venue.meta?.parking ? "Parking" : "No parking"}
                  >
                    <ParkingSquare className="h-4 w-4" />
                  </span>
                  <span
                    className={`rounded-full p-1 ${
                      venue.meta?.breakfast ? "text-white" : "text-white/35"
                    }`}
                    title={venue.meta?.breakfast ? "Breakfast" : "No breakfast"}
                  >
                    <Coffee className="h-4 w-4" />
                  </span>
                  <span
                    className={`rounded-full p-1 ${
                      venue.meta?.pets ? "text-white" : "text-white/35"
                    }`}
                    title={venue.meta?.pets ? "Pets allowed" : "No pets"}
                  >
                    <Dog className="h-4 w-4" />
                  </span>
                </div>
              </div>

              <div className="flex flex-col flex-1 p-4 min-w-0">
                <h3 className="w-full truncate text-lg font-bold">
                  {venue.name || "No name provided"}
                </h3>
                <p className="pt-5 text-left text-md">Description:</p>
                <p className="text-left text-sm text-gray-500 overflow-hidden [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                  {venue.description || "No description provided"}
                </p>
                <div className="mt-auto">
                  <p className="w-full pt-5 text-left text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                    {venue.location.address || "No address provided"}{" "}
                    {venue.location.city} {venue.location.zip || ""}{" "}
                    {venue.location.country || ""}
                  </p>
                  <div className="flex flex-row items-start">
                    <p className="text-sm text-gray-500 text-left">
                      {venue.location.continent || "No continent provided"}
                    </p>
                  </div>
                </div>
                <div className="pt-5">
                  <p className="text-sm text-left">
                    Max Guests:{venue.maxGuests}
                  </p>
                </div>
                <div className="flex flex-row justify-between w-full pt-5 pb-5">
                  <p className="text-sm text-right">
                    Ratings: {renderStars(venue.rating)}
                  </p>
                </div>
                <div className="bg-slate-900 rounded-lg p-2">
                  <button
                    className="cursor-pointer text-white hover:scale-103"
                    onClick={() => navigate(`/singlevenue/${venue.id}`)}
                  >
                    Book Now!
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-8 flex max-w-5xl flex-col gap-4 px-2 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 disabled:opacity-50 cursor-pointer"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
            >
              ← Prev
            </button>

            <div className="flex items-center gap-1">
              {getPageItems().map((item, idx) =>
                item === "..." ? (
                  <span
                    key={`dots-${idx}`}
                    className="px-2 text-sm text-slate-500"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={item}
                    type="button"
                    className={`h-9 rounded-lg px-3 text-sm font-medium cursor-pointer ${
                      item === page
                        ? "bg-slate-900 text-white"
                        : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                    onClick={() => setPage(item)}
                  >
                    {item}
                  </button>
                ),
              )}
            </div>

            <button
              type="button"
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 disabled:opacity-50 cursor-pointer"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
            >
              Next →
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-600">
              Page <span className="font-semibold">{page}</span> of{" "}
              <span className="font-semibold">{totalPages}</span>
            </span>

            <form
              className="flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                const n = Number(goToPage);
                if (!Number.isFinite(n)) return;
                const next = Math.min(totalPages, Math.max(1, Math.trunc(n)));
                setPage(next);
                setGoToPage(String(next));
              }}
            >
              <input
                value={goToPage}
                onChange={(e) => setGoToPage(e.target.value)}
                className="h-9 w-20 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-slate-400"
                inputMode="numeric"
                placeholder="Page"
              />
              <button
                type="submit"
                className="h-9 rounded-lg bg-slate-900 px-3 text-sm font-semibold text-white hover:bg-slate-800 cursor-pointer"
              >
                Go
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
