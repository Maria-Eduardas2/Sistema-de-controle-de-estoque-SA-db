import { BrowserRouter, Route, Routes } from "react-router-dom";
import Estoque from "../pages/Estoque";
import Movimentacoes from "../pages/Movimentacoes";
import Cadastrar  from "../pages/CadastrarItem";
import Deletar from "../pages/removeritem";
import Reservar from "../pages/Reservar";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/Estoque" element={<Estoque />}></Route>
      <Route path="/Movimentacoes" element={<Movimentacoes />}></Route>
      <Route path="/CadastrarItem" element={<Cadastrar />}></Route>
      <Route path="/removeritem" element={<Deletar />}></Route>
      <Route path="/Reservar" element={<Reservar />}></Route>
    </Routes>
  );
}
export default AppRoutes;