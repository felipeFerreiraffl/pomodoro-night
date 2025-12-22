import { ThemeProvider } from "@services/contexts/themeContext";
import AppRoutes from "./routes/routes";
import { TimerProvider } from "./services/contexts/timerContext";
import { TaskProvider } from "./services/contexts/taskContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// const isTouchDevice = "ontouchstart" in window;

export default function App() {
  return (
    <ThemeProvider>
      <DndProvider backend={HTML5Backend}>
        <TaskProvider>
          <TimerProvider>
            <AppRoutes />
          </TimerProvider>
        </TaskProvider>
      </DndProvider>
    </ThemeProvider>
  );
}
