import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import PageContent from "./components/pageContent";
import Appheader from "../src/components/header";
import Sidebar, { SidebarItem } from "../src/components/sidebar";
import {
  IoHomeSharp,
  IoAddCircleOutline,
  IoCalendar,
} from "react-icons/io5";
import { ImStatsBars } from "react-icons/im";
import { MdDelete } from "react-icons/md";

function App() {
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
            alert
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
            text="Cadastrar"
            active={activeItem === "Cadastrar"}
            onClick={() => {
              setActiveItem("Cadastrar");
              navigate("/CadastrarItem");
            }}
          />
          <SidebarItem
            icon={<MdDelete size={20} />}
            text="Deletar"
            active={activeItem === "Deletar"}
            onClick={() => {
              setActiveItem("Deletar");
              navigate("/removeritem");
            }}
          />
          <hr className="my-3" />
        </Sidebar>
        <div className="flex-1 h-full overflow-auto p-4">
           <PageContent />
        </div>
      </div>
    </div>
  );
}

export default App;