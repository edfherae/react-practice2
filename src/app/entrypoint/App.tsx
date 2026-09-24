import { Navigate, Route, Routes } from "react-router-dom";
import { Characters } from "../../pages/characters";
import Layout from "../layout/Layout";
import { Character } from "../../pages/character";
import { Favourites } from "../../pages/favourites/";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to={"/characters/page/1"} />} />
        <Route
          path="characters"
          element={<Navigate to={"/characters/page/1"} />}
        />
        <Route
          path="characters/page"
          element={<Navigate to={"/characters/page/1"} />}
        />
        <Route path="characters/page/:page" element={<Characters />} />
        <Route path="characters/favourites" element={<Favourites />} />
        <Route path="character/:id" element={<Character />} />
      </Route>
    </Routes>
  );
}
