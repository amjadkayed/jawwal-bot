import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
  useEffect,
} from "react";
import { ThemeProvider, createTheme, Theme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useMediaQuery } from "@mui/material";

interface AppContextProps {
  currentChatId: string | undefined;
  setCurrentChatId: React.Dispatch<React.SetStateAction<string | undefined>>;
  theme: Theme;
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: light)");

  const [currentChatId, setCurrentChatId] = useState<string | undefined>(
    undefined
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isLightMode, setIsLightMode] = useState<boolean>(prefersDarkMode);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty(
      "--background-image",
      isLightMode
        ? 'url("/public/svgs/lightModeBg.svg")'
        : 'url("/public/svgs/darkModeBg.svg")'
    );
  }, [isLightMode]);

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: isLightMode ? "light" : "dark",
        background: {
          default: isLightMode ? "#f5f5f5f5" : "#222222",
          paper: isLightMode ? "#ffffff" : "#222222",
        },
        primary: {
          main: isLightMode ? "#ffffff" : "#222222",
          dark: isLightMode ? "#000" : "#fff",
          light: isLightMode ? "#f5f5f5f5" : "#020317",
        },
        secondary: {
          main: isLightMode ? "#b5d62e" : "#020317",
        },
      },
    });
  }, [isLightMode]);

  const toggleTheme = () => setIsLightMode(!isLightMode);

  return (
    <AppContext.Provider
      value={{
        setCurrentChatId,
        currentChatId,
        theme,
        isDrawerOpen,
        setIsDrawerOpen,
        toggleTheme,
        isDarkMode: !isLightMode,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
