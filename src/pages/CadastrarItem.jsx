import { useState, useEffect } from "react";
import { Typography, Form, Input, Button, Select, DatePicker, message } from "antd";

function CadastroDinamico() {
  const [tipo, setTipo] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [localizacoes, setLocalizacoes] = useState([]);
  const [insumos, setInsumos] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_BASE = "http://localhost:3001/api";

  // Carregar dados para os selects
  useEffect(() => {
    const carregarDados = async () => {
      try {
        const [categoriasRes, localizacoesRes, insumosRes] = await Promise.all([
          fetch(`${API_BASE}/categorias`),
          fetch(`${API_BASE}/localizacoes`),
          fetch(`${API_BASE}/insumos`)
        ]);

        if (categoriasRes.ok) setCategorias(await categoriasRes.json());
        if (localizacoesRes.ok) setLocalizacoes(await localizacoesRes.json());
        if (insumosRes.ok) setInsumos(await insumosRes.json());
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    carregarDados();
  }, []);

  const onFinish = async (values) => {
    setLoading(true);

    try {
      if (tipo === "insumo") {
        const payload = {
          nome: values.nome,
          marca: values.marca,
          id_categoria: parseInt(values.id_categoria),
          id_localizacao: parseInt(values.id_localizacao),
          quantidade_total: parseInt(values.quantidade_total) || 0
        };

        const response = await fetch(`${API_BASE}/insumos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error("Erro ao cadastrar insumo");
        
        const data = await response.json();
        message.success(`Insumo "${data.nome}" cadastrado com sucesso!`);
      }

      if (tipo === "categoria") {
        const payload = {
          nome: values.nome,
        };

        const response = await fetch(`${API_BASE}/categorias`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error("Erro ao cadastrar categoria");
        
        const data = await response.json();
        message.success(`Categoria "${data.nome}" cadastrada com sucesso!`);
      }

      if (tipo === "localizacao") {
        const payload = {
          nome: values.nome,
        };

        const response = await fetch(`${API_BASE}/localizacoes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error("Erro ao cadastrar localização");
        
        const data = await response.json();
        message.success(`Localização "${data.nome}" cadastrada com sucesso!`);
      }

      if (tipo === "Manutenção") {
        const payload = {
          id_insumo: parseInt(values.id_insumo),
          descricao: values.descricao,
          data_inicio: values.data_inicio.format('YYYY-MM-DD'),
          data_fim: values.data_fim?.format('YYYY-MM-DD'),
          status: values.status
        };

        const response = await fetch(`${API_BASE}/manutencoes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error("Erro ao cadastrar manutenção");
        
        const data = await response.json();
        message.success(`Manutenção cadastrada com sucesso!`);
      }

      // Limpar formulário após sucesso
      setTimeout(() => {
        setTipo(null);
      }, 1000);

    } catch (err) {
      console.error("Erro:", err);
      message.error(`Falha ao cadastrar ${tipo}`);
    } finally {
      setLoading(false);
    }
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
            value={tipo}
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
                    label={<span className="font-bold text-sm font-titillium text-[#345DBD]">Quantidade Total</span>}
                    name="quantidade_total"
                    rules={[{ required: true, message: "Campo obrigatório" }]}
                  >
                    <Input type="number" min="0" className="rounded-none border-gray-300 focus:border-[#345DBD] focus:shadow-none" />
                  </Form.Item>

                  <Form.Item
                    label={<span className="font-bold text-sm font-titillium text-[#345DBD]">Categoria</span>}
                    name="id_categoria"
                    rules={[{ required: true, message: "Campo obrigatório" }]}
                  >
                    <Select 
                      placeholder="Selecione uma categoria"
                      className="rounded-none border-gray-300 focus:border-[#345DBD] focus:shadow-none"
                    >
                      {categorias.map(cat => (
                        <Select.Option key={cat.id_categoria} value={cat.id_categoria}>
                          {cat.nome}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label={<span className="font-bold text-sm font-titillium text-[#345DBD]">Localização</span>}
                    name="id_localizacao"
                    rules={[{ required: true, message: "Campo obrigatório" }]}
                  >
                    <Select 
                      placeholder="Selecione uma localização"
                      className="rounded-none border-gray-300 focus:border-[#345DBD] focus:shadow-none"
                    >
                      {localizacoes.map(loc => (
                        <Select.Option key={loc.id_localizacao} value={loc.id_localizacao}>
                          {loc.nome}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </>
              )}

              {tipo === "categoria" && (
                <Form.Item
                  label={<span className="font-bold text-sm font-titillium text-[#345DBD]">Nome da categoria</span>}
                  name="nome"
                  rules={[{ required: true, message: "Campo obrigatório" }]}
                >
                  <Input className="rounded-none border-gray-300 focus:border-[#345DBD] focus:shadow-none" />
                </Form.Item>
              )}

              {tipo === "localizacao" && (
                <Form.Item
                  label={<span className="font-bold text-sm font-titillium text-[#345DBD]">Localização</span>}
                  name="nome"
                  rules={[{ required: true, message: "Campo obrigatório" }]}
                >
                  <Input className="rounded-none border-gray-300 focus:border-[#345DBD] focus:shadow-none" />
                </Form.Item>
              )}

              {tipo === "Manutenção" && (
                <>
                  <Form.Item
                    label={<span className="font-bold text-sm font-titillium text-[#345DBD]">Insumo</span>}
                    name="id_insumo"
                    rules={[{ required: true, message: "Campo obrigatório" }]}
                  >
                    <Select 
                      placeholder="Selecione um insumo"
                      className="rounded-none border-gray-300 focus:border-[#345DBD] focus:shadow-none"
                    >
                      {insumos.map(insumo => (
                        <Select.Option key={insumo.id_insumo} value={insumo.id_insumo}>
                          {insumo.nome} - {insumo.marca}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label={<span className="font-bold text-sm font-titillium text-[#345DBD]">Descrição</span>}
                    name="descricao"
                    rules={[{ required: true, message: "Campo obrigatório" }]}
                  >
                    <Input.TextArea rows={4} className="rounded-none border-gray-300 focus:border-[#345DBD] focus:shadow-none" />
                  </Form.Item>

                  <Form.Item
                    label={<span className="font-bold text-sm font-titillium text-[#345DBD]">Data de início</span>}
                    name="data_inicio"
                    rules={[{ required: true, message: "Campo obrigatório" }]}
                  >
                    <DatePicker format="DD/MM/YYYY" className="rounded-none border-gray-300 focus:border-[#345DBD] focus:shadow-none w-full" />
                  </Form.Item>

                  <Form.Item
                    label={<span className="font-bold text-sm font-titillium text-[#345DBD]">Data do fim</span>}
                    name="data_fim"
                  >
                    <DatePicker format="DD/MM/YYYY" className="rounded-none border-gray-300 focus:border-[#345DBD] focus:shadow-none w-full" />
                  </Form.Item>

                  <Form.Item
                    label={<span className="font-bold text-sm font-titillium text-[#345DBD]">Status</span>}
                    name="status"
                    rules={[{ required: true, message: "Campo obrigatório" }]}
                    initialValue="agendada"
                  >
                    <Select className="rounded-none border-gray-300 focus:border-[#345DBD] focus:shadow-none">
                      <Select.Option value="agendada">Agendada</Select.Option>
                      <Select.Option value="em_andamento">Em Andamento</Select.Option>
                      <Select.Option value="concluida">Concluída</Select.Option>
                      <Select.Option value="cancelada">Cancelada</Select.Option>
                    </Select>
                  </Form.Item>
                </>
              )}

              <Form.Item>
                <Button
                  className="bg-[#6EBBCE] text-white rounded-none border-gray-300 focus:border-[#345DBD] focus:shadow-none"
                  type="primary"
                  htmlType="submit"
                  loading={loading}
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