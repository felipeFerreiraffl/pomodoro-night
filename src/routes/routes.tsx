import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Stats from "@/pages/Stats";
import { Route, Routes } from "react-router";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/stats" element={<Stats />} />
      </Route>
    </Routes>
  );
}
