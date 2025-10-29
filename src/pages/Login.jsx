import { Typography, Form, Input, Button, message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import fflogo from "../assets/fflogo.png";

const Login = () => {
  const [modo, setModo] = useState("login");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_BASE = "http://localhost:3001/api";

  const onFinishLogin = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/instrutores/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro no login');
      }

      message.success(data.message);
      
      // Salvar usuário no localStorage
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', 'authenticated');
      
      // Redirecionar para a página principal
      navigate('/estoque');
      
    } catch (error) {
      console.error("Erro no login:", error);
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onFinishCadastro = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/instrutores/cadastro`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro no cadastro');
      }

      message.success(data.message);
      setModo("login");
      
      setTimeout(() => {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => form.reset());
      }, 100);
      
    } catch (error) {
      console.error("Erro no cadastro:", error);
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#345DBD] flex flex-col items-center justify-center p-6">
      <Typography.Title 
        level={1} 
        style={{ 
          color: "white", 
          fontWeight: "bold", 
          fontFamily: "Newake", 
          fontStyle: "italic",
          marginBottom: '20px'
        }}
      >
        SENAI
      </Typography.Title>

      <div className="flex mb-6 space-x-4">
        <Button
          type={modo === "login" ? "primary" : "default"}
          className={`rounded-none ${
            modo === "login" 
              ? "bg-[#6EBBCE] text-white border-[#6EBBCE]" 
              : "bg-white text-[#345DBD] border-white"
          } hover:opacity-90`}
          onClick={() => setModo("login")}
          disabled={loading}
        >
          Login
        </Button>
        <Button
          type={modo === "cadastro" ? "primary" : "default"}
          className={`rounded-none ${
            modo === "cadastro" 
              ? "bg-[#6EBBCE] text-white border-[#6EBBCE]" 
              : "bg-white text-[#345DBD] border-white"
          } hover:opacity-90`}
          onClick={() => setModo("cadastro")}
          disabled={loading}
        >
          Cadastro
        </Button>
      </div>

      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg overflow-hidden">
        <div
          className={`flex transition-transform duration-500 ease-in-out ${
            modo === "login" ? "translate-x-0" : "-translate-x-1/2"
          }`}
          style={{ width: "200%" }}
        >
          <div className="w-1/2 pr-4">
            <Form 
              layout="vertical" 
              onFinish={onFinishLogin}
              disabled={loading}
            >
              <Form.Item
                label={<span className="text-[#345DBD] font-bold font-titillium">RA do Instrutor</span>}
                name="ra"
                rules={[{ required: true, message: "Campo obrigatório" }]}
              >
                <Input 
                  className="rounded-none border-gray-300 focus:border-[#345DBD]"
                  placeholder="Digite seu RA"
                  disabled={loading}
                />
              </Form.Item>
              <Form.Item
                label={<span className="text-[#345DBD] font-bold font-titillium">Senha</span>}
                name="senha"
                rules={[{ required: true, message: "Campo obrigatório" }]}
              >
                <Input.Password 
                  className="rounded-none border-gray-300 focus:border-[#345DBD]"
                  placeholder="Digite sua senha"
                  disabled={loading}
                />
              </Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                className="bg-[#6EBBCE] text-white w-full rounded-none hover:bg-[#58AAB9] h-10 font-bold"
                loading={loading}
              >
                Entrar
              </Button>
            </Form>
          </div>

          <div className="w-1/2 pl-4">
            <Form 
              layout="vertical" 
              onFinish={onFinishCadastro}
              disabled={loading}
            >
              <Form.Item
                label={<span className="text-[#345DBD] font-bold font-titillium">RA do Instrutor</span>}
                name="ra"
                rules={[{ required: true, message: "Campo obrigatório" }]}
              >
                <Input 
                  className="rounded-none border-gray-300 focus:border-[#345DBD]"
                  placeholder="Digite o RA"
                  disabled={loading}
                />
              </Form.Item>
              <Form.Item
                label={<span className="text-[#345DBD] font-bold font-titillium">Nome Completo</span>}
                name="nome"
                rules={[{ required: true, message: "Campo obrigatório" }]}
              >
                <Input 
                  className="rounded-none border-gray-300 focus:border-[#345DBD]"
                  placeholder="Digite o nome completo"
                  disabled={loading}
                />
              </Form.Item>
              <Form.Item
                label={<span className="text-[#345DBD] font-bold font-titillium">Telefone</span>}
                name="telefone"
              >
                <Input 
                  className="rounded-none border-gray-300 focus:border-[#345DBD]"
                  placeholder="(00) 00000-0000"
                  disabled={loading}
                />
              </Form.Item>
              <Form.Item
                label={<span className="text-[#345DBD] font-bold font-titillium">Email</span>}
                name="email"
                rules={[{ type: 'email', message: 'Email inválido' }]}
              >
                <Input 
                  className="rounded-none border-gray-300 focus:border-[#345DBD]"
                  placeholder="email@exemplo.com"
                  disabled={loading}
                />
              </Form.Item>
              <Form.Item
                label={<span className="text-[#345DBD] font-bold font-titillium">Senha</span>}
                name="senha"
                rules={[{ required: true, message: "Campo obrigatório" }]}
              >
                <Input.Password 
                  className="rounded-none border-gray-300 focus:border-[#345DBD]"
                  placeholder="Crie uma senha"
                  disabled={loading}
                />
              </Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                className="bg-[#6EBBCE] text-white w-full rounded-none hover:bg-[#58AAB9] h-10 font-bold"
                loading={loading}
              >
                Cadastrar
              </Button>
            </Form>
          </div>
        </div>
      </div>

      <div className="flex items-center mt-10">
        <span className="text-2xl font-bold text-white font-titillium">FiveFull</span>
        <img src={fflogo} alt="Logo" className="w-12 h-12 ml-2" />
      </div>
    </div>
  );
};

export default Login;