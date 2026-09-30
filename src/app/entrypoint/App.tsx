import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "../layout/Layout";
import { Characters } from "../../pages/characters";
import { Character } from "../../pages/character";
import { Favourites } from "../../pages/favourites/";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to={"/characters/"} />} />
        <Route path="/characters/" element={<Characters />} />
        <Route path="characters/favourites" element={<Favourites />} />
        <Route path="character/:id" element={<Character />} />
      </Route>
    </Routes>
  );
}
