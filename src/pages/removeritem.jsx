import { Typography, Form, Button, Select, message } from "antd";
import { useState, useEffect } from "react";

function Deletar() {
  const [tipo, setTipo] = useState("insumo");
  const [loading, setLoading] = useState(false);
  const [itens, setItens] = useState([]);
  const [form] = Form.useForm();

  const API_BASE = "http://localhost:3001/api";

  // Carregar dados quando o tipo muda
  useEffect(() => {
    carregarItens();
  }, [tipo]);

  const carregarItens = async () => {
    try {
      let url = "";
      if (tipo === "insumo") url = `${API_BASE}/insumos`;
      if (tipo === "categoria") url = `${API_BASE}/categorias`;
      if (tipo === "localizacao") url = `${API_BASE}/localizacoes`;

      const response = await fetch(url);
      
      if (response.ok) {
        const data = await response.json();
        setItens(data);
      }
    } catch (error) {
      console.error("Erro ao carregar itens:", error);
    }
  };

  const deletarItem = async (values) => {
    setLoading(true);
    try {
      const itemId = values.item_id;
      
      // CORREÇÃO: Usar os nomes corretos das rotas
      let endpoint = "";
      if (tipo === "insumo") endpoint = "insumos";
      if (tipo === "categoria") endpoint = "categorias";
      if (tipo === "localizacao") endpoint = "localizacoes"; // CORRIGIDO: sem "s" extra
      
      const response = await fetch(`${API_BASE}/${endpoint}/${itemId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Erro ao deletar ${tipo}`);
      }

      message.success(data.message);
      form.resetFields();
      carregarItens();
      
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="text-[#345DBD] font-titillium font-bold italic mb-4">
        <Typography.Title level={2} className="!text-inherit">
          - Remover itens
        </Typography.Title>
      </div>

      <div className="flex justify-center items-center p-4">
        <div className="w-full max-w-2xl bg-[#FFFDF4] p-9 rounded shadow-md">
          
          <Form form={form} layout="vertical" onFinish={deletarItem}>
            
            {/* Seletor de tipo */}
            <Form.Item label="O que você quer remover?">
              <Select
                value={tipo}
                onChange={setTipo}
                style={{ width: '100%' }}
              >
                <Select.Option value="insumo">Insumo</Select.Option>
                <Select.Option value="categoria">Categoria</Select.Option>
                <Select.Option value="localizacao">Localização</Select.Option>
              </Select>
            </Form.Item>

            {/* Seletor do item */}
            <Form.Item
              label={`Selecione o ${tipo} para remover`}
              name="item_id"
              rules={[{ required: true, message: `Selecione um ${tipo}` }]}
            >
              <Select placeholder={`Selecione um ${tipo}`}>
                {itens
                  .filter(item => {
                    let id;
                    if (tipo === "insumo") id = item.id_insumo || item.id_Insumo;
                    if (tipo === "categoria") id = item.id_Categoria || item.id_categoria;
                    if (tipo === "localizacao") id = item.id_Localizacao || item.id_localizacao;
                    
                    return id != null;
                  })
                  .map((item) => {
                    let id, nome;
                    
                    if (tipo === "insumo") {
                      id = item.id_insumo || item.id_Insumo;
                      nome = item.nome;
                    } else if (tipo === "categoria") {
                      id = item.id_Categoria || item.id_categoria;
                      nome = item.nome;
                    } else if (tipo === "localizacao") {
                      id = item.id_Localizacao || item.id_localizacao;
                      nome = item.nome;
                    }

                    return (
                      <Select.Option key={id} value={id}>
                        {nome}
                      </Select.Option>
                    );
                  })
                }
              </Select>
            </Form.Item>

            {/* Botão de deletar */}
            <Form.Item>
              <Button
                type="primary"
                danger
                htmlType="submit"
                loading={loading}
                style={{ width: '100%' }}
              >
                Remover {tipo}
              </Button>
            </Form.Item>
            
          </Form>
        </div>
      </div>
    </>
  );
}

export default Deletar;