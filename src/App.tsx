import { ThemeProvider } from "@services/contexts/themeContext";
import AppRoutes from "./routes/routes";
import { TimerProvider } from "./services/contexts/timerContext";
import { TaskProvider } from "./services/contexts/taskContext";

export default function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <TimerProvider>
          <AppRoutes />
        </TimerProvider>
      </TaskProvider>
    </ThemeProvider>
  );
}
