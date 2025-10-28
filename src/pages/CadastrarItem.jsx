import { useState } from "react";
import { Typography, Form, Input, Button, Select, DatePicker, message } from "antd";

function CadastroDinamico() {
  const [tipo, setTipo] = useState(null);

const onFinish = (values) => {
  if (tipo === "insumo") {
    const payload = {
      nome: values.nome,
      marca: values.marca,
      quantidadeTotal: 0,
      categoria: {
        id_categoria: parseInt(values.categoria),
      },
      localizacao: {
        id_localizacao: parseInt(values.localizacao),
      },
    };

    fetch("http://localhost:8080/api/insumos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao cadastrar insumo");
        }
        return res.json();
      })
      .then((data) => {
        message.success(`Insumo "${data.nome}" cadastrado com sucesso!`);
      })
      .catch((err) => {
        console.error("Erro:", err);
        message.error("Falha ao cadastrar insumo");
      });
  }

  if (tipo === "categoria") {
    const payload = {
      nome: values.nome,
    };

    fetch("http://localhost:8080/api/categorias", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao cadastrar categoria");
        }
        return res.json();
      })
      .then((data) => {
        message.success(`Categoria "${data.nome}" cadastrada com sucesso!`);
      })
      .catch((err) => {
        console.error("Erro:", err);
        message.error("Falha ao cadastrar categoria");
      });
  }

  if (tipo === "localizacao") {
    const payload = {
      nome: values.nome,
    };

    fetch("http://localhost:8080/api/localizacoes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao cadastrar localização");
        }
        return res.json();
      })
      .then((data) => {
        message.success(`Localização "${data.nome}" cadastrada com sucesso!`);
      })
      .catch((err) => {
        console.error("Erro:", err);
        message.error("Falha ao cadastrar localização");
      });
  }

  console.log("Dados enviados:", values);
};


  return (
    <>
      <div className="text-[#345DBD] font-titillium font-bold italic mb-4">
        <Typography.Title level={2} className="!text-inherit">
          - Registrar itens
        </Typography.Title>
      </div>

      <div className="flex justify-center items-center p-4">
        <div className="w-full bg-[#FFFDF4] p-9 rounded shadow-md ">
          <Select
            className="font-bold text-sm font-titillium color-[#345DBD] rounded-none border-gray-300 focus:border-[#345DBD] focus:shadow-none"
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
                    <Input className="rounded-none border-gray-300 focus:border-[#345DBD] focus:shadow-none" />
                  </Form.Item>

                  <Form.Item
                    label={<span className="font-bold text-sm font-titillium text-[#345DBD]">Marca</span>}
                    name="marca"
                    rules={[{ required: true, message: "Campo obrigatório" }]}
                  >
                    <Input className="rounded-none border-gray-300 focus:border-[#345DBD] focus:shadow-none" />
                  </Form.Item>

                  <Form.Item
                    label={<span className="font-bold text-sm font-titillium text-[#345DBD]">Categoria (ID)</span>}
                    name="categoria"
                    rules={[{ required: true, message: "Campo obrigatório" }]}
                  >
                    <Input type="number" className="rounded-none border-gray-300 focus:border-[#345DBD] focus:shadow-none" />
                  </Form.Item>

                  <Form.Item
                    label={<span className="font-bold text-sm font-titillium text-[#345DBD]">Lugar armazenado (ID)</span>}
                    name="localizacao"
                    rules={[{ required: true, message: "Campo obrigatório" }]}
                  >
                    <Input type="number" className="rounded-none border-gray-300 focus:border-[#345DBD] focus:shadow-none" />
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
                <Button
                  className="bg-[#6EBBCE] text-white rounded-none border-gray-300 focus:border-[#345DBD] focus:shadow-none"
                  type="primary"
                  htmlType="submit"
                >
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