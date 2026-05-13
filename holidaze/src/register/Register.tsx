import { useState } from "react";
import type { SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { RegisterUserT } from "../types/user";
import { registerUserApi } from "../api/user";
import { useAuth } from "../auth/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [user, setUser] = useState<RegisterUserT>({
    name: "",
    email: "",
    password: "",
    bio: "",
    venueManager: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [tab, setTab] = useState<"user" | "manager">("user");

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const name = user.name.trim();
      if (!name) {
        setError("Name is required");
        return;
      }
      if (name.length > 20) {
        setError("Name must be at most 20 characters.");
        return;
      }
      if (!/^[a-zA-Z0-9_]+$/.test(name)) {
        setError(
          "Name may only use letters, numbers, and underscores (no spaces or punctuation).",
        );
        return;
      }
      if (!user.email.trim()) {
        setError("Email is required");
        return;
      }
      if (!user.password.trim()) {
        setError("Password is required");
        return;
      }
      if (user.password.length < 8) {
        setError("Password must be at least 8 characters");
        return;
      }

      const email = user.email.trim().toLowerCase();
      if (!email.endsWith("@stud.noroff.no")) {
        setError("Email must end with @stud.noroff.no");
        return;
      }

      await registerUserApi({ ...user, name, email });
      navigate("/login", { state: { registered: true } });
    } catch (error) {
      let message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";
      if (message.includes("Profile already exists")) {
        message +=
          " Your profile name must be unique for the whole Noroff API (not just your email). Pick a different name, max 20 characters, letters/numbers/underscore only.";
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return (
      <section className="min-h-screen bg-white">
        <div className="px-4 py-8">
          <h3 className="text-2xl font-bold text-slate-900 md:text-4xl">
            Register
          </h3>
        </div>
        <div className="mx-auto mt-4 w-full max-w-xl space-y-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
          <p className="text-sm text-slate-700" role="status">
            You are already signed in. Creating another account requires logging
            out first.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-white">
      <div className="px-4 py-8">
        <h3 className="text-2xl font-bold text-slate-900 md:text-4xl">
          Register
        </h3>
      </div>

      <div className="mt-2 flex justify-center gap-2 px-4">
        <button
          type="button"
          onClick={() => {
            setTab("user");
            setUser((u) => ({ ...u, venueManager: false }));
          }}
          className={`rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer ${
            tab === "user"
              ? "bg-slate-900 text-white"
              : "bg-slate-100 text-slate-700"
          }`}
        >
          As user
        </button>

        <button
          type="button"
          onClick={() => {
            setTab("manager");
            setUser((u) => ({ ...u, venueManager: true }));
          }}
          className={`rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer ${
            tab === "manager"
              ? "bg-slate-900 text-white"
              : "bg-slate-100 text-slate-700"
          }`}
        >
          As venue manager
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-6 w-full max-w-xl space-y-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6"
      >
        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        <div>
          <label className="text-sm font-medium text-slate-700" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
          />
        </div>

        <div>
          <label
            className="text-sm font-medium text-slate-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700" htmlFor="bio">
            Bio <span className="text-slate-400">(optional)</span>
          </label>
          <textarea
            id="bio"
            value={user.bio}
            onChange={(e) => setUser({ ...user, bio: e.target.value })}
            className="mt-1 min-h-24 w-full resize-y rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60 cursor-pointer"
        >
          {loading
            ? "Creating account…"
            : tab === "manager"
              ? "Register as venue manager"
              : "Register as user"}
        </button>
        <p className="mt-2 text-sm text-slate-600">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-slate-900 underline">
            Log in
          </Link>
        </p>
      </form>
    </section>
  );
}
