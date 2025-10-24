import { useState } from "react";
import Appheader from "../src/components/header";
import PageContent from "./components/pageContent";
import Sidebar from "../src/components/sidebar";
import { SidebarItem } from "../src/components/sidebar";
import {
  IoHomeSharp,
  IoAddCircleOutline,
  IoCalendar,
} from "react-icons/io5";
import { ImStatsBars } from "react-icons/im";
import { MdDelete } from "react-icons/md";

function App() {
  const [activeItem, setActiveItem] = useState("Início");

  return (
    <div className="flex flex-col w-screen h-screen">
      <Appheader />
      <Sidebar>
        <SidebarItem
          icon={<IoHomeSharp size={20} />}
          text="Início"
          alert
          active={activeItem === "Início"}
          onClick={() => setActiveItem("Início")}
        />
        <SidebarItem
          icon={<ImStatsBars size={20} />}
          text="Movimentações"
          active={activeItem === "Movimentações"}
          onClick={() => setActiveItem("Movimentações")}
        />
        <SidebarItem
          icon={<IoCalendar size={20} />}
          text="Reservar"
          active={activeItem === "Reservar"}
          onClick={() => setActiveItem("Reservar")}
        />
        <SidebarItem
          icon={<IoAddCircleOutline size={20} />}
          text="Cadastrar"
          active={activeItem === "Cadastrar"}
          onClick={() => setActiveItem("Cadastrar")}
        />
        <SidebarItem
          icon={<MdDelete size={20} />}
          text="Deletar"
          active={activeItem === "Deletar"}
          onClick={() => setActiveItem("Deletar")}
        />
        <hr className="my-3" />
      </Sidebar>
      <main>
        <PageContent />
      </main>
    </div>
  );
}

export default App;