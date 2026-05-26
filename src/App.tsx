import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HomeV2 from "./pages/HomeV2";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/v2" element={<HomeV2 />} />
    </Routes>
  );
}
