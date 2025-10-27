import { useState } from "react";
import { Typography, Form, Input, Button, Select, DatePicker } from "antd";

function CadastroDinamico() {
  const [tipo, setTipo] = useState(null);

  const onFinish = (values) => {
    console.log("Dados enviados:", values);
  };

  return (
    <>
      <div className="text-[#345DBD] font-titillium font-bold italic mb-4">
        <Typography.Title level={2} className="!text-inherit">
          - Registrar itens
        </Typography.Title>
      </div>

<<<<<<< HEAD
      <div className="flex justify-center items-center p-4">
=======
      <div className="flex justify-center items-center p-20">
>>>>>>> 83757ab01048e3fe68caadca1e4dfb24dadf343d
         <div className="w-full bg-[#FFFDF4] p-9 rounded shadow-md ">
            <Select
              className="font-bold text-sm font-titillium color-[#345DBD]
              rounded-none border-gray-300 focus:border-[#345DBD] focus:shadow-none"
              placeholder="Selecione o tipo de item"
              onChange={(value) => setTipo(value)}
              style={{ width: 300, marginBottom: 24 }}
            >
              <Select.Option value="insumo">Insumo</Select.Option>
              <Select.Option value="categoria">Categoria</Select.Option>
              <Select.Option value="localizacao">Localização</Select.Option>
              <Select.Option value="Manutenção">Manutenção</Select.Option>
            </Select>

            {tipo && (
              <Form layout="vertical" onFinish={onFinish}>
                {tipo === "insumo" && (
                  <>
                    <Form.Item
                      label={<span className="font-bold text-sm font-titillium text-[#345DBD]">Nome</span>}
                      name="nome"
                      rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                      <Input className="rounded-none border-gray-300 focus:border-[#345DBD] focus:shadow-none"
                      />
                    </Form.Item>

                    <Form.Item
                      label={<span className="font-bold text-sm font-titillium text-[#345DBD]">Marca</span>}
                      name="marca"
                      rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                      <Input className="rounded-none border-gray-300 focus:border-[#345DBD] focus:shadow-none"
                      />
                    </Form.Item>

                    <Form.Item
                      label={<span className="font-bold text-sm font-titillium text-[#345DBD]">Categoria</span>}
                      name="categoria"
                      rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                      <Input className="rounded-none border-gray-300 focus:border-[#345DBD] focus:shadow-none"
                      />
                    </Form.Item>

                    <Form.Item
                      label={<span className="font-bold text-sm font-titillium text-[#345DBD]">Lugar armazenado</span>}
                      name="localizacao"
                      rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                      <Input className="rounded-none border-gray-300 focus:border-[#345DBD] focus:shadow-none"
                    />
                    </Form.Item>
                  </>
                )}

                {tipo === "categoria" && (
                  <Form.Item
                    label={<span className="font-bold text-sm font-titillium text-[#345DBD]">Nome da categoria</span>}
                    name="nome"
                    rules={[{ required: true, message: "Campo obrigatório" }]}
                  >
                    <Input className="rounded-none border-gray-300 focus:border-[#345DBD] focus:shadow-none"
                    />
                  </Form.Item>
                )}

                {tipo === "localizacao" && (
                  <Form.Item
                    label={<span className="font-bold text-sm font-titillium text-[#345DBD]">Localização</span>}
                    name="nome"
                    rules={[{ required: true, message: "Campo obrigatório" }]}
                  >
                    <Input className="rounded-none border-gray-300 focus:border-[#345DBD] focus:shadow-none"
                  />
                  </Form.Item>
                )}

                {tipo === "Manutenção" && (
                  <>
                    <Form.Item
                      label={<span className="font-bold text-sm font-titillium text-[#345DBD]">Descrição</span>}
                      name="descricao"
                      rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                      <Input className="rounded-none border-gray-300 focus:border-[#345DBD] focus:shadow-none"
      />
                    </Form.Item>

                    <Form.Item
                      label={<span className="font-bold text-sm font-titillium text-[#345DBD]">Data de início</span>}
                      name="data_inicio"
                      rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                      <DatePicker format="DD/MM/YYYY" className="rounded-none border-gray-300 focus:border-[#345DBD] focus:shadow-none"
      />
                    </Form.Item>

                    <Form.Item
                      label={<span className="font-bold text-sm font-titillium text-[#345DBD]">Data do fim</span>}
                      name="data_fim"
                      rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                      <DatePicker format="DD/MM/YYYY" className="rounded-none border-gray-300 focus:border-[#345DBD] focus:shadow-none"
      />
                    </Form.Item>

                    <Form.Item
                      label={<span className="font-bold text-sm font-titillium text-[#345DBD]">Status</span>}
                      name="status"
                      rules={[{ required: true, message: "Campo obrigatório" }]}
                    >
                      <Select
                        className="font-bold text-sm font-titillium text-[#345DBD]"
                      >
                        <Select.Option value="ativo">Ativo</Select.Option>
                        <Select.Option value="inativo">Inativo</Select.Option>
                        <Select.Option value="pendente">Pendente</Select.Option>
                      </Select>
                    </Form.Item>
                  </>
                )}

                <Form.Item>
                  <Button className="bg-[#6EBBCE] text-white rounded-none border-gray-300 focus:border-[#345DBD] focus:shadow-none" 
                  type="primary" htmlType="submit">
                    Cadastrar
                  </Button>
                </Form.Item>
              </Form>
            )}
          
        </div>
    </div>
    </>
  );
}

export default CadastroDinamico;