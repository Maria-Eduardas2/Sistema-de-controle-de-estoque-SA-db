import { Button } from "antd";

function ProfileModal({ visible, onClose }) {
  if (!visible) return null;

  return (
    <div className="fixed top-4 right-4 w-[250px] h-[250px] bg-white shadow-lg rounded-none border border-gray-300 z-50 p-4 flex flex-col justify-between">
      <div>
        <h3 className="text-[#345DBD] font-bold text-lg mb-2">Perfil do Usuário</h3>
        <p className="text-sm text-gray-700">Nome: Maria</p>
        <p className="text-sm text-gray-700">Email: maria@email.com</p>
        <p className="text-sm text-gray-700">Função: Administradora</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <Button
          className="bg-[#6EBBCE] text-white rounded-none hover:bg-[#58AAB9]"
          onClick={() => alert("Você saiu da conta")}
        >
          Sair
        </Button>
        <Button
          className="text-[#345DBD] border-none hover:text-red-500"
          onClick={onClose}
        >
          Fechar
        </Button>
      </div>
    </div>
  );
}

export default ProfileModal;