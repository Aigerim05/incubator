import { createContext, useState } from "react";
import type { ReactNode } from "react";

type ThemeContextType = {
  theme: 'light-theme' | 'dark-theme';
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {

  const [theme, setTheme] = useState<'light-theme' | 'dark-theme'>('light-theme');
  const toggleTheme = () => setTheme(theme === 'light-theme' ? 'dark-theme' : 'light-theme');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

