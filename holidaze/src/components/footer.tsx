import { Link } from "react-router-dom";
import logo from "../assets/holidaze_logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-slate-950 text-slate-200">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-12 md:items-start">
          <div className="flex flex-row items-center md:col-span-5">
            <Link to="/" className="inline-flex items-center gap-3">
              <img src={logo} alt="Holidaze logo" className="h-10 w-10" />
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold tracking-wide text-white">
                  Holidaze
                </span>
                <span className="text-sm text-slate-400">Stay inspired</span>
              </div>
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 md:col-span-7 md:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-white">Explore</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <Link
                    to="/venues"
                    className="text-slate-300 hover:text-white"
                  >
                    Venues
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-slate-300 hover:text-white">
                    About
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white">Account</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <Link to="/login" className="text-slate-300 hover:text-white">
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="text-slate-300 hover:text-white"
                  >
                    Register
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white">Contact</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                <li>
                  <Link to="/contact" className="hover:text-white">
                    contact us here!
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Holidaze. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <Link to="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-white">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
