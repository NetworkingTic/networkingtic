import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

export type Mode = "light" | "dark";
const STORAGE_KEY = "ntic-theme";

type ThemeModeValue = { mode: Mode; toggleMode: () => void };
const ThemeModeContext = createContext<ThemeModeValue | null>(null);

// El script de index.html ya puso data-theme antes de cargar React (evita parpadeo).
const getInitialMode = (): Mode =>
  document.documentElement.dataset.theme === "dark" ? "dark" : "light";

// Colores en un solo lugar; los mismos valores están como variables CSS en styles.css.
const palette = {
  light: { bg: "#F3F6F8", surface: "#FFFFFF", ink: "#0D2131", muted: "#506273", line: "#D6DFE6", brand: "#0077B6" },
  dark: { bg: "#08131D", surface: "#0F1F2C", ink: "#E4EDF4", muted: "#93A6B6", line: "#1F3445", brand: "#4DB4EE" },
};

export const ThemeModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<Mode>(getInitialMode);

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", palette[mode].bg);
  }, [mode]);

  const toggleMode = () => {
    setMode((m) => {
      const next = m === "light" ? "dark" : "light";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* sin acceso a localStorage */
      }
      return next;
    });
  };

  const muiTheme = useMemo(() => {
    const p = palette[mode];
    return createTheme({
      palette: {
        mode,
        primary: { main: p.brand, contrastText: mode === "dark" ? "#06121C" : "#FFFFFF" },
        background: { default: p.bg, paper: p.surface },
        text: { primary: p.ink, secondary: p.muted },
        divider: p.line,
      },
      shape: { borderRadius: 6 },
      typography: {
        fontFamily: '"IBM Plex Sans", system-ui, sans-serif',
        button: { textTransform: "none", fontWeight: 600 },
      },
    });
  }, [mode]);

  return (
    <ThemeModeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useThemeMode = () => {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) throw new Error("useThemeMode debe usarse dentro de ThemeModeProvider");
  return ctx;
};
