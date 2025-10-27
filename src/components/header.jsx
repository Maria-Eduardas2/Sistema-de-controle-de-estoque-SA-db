import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import ProfileModal from "./ProfileModal"; 

function Appheader() {
  const [modalAberto, setModalAberto] = useState(false);

  return (
    <>
      <div className="h-[50px] flex justify-between items-center p-1 border-b border-black/15 bg-[#345DBD]">
        <h1 className="text-[#FFFDF4] italic font-newake text-[2em]">SENAI</h1>

        <div className="flex items-center gap-4 mr-4 text-[#FFFDF4]">
          <h2 className="text-[1.2em] font-titillium font-bold">Bem vindo, Nome</h2>
          <FaRegUserCircle
            className="text-[2em] cursor-pointer hover:text-[#6EBBCE] transition-colors"
            onClick={() => setModalAberto(true)}
          />
        </div>
      </div>

      <ProfileModal visible={modalAberto} onClose={() => setModalAberto(false)} />
    </>
  );
}

export default Appheader;