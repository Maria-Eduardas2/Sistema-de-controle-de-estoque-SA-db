import { BrowserRouter, Route, Routes } from "react-router-dom";
import Estoque from "../pages/Estoque";
import Movimentacoes from "../pages/Movimentacoes";
import Cadastrar  from "../pages/CadastrarItem";
import Deletar from "../pages/removeritem";
import Reservar from "../pages/Reservar";
import Manutencoes from "../pages/manutencoes";
import TabletPage from "../pages/TabletPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/Estoque" element={<Estoque />}></Route>
      <Route path="/Movimentacoes" element={<Movimentacoes />}></Route>
      <Route path="/manutencoes" element={<Manutencoes />}></Route>
      <Route path="/CadastrarItem" element={<Cadastrar />}></Route>
      <Route path="/removeritem" element={<Deletar />}></Route>
      <Route path="/Reservar" element={<Reservar />}></Route>
      <Route path="/TabletPage" element={<TabletPage />}></Route>
    </Routes>
  );
}
export default AppRoutes;