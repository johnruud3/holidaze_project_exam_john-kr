import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getHolidazeProfile } from "../api/profiles";
import {
  clearStoredAccessToken,
  readStoredAccessToken,
  writeStoredAccessToken,
} from "./tokenStorage";
import {
  clearStoredProfileName,
  readStoredProfileName,
  writeStoredProfileName,
} from "./profileNameStorage";

type AuthContextValue = {
  isLoggedIn: boolean;
  isVenueManager: boolean;
  profileLoaded: boolean;
  signIn: (
    accessToken: string,
    isVenueManager: boolean,
    profileName: string,
  ) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    readStoredAccessToken(),
  );
  const [isVenueManager, setIsVenueManager] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(() => {
    const t = readStoredAccessToken()?.trim();
    const n = readStoredProfileName()?.trim();
    return !t || !n;
  });

  const signIn = useCallback(
    (accessToken: string, venueManager: boolean, profileName: string) => {
      writeStoredAccessToken(accessToken);
      writeStoredProfileName(profileName);
      setToken(accessToken);
      setIsVenueManager(venueManager);
      setProfileLoaded(true);
    },
    [],
  );

  const signOut = useCallback(() => {
    clearStoredAccessToken();
    clearStoredProfileName();
    setToken(null);
    setIsVenueManager(false);
    setProfileLoaded(true);
  }, []);

  useEffect(() => {
    const t = token?.trim();
    const n = readStoredProfileName()?.trim();
    if (!t || !n) {
      setProfileLoaded(true);
      return;
    }

    let cancelled = false;
    setProfileLoaded(false);
    (async () => {
      try {
        const profile = await getHolidazeProfile(n, t);
        if (!cancelled) {
          setIsVenueManager(Boolean(profile.data.venueManager));
        }
      } catch {
        if (!cancelled) {
          setIsVenueManager(false);
        }
      } finally {
        if (!cancelled) {
          setProfileLoaded(true);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token]);

  const value = useMemo(
    () => ({
      isLoggedIn: Boolean(token?.trim()),
      isVenueManager,
      profileLoaded,
      signIn,
      signOut,
    }),
    [token, isVenueManager, profileLoaded, signIn, signOut],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
