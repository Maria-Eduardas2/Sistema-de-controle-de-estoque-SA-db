
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Appheader from "./components/header";
import Sidebar, { SidebarItem } from "./components/sidebar";
import Estoque from "./pages/estoque";
import Movimentacoes from "./pages/Movimentacoes";
import Cadastrar from "./pages/CadastrarItem";
import Deletar from "./pages/removeritem";
import Reservar from "./pages/Reservar";
import Login from "./pages/Login";
import Manutencoes from "./pages/manutencoes";
import TabletPage from "./pages/TabletPage";
import {
  IoHomeSharp,
  IoAddCircleOutline,
  IoCalendar,
} from "react-icons/io5";
import { FaWrench } from "react-icons/fa6";
import { ImStatsBars } from "react-icons/im";
import { MdDelete } from "react-icons/md";

function LayoutPages() {
  const [activeItem, setActiveItem] = useState("Início");
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-screen h-screen">
      <Appheader />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar>
          <SidebarItem
            icon={<IoHomeSharp size={20} />}
            text="Início"
            active={activeItem === "Início"}
            onClick={() => {
              setActiveItem("Início");
              navigate("/Estoque");
            }}
          />
          <SidebarItem
            icon={<ImStatsBars size={20} />}
            text="Movimentações"
            active={activeItem === "Movimentações"}
            onClick={() => {
              setActiveItem("Movimentações");
              navigate("/Movimentacoes");
            }}
          />
          <SidebarItem
            icon={<FaWrench size={20} />}
            text="Manutenções"
            active={activeItem === "Manutenções"}
            onClick={() => {
              setActiveItem("Manutenções");
              navigate("/manutencoes");
            }}
          />
          <SidebarItem
            icon={<IoCalendar size={20} />}
            text="Reservar"
            active={activeItem === "Reservar"}
            onClick={() => {
              setActiveItem("Reservar");
              navigate("/Reservar");
            }}
          />
          <SidebarItem
            icon={<IoAddCircleOutline size={20} />}
            text="Registrar"
            active={activeItem === "Cadastrar"}
            onClick={() => {
              setActiveItem("Cadastrar");
              navigate("/CadastrarItem");
            }}
          />
          <SidebarItem
            icon={<MdDelete size={20} />}
            text="Remover"
            active={activeItem === "Deletar"}
            onClick={() => {
              setActiveItem("Deletar");
              navigate("/removeritem");
            }}
          />
        </Sidebar>

        <div className="pl-[12px] flex flex-col h-full w-full overflow-auto p-4">
          <Routes>
            <Route path="/Estoque" element={<Estoque />} />
            <Route path="/Movimentacoes" element={<Movimentacoes />} />
            <Route path="/manutencoes" element={<Manutencoes />} />
            <Route path="/CadastrarItem" element={<Cadastrar />} />
            <Route path="/removeritem" element={<Deletar />} />
            <Route path="/Reservar" element={<Reservar />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}



function App() {
  const location = useLocation();

  return location.pathname === "/TabletPage" ? (
    <TabletPage />
  ): location.pathname === "/Login" ? (
    <Login />
  ) : (
    <LayoutPages className="pl-[12px] flex flex-col h-full w-full" />
  );
}

export default App;