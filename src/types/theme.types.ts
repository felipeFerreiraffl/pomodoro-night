// Tipagem para tema
export type Theme = "default" | "cyberpunk" | "forest" | "desert";

// Interface para contexto de tema
export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
