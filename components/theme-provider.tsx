"use client";

import { Airplay, Moon, Sun } from "lucide-react";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ComponentProps,
  type PropsWithChildren,
} from "react";
import { cn } from "@/lib/cn";

type Theme = "light" | "dark" | "system";
type ResolvedTheme = Exclude<Theme, "system">;
type ThemeSwitchMode = "light-dark" | "light-dark-system";

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
};

export type ThemeSwitchProps = ComponentProps<"div"> & {
  mode?: ThemeSwitchMode;
};

const storageKey = "theme";
const systemThemeMedia = "(prefers-color-scheme: dark)";
const ThemeContext = createContext<ThemeContextValue | null>(null);
const themeOptions = [
  { key: "light" as const, Icon: Sun },
  { key: "dark" as const, Icon: Moon },
  { key: "system" as const, Icon: Airplay },
];

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia(systemThemeMedia).matches ? "dark" : "light";
}

function getStoredTheme(): Theme {
  const value = window.localStorage.getItem(storageKey);

  return value === "light" || value === "dark" || value === "system"
    ? value
    : "system";
}

function applyTheme(theme: Theme): ResolvedTheme {
  const resolvedTheme = theme === "system" ? getSystemTheme() : theme;
  const root = document.documentElement;

  root.classList.toggle("dark", resolvedTheme === "dark");
  root.style.colorScheme = resolvedTheme;

  return resolvedTheme;
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "system";
  }

  return getStoredTheme();
}

function getInitialResolvedTheme(): ResolvedTheme {
  if (typeof document === "undefined") {
    return "light";
  }

  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export default function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setThemeState] = useState<Theme>(() => getInitialTheme());
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() =>
    getInitialResolvedTheme(),
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const nextTheme = getStoredTheme();
    setThemeState(nextTheme);
    setResolvedTheme(applyTheme(nextTheme));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    setResolvedTheme(applyTheme(theme));

    if (theme !== "system") {
      return;
    }

    const mediaQuery = window.matchMedia(systemThemeMedia);
    const handleChange = () => {
      setResolvedTheme(applyTheme("system"));
    };

    mediaQuery.addEventListener?.("change", handleChange);
    mediaQuery.addListener?.(handleChange);

    return () => {
      mediaQuery.removeEventListener?.("change", handleChange);
      mediaQuery.removeListener?.(handleChange);
    };
  }, [theme]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key && event.key !== storageKey) {
        return;
      }

      setThemeState(getStoredTheme());
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const setTheme = (nextTheme: Theme) => {
    setThemeState(nextTheme);

    try {
      window.localStorage.setItem(storageKey, nextTheme);
    } catch {
      // Ignore storage failures so theme toggling still works for this session.
    }
  };

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
    }),
    [resolvedTheme, theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const value = useContext(ThemeContext);

  if (!value) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return value;
}

function itemClassName(active: boolean) {
  return cn(
    "size-6.5 rounded-full p-1.5 transition-colors",
    active
      ? "bg-fd-accent text-fd-accent-foreground"
      : "text-fd-muted-foreground",
  );
}

export function ThemeSwitch({ className, mode = "light-dark", ...props }: ThemeSwitchProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const containerClassName = cn(
    "inline-flex items-center overflow-hidden rounded-full border p-1",
    className,
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mode === "light-dark") {
    const lightActive = mounted && resolvedTheme === "light";
    const darkActive = mounted && resolvedTheme === "dark";

    return (
      <button
        type="button"
        aria-label="Toggle Theme"
        className={containerClassName}
        onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
        data-theme-toggle=""
      >
        <Sun fill="currentColor" className={itemClassName(lightActive)} />
        <Moon fill="currentColor" className={itemClassName(darkActive)} />
      </button>
    );
  }

  return (
    <div className={containerClassName} data-theme-toggle="" {...props}>
      {themeOptions.map(({ key, Icon }) => {
        const active = mounted && theme === key;

        return (
          <button
            key={key}
            type="button"
            aria-label={key}
            className={itemClassName(active)}
            onClick={() => setTheme(key as Theme)}
          >
            <Icon className="size-full" fill="currentColor" />
          </button>
        );
      })}
    </div>
  );
}