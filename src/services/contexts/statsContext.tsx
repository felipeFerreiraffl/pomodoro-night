import type { StatsContextType } from "@/types/stats.types";
import { createContext, type ReactNode } from "react";

const StatsContext = createContext<StatsContextType | undefined>(undefined);

export const StatsProvider = ({ children }: { children: ReactNode }) => {};
