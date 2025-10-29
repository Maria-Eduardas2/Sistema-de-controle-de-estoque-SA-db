import { Typography, Form, Input, Button, Select, message } from "antd";
import { useState, useEffect } from "react";
import fflogo from "../assets/fflogo.png";

function TabletPage() {
  const [loading, setLoading] = useState(false);
  const [insumos, setInsumos] = useState([]);
  const [instrutores, setInstrutores] = useState([]);
  const [form] = Form.useForm();

  const API_BASE = "http://localhost:3001/api";

  // Carregar insumos e instrutores
  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const [insumosRes, instrutoresRes] = await Promise.all([
        fetch(`${API_BASE}/insumos`),
        fetch(`${API_BASE}/instrutores`)
      ]);

      if (insumosRes.ok) {
        const insumosData = await insumosRes.json();
        setInsumos(insumosData);
      }

      if (instrutoresRes.ok) {
        const instrutoresData = await instrutoresRes.json();
        setInstrutores(instrutoresData);
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      message.error("Erro ao carregar dados");
    }
  };

  const realizarMovimentacao = async (values, tipo) => {
    setLoading(true);
    try {
      // Buscar o instrutor pelo RA
      const instrutor = instrutores.find(i => i.ra === values.ra);
      if (!instrutor) {
        throw new Error("RA do instrutor não encontrado");
      }

      // Buscar o insumo pelo nome
      const insumo = insumos.find(i => i.nome.toLowerCase() === values.insumo.toLowerCase());
      if (!insumo) {
        throw new Error("Insumo não encontrado");
      }

      const payload = {
        id_instructor: instrutor.id_instrutores,
        id_insumo: insumo.id_insumo,
        tipo: tipo, // 'entrada' para devolver, 'saida' para retirar
        quantidade: parseInt(values.quantidade)
      };

      console.log(`Realizando ${tipo}:`, payload);

      const response = await fetch(`${API_BASE}/movimentacoes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Erro ao realizar ${tipo}`);
      }

      const data = await response.json();
      
      if (tipo === 'saida') {
        message.success(`Retirada de ${values.quantidade} ${values.insumo} realizada com sucesso!`);
      } else {
        message.success(`Devolução de ${values.quantidade} ${values.insumo} realizada com sucesso!`);
      }
      
      form.resetFields();
      
    } catch (error) {
      console.error(`Erro ao realizar ${tipo}:`, error);
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onFinishRetirar = (values) => {
    realizarMovimentacao(values, 'saida');
  };

  const onFinishDevolver = (values) => {
    realizarMovimentacao(values, 'entrada');
  };

  // Função para buscar sugestões de insumos
  const buscarSugestoesInsumos = (searchText) => {
    return insumos
      .filter(insumo => 
        insumo.nome.toLowerCase().includes(searchText.toLowerCase())
      )
      .map(insumo => insumo.nome);
  };

  return (
    <div className="min-h-screen bg-[#345DBD] flex flex-col items-center justify-center p-6">
      <Typography.Title style={{ color: "white", fontWeight: "bold", fontFamily: "Newake", fontStyle: "italic" }}>
        SENAI
      </Typography.Title>

      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-md space-y-4">
        {/* Formulário para Retirar */}
        <Form 
          form={form}
          layout="vertical" 
          onFinish={onFinishRetirar}
          disabled={loading}
        >
          <Form.Item
            label={<span className="text-[#345DBD] font-bold">RA do Instrutor</span>}
            name="ra"
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Select
              showSearch
              placeholder="Digite ou selecione o RA"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {instrutores.map(instrutor => (
                <Select.Option key={instrutor.ra} value={instrutor.ra}>
                  {instrutor.ra} - {instrutor.nome}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label={<span className="text-[#345DBD] font-bold">Nome do Insumo</span>}
            name="insumo"
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Select
              showSearch
              placeholder="Digite ou selecione o insumo"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {insumos.map(insumo => (
                <Select.Option key={insumo.id_insumo} value={insumo.nome}>
                  {insumo.nome} {insumo.marca && `(${insumo.marca})`}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label={<span className="text-[#345DBD] font-bold">Quantidade</span>}
            name="quantidade"
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Input
              type="number"
              min={1}
              className="rounded-none border-gray-300 focus:border-[#345DBD] focus:shadow-none"
              placeholder="Quantidade"
            />
          </Form.Item>

          <div className="flex justify-between mt-6">
            <Button
              type="primary"
              className="bg-[#ff4d4f] text-white rounded-none hover:bg-[#d9363e] w-[48%]"
              htmlType="submit"
              loading={loading}
              onClick={() => form.setFieldsValue({ _action: 'retirar' })}
            >
              Retirar
            </Button>
            
            <Button
              type="primary"
              className="bg-[#52c41a] text-white rounded-none hover:bg-[#389e0d] w-[48%]"
              loading={loading}
              onClick={() => {
                const values = form.getFieldsValue();
                if (values.ra && values.insumo && values.quantidade) {
                  onFinishDevolver(values);
                } else {
                  message.error("Preencha todos os campos primeiro");
                }
              }}
            >
              Devolver
            </Button>
          </div>
        </Form>
      </div>

      <div className="flex items-center mt-10">
        <span className="text-2xl font-bold text-white font-titillium">
          FiveFull
        </span>
        <img src={fflogo} alt="Logo" className="w-12 h-12 ml-2" />
      </div>
    </div>
  );
}

export default TabletPage;