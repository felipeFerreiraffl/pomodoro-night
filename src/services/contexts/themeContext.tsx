import type { Theme, ThemeContextType } from "@/types/theme.types";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

// Impede erro de ES Lint de hook dentro de contexto
/* eslint-disable react-refresh/only-export-components */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Usa o tema definido anteriormente ou o padrão
    const savedTheme = localStorage.getItem("theme") || "default";

    if (
      savedTheme === "cyberpunk" ||
      savedTheme === "forest" ||
      savedTheme === "desert"
    ) {
      return savedTheme as Theme;
    }

    return "default";
  });

  // Salva o tema e cria o atributo do CSS (data-theme)
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme);
  };

  console.log(`Tema da aplicação: ${theme}`);

  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// Hook personalizado para tema
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme deve ser utilizado dentro de ThemeProvider");
  }

  return context;
};
