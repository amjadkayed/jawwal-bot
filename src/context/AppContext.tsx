import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";
import { ThemeProvider, createTheme, Theme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

interface AppContextProps {
  currentChatId: string | undefined;
  setCurrentChatId: React.Dispatch<React.SetStateAction<string | undefined>>;
  theme: Theme;
  updateTheme: (primaryColor: string, secondaryColor: string) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentChatId, setCurrentChatId] = useState<string | undefined>(
    undefined
  );
  const [primaryColor, setPrimaryColor] = useState<string | undefined>(
    undefined
  );
  const [secondaryColor, setSecondaryColor] = useState<string | undefined>(
    undefined
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "light",
          primary: {
            main: primaryColor || "#020317",
          },
          secondary: {
            main: secondaryColor || "#b5d62e",
          },
        },
      }),
    [primaryColor, secondaryColor]
  );

  const updateTheme = (newPrimaryColor: string, newSecondaryColor: string) => {
    setPrimaryColor(newPrimaryColor);
    setSecondaryColor(newSecondaryColor);
  };

  return (
    <AppContext.Provider
      value={{ setCurrentChatId, currentChatId, theme, updateTheme }}
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
