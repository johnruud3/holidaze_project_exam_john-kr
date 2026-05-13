import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/holidaze_logo.png";
import { useAuth } from "../auth/AuthContext";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    navigate("/");
    setMobileOpen(false);
  };

  const desktopFirstButton = isLoggedIn ? (
    <Link
      to="/profile"
      className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700"
    >
      Profile
    </Link>
  ) : (
    <Link
      to="/login"
      className="rounded-xl px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
    >
      Login
    </Link>
  );

  const desktopSecondButton = isLoggedIn ? (
    <button
      type="button"
      onClick={handleSignOut}
      className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-50 cursor-pointer"
    >
      Log out
    </button>
  ) : (
    <Link
      to="/register"
      className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700"
    >
      Join now
    </Link>
  );

  const mobileFirstButton = isLoggedIn ? (
    <Link
      to="/profile"
      className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white"
      onClick={() => setMobileOpen(false)}
    >
      Profile
    </Link>
  ) : (
    <Link
      to="/login"
      className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
      onClick={() => setMobileOpen(false)}
    >
      Login
    </Link>
  );

  const mobileSecondButton = isLoggedIn ? (
    <button
      type="button"
      onClick={handleSignOut}
      className="rounded-lg border border-slate-300 px-3 py-2 text-left text-sm font-medium text-slate-800 hover:bg-slate-50"
    >
      Log out
    </button>
  ) : (
    <Link
      to="/register"
      className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white"
      onClick={() => setMobileOpen(false)}
    >
      Join now
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <div>
              <img className="h-16 w-16" src={logo} alt="Holidaze logo" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium tracking-wide text-slate-500">
                HOLIDAZE
              </span>
              <span className="text-base font-semibold text-slate-900">
                Stay inspired
              </span>
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
          >
            Home
          </Link>
          <Link
            to="/venues"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
          >
            Venues
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
          >
            About
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {desktopFirstButton}
          {desktopSecondButton}
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl p-2 text-slate-700 md:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label="Toggle navigation menu"
        >
          <span className="text-2xl leading-none">
            {mobileOpen ? "x" : "="}
          </span>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            <Link
              to="/"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/venues"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              onClick={() => setMobileOpen(false)}
            >
              Venues
            </Link>
            <Link
              to="/about"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              onClick={() => setMobileOpen(false)}
            >
              About
            </Link>
            <div className="my-1 h-px bg-slate-200" />
            {mobileFirstButton}
            {mobileSecondButton}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
