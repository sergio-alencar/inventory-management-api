// inventory-management-ui/src/types/Theme.ts

export type Theme = "light" | "dark";

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
