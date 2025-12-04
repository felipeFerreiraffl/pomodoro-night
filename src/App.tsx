import { ThemeProvider } from "@services/contexts/themeContext";
import AppRoutes from "./routes/routes";
import { TimerProvider } from "./services/contexts/timerContext";

export default function App() {
  return (
    <ThemeProvider>
      <TimerProvider>
        <AppRoutes />
      </TimerProvider>
    </ThemeProvider>
  );
}
