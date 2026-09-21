import { Route, Routes } from "react-router-dom";
import { Characters } from "../../pages/characters";
import Layout from "../layout/Layout";
// import { Character } from "../../pages/character";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index path="characters" element={<Characters />} />
        {/* <Route path="character/:id" element={<Character />}/> */}
      </Route>
    </Routes>
  );
}
