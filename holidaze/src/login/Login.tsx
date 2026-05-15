import { useState } from "react";
import type { SyntheticEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { getHolidazeProfile } from "../api/profiles";
import { loginUserApi } from "../api/user";

type LoginLocationState = { registered?: boolean };

export default function Login() {
  const { signIn, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const fromRegister = Boolean(
    (location.state as LoginLocationState | null)?.registered,
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (isLoggedIn) {
    return (
      <section className="min-h-screen bg-white">
        <div className="px-4 py-8">
          <h3 className="text-2xl font-bold text-slate-900 md:text-4xl">
            Log in
          </h3>
        </div>
        <div className="mx-auto mt-4 w-full max-w-xl space-y-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
          <p className="text-sm text-slate-700" role="status">
            You are already signed in. You cannot sign in again until you log
            out.
          </p>
        </div>
      </section>
    );
  }

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!email.trim()) {
        setError("Email is required");
        return;
      }
      if (!password.trim()) {
        setError("Password is required");
        return;
      }

      const normalizedEmail = email.trim().toLowerCase();
      if (!normalizedEmail.endsWith("@stud.noroff.no")) {
        setError("Email must end with @stud.noroff.no");
        return;
      }

      const response = await loginUserApi({
        email: normalizedEmail,
        password,
      });

      const token = response.data.accessToken;
      if (!token) {
        setError("No access token received. Try again.");
        return;
      }

      const profileName = response.data.name?.trim() ?? "";
      const profile = await getHolidazeProfile(profileName, token);
      const isVenueManager = Boolean(profile.data.venueManager);

      signIn(token, isVenueManager, profileName);
      navigate("/");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Login failed. Check your details.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-white">
      <div className="px-4 py-8">
        <h3 className="text-2xl font-bold text-slate-900 md:text-4xl">
          Log in
        </h3>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-4 w-full max-w-xl space-y-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6"
      >
        {fromRegister && (
          <p
            role="status"
            className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-900 ring-1 ring-emerald-200"
          >
            Registration successful. Sign in with the email and password you
            just created.
          </p>
        )}
        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        <div>
          <label
            className="text-sm font-medium text-slate-700"
            htmlFor="login-email"
          >
            Email
          </label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
          />
        </div>

        <div>
          <label
            className="text-sm font-medium text-slate-700"
            htmlFor="login-password"
          >
            Password
          </label>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Log in"}
        </button>
        <p className="mt-2 text-sm text-slate-600">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="font-medium text-slate-900 underline">
            Register
          </Link>
        </p>
      </form>
    </section>
  );
}
