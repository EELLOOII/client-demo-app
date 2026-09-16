"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
} from "react";

export const ADMIN_THEMES = ["blue", "emerald", "violet"] as const;
export type AdminTheme = (typeof ADMIN_THEMES)[number];

const STORAGE_KEY = "demo-admin-theme";

interface AdminThemeContextValue {
  theme: AdminTheme;
  setTheme: (theme: AdminTheme) => void;
}

const AdminThemeContext = createContext<AdminThemeContextValue | null>(null);

function isAdminTheme(value: string | null): value is AdminTheme {
  return value !== null && ADMIN_THEMES.includes(value as AdminTheme);
}

function getStoredTheme(): AdminTheme {
  if (typeof window === "undefined") return "blue";
  const storedTheme = window.localStorage.getItem(STORAGE_KEY);
  return isAdminTheme(storedTheme) ? storedTheme : "blue";
}

function subscribeToTheme(callback: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) callback();
  };
  window.addEventListener("storage", handleStorage);
  window.addEventListener("demo-admin-theme-change", callback);
  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener("demo-admin-theme-change", callback);
  };
}

function getServerTheme() {
  return "blue" as const;
}

export function AdminThemeProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getStoredTheme,
    getServerTheme,
  );
  const setTheme = useCallback((nextTheme: AdminTheme) => {
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
    window.dispatchEvent(new Event("demo-admin-theme-change"));
  }, []);

  return (
    <AdminThemeContext.Provider value={{ setTheme, theme }}>
      <div className="contents" data-admin-theme={theme}>
        {children}
      </div>
    </AdminThemeContext.Provider>
  );
}

export function useAdminTheme() {
  const context = useContext(AdminThemeContext);
  if (!context) {
    throw new Error("useAdminTheme must be used within AdminThemeProvider");
  }
  return context;
}
