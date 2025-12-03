import { ThemeProvider } from "@services/contexts/themeContext";
import AppRoutes from "./routes/routes";

export default function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  );
}
