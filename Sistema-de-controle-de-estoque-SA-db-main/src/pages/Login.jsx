import { Typography, Form, Input, Button } from "antd";
import { useState } from "react";
import fflogo from "../assets/fflogo.png";

function Login() {
  const [modo, setModo] = useState("login"); 

  const onFinishLogin = (values) => {
    console.log("Login:", values);
  };

  const onFinishCadastro = (values) => {
    console.log("Cadastro:", values);
  };

  return (
    <div className="min-h-screen bg-[#345DBD] flex flex-col items-center justify-center p-6">
      <Typography.Title style={{ color: "white", fontWeight: "bold", fontFamily: "Newake", fontStyle: "italic" }}>
        SENAI
      </Typography.Title>

      <div className="flex mb-4 space-x-4">
        <Button
          type={modo === "login" ? "primary" : "default"}
          className="bg-[#6EBBCE] text-white rounded-none hover:bg-[#58AAB9]"
          onClick={() => setModo("login")}
        >
          Login
        </Button>
        <Button
          type={modo === "cadastro" ? "primary" : "default"}
          className="bg-[#6EBBCE] text-white rounded-none hover:bg-[#58AAB9]"
          onClick={() => setModo("cadastro")}
        >
          Cadastro
        </Button>
      </div>

      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-md overflow-hidden">
        <div
          className={`flex transition-transform duration-500 ease-in-out ${
            modo === "login" ? "translate-x-0" : "-translate-x-[50%]"
          }`}
          style={{ width: "200%" }}
        >

          <div className="w-full pr-6">
            <Form layout="vertical" onFinish={onFinishLogin}>
              <Form.Item
                label={<span className="text-[#345DBD] font-bold">RA do Instrutor</span>}
                name="ra"
                rules={[{ required: true, message: "Campo obrigatório" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={<span className="text-[#345DBD] font-bold">Senha</span>}
                name="senha"
                rules={[{ required: true, message: "Campo obrigatório" }]}
              >
                <Input.Password />
              </Form.Item>
              <Button type="primary" htmlType="submit" className="bg-[#6EBBCE] text-white w-full rounded-none">
                Entrar
              </Button>
            </Form>
          </div>

          <div className="w-full pl-6">
            <Form layout="vertical" onFinish={onFinishCadastro}>
              <Form.Item
                label={<span className="text-[#345DBD] font-bold">RA do Instrutor</span>}
                name="ra"
                rules={[{ required: true, message: "Campo obrigatório" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={<span className="text-[#345DBD] font-bold">Nome</span>}
                name="nome"
                rules={[{ required: true, message: "Campo obrigatório" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={<span className="text-[#345DBD] font-bold">Senha</span>}
                name="senha"
                rules={[{ required: true, message: "Campo obrigatório" }]}
              >
                <Input.Password />
              </Form.Item>
              <Button type="primary" htmlType="submit" className="bg-[#6EBBCE] text-white w-full rounded-none">
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
}

export default Login;