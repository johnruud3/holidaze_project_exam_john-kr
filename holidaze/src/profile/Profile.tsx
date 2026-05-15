import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Profile() {
  const { isLoggedIn, isVenueManager, profileLoaded } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!profileLoaded) {
    return (
      <section className="min-h-screen bg-white px-4 py-16">
        <p className="text-sm text-slate-600">Loading your profile…</p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-white px-4 py-16">
      <div className="mx-auto max-w-xl">
        <h3 className="text-2xl font-bold text-slate-900 md:text-3xl">
          Profile
        </h3>
        <p className="mt-4 text-lg font-semibold text-slate-800">
          {isVenueManager
            ? "THIS IS VENUEMANAGER PROFILE"
            : "Ordinary user dashboard"}
        </p>
      </div>
    </section>
  );
}
