import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  clearStoredAccessToken,
  readStoredAccessToken,
  writeStoredAccessToken,
} from "./tokenStorage";

type AuthContextValue = {
  isLoggedIn: boolean;
  signIn: (accessToken: string) => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() =>
    readStoredAccessToken(),
  );

  const signIn = useCallback((accessToken: string) => {
    writeStoredAccessToken(accessToken);
    setToken(accessToken);
  }, []);

  const signOut = useCallback(() => {
    clearStoredAccessToken();
    setToken(null);
  }, []);

  const value = useMemo(
    () => ({
      isLoggedIn: Boolean(token?.trim()),
      signIn,
      signOut,
    }),
    [token, signIn, signOut],
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
