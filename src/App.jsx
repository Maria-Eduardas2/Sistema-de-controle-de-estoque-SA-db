<<<<<<< HEAD

import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Appheader from "./components/header";
import Sidebar, { SidebarItem } from "./components/sidebar";
import Estoque from "./pages/Estoque";
import Movimentacoes from "./pages/Movimentacoes";
import Cadastrar from "./pages/CadastrarItem";
import Deletar from "./pages/removeritem";
import Reservar from "./pages/Reservar";
import Login from "./pages/Login";
import Manutencoes from "./pages/manutencoes";
import TabletPage from "./pages/TabletPage";
=======
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom"; 
import PageContent from "./components/pageContent";
import Appheader from "../src/components/header";
import Sidebar, { SidebarItem } from "../src/components/sidebar";
>>>>>>> 83757ab01048e3fe68caadca1e4dfb24dadf343d
import {
  IoHomeSharp,
  IoAddCircleOutline,
  IoCalendar,
} from "react-icons/io5";
import { FaWrench } from "react-icons/fa6";
import { ImStatsBars } from "react-icons/im";
import { MdDelete } from "react-icons/md";

<<<<<<< HEAD
function LayoutPages() {
  const [activeItem, setActiveItem] = useState("Início");
  const navigate = useNavigate();
=======
function App() {
  const [activeItem, setActiveItem] = useState("Início");
  const navigate = useNavigate(); 
>>>>>>> 83757ab01048e3fe68caadca1e4dfb24dadf343d

  return (
    <div className="flex flex-col w-screen h-screen">
      <Appheader />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar>
          <SidebarItem
            icon={<IoHomeSharp size={20} />}
            text="Início"
<<<<<<< HEAD
            active={activeItem === "Início"}
            onClick={() => {
              setActiveItem("Início");
              navigate("/Estoque");
=======
            alert
            active={activeItem === "Início"}
            onClick={() => {
              setActiveItem("Início");
              navigate("/Estoque"); 
>>>>>>> 83757ab01048e3fe68caadca1e4dfb24dadf343d
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
<<<<<<< HEAD
              navigate("/manutencoes");
=======
              navigate("/manutencoes"); 
>>>>>>> 83757ab01048e3fe68caadca1e4dfb24dadf343d
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
<<<<<<< HEAD
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
=======
          <hr className="my-3" />
        </Sidebar>
        <div className="flex-1 h-full overflow-auto p-4">
           <PageContent />
>>>>>>> 83757ab01048e3fe68caadca1e4dfb24dadf343d
        </div>
      </div>
    </div>
  );
}

<<<<<<< HEAD


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

=======
>>>>>>> 83757ab01048e3fe68caadca1e4dfb24dadf343d
export default App;