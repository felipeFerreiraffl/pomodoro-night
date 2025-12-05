import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import { Route, Routes } from "react-router";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}
