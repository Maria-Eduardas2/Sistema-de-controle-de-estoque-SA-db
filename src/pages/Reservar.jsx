import { Typography, Form, Input, Button, Table, Empty, DatePicker, Select, message } from "antd";
import { useState, useEffect } from "react";

function Reservar() {
  const [mostrarTabela, setMostrarTabela] = useState(false);
  const [reservas, setReservas] = useState([]);
  const [insumos, setInsumos] = useState([]);
  const [instrutores, setInstrutores] = useState([]);
  const [loading, setLoading] = useState(false);
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
      message.error("Erro ao carregar insumos ou instrutores");
    }
  };

  // Carregar reservas da API
  const carregarReservas = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/reservas`);
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status} ao carregar reservas`);
      }
      
      const data = await response.json();
      console.log("Reservas carregadas da API:", data);
      
      // Formatar os dados para a tabela
      const reservasFormatadas = data.map((reserva) => ({
        key: reserva.id,
        codigo: reserva.codigo_reserva,
        nome: reserva.insumo_nome,
        quantidade: reserva.quantidade,
        instrutor: reserva.instrutor_nome,
        data: reserva.data_formatada,
        status: reserva.status
      }));
      
      setReservas(reservasFormatadas);
      
    } catch (error) {
      console.error("Erro ao carregar reservas:", error);
      message.error("Erro ao carregar reservas: " + error.message);
      setReservas([]); // Garantir que fique vazio em caso de erro
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Gerar código único para a reserva
      const codigoReserva = `RES${Date.now()}`;
      
      const payload = {
        id_instructor: values.instrutor_id,
        id_insumo: values.insumo_id,
        quantidade: parseInt(values.quantidade),
        data_reserva: values.data.format('YYYY-MM-DD'),
        codigo_reserva: codigoReserva,
        status: 'pendente'
      };

      console.log("Enviando reserva:", payload);

      // Fazer a requisição POST para criar a reserva
      const response = await fetch(`${API_BASE}/reservas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao criar reserva');
      }

      const data = await response.json();
      message.success(`Reserva ${codigoReserva} criada com sucesso!`);
      form.resetFields();
      
      // Recarregar a lista de reservas se a tabela estiver visível
      if (mostrarTabela) {
        carregarReservas();
      }
      
    } catch (error) {
      console.error("Erro ao criar reserva:", error);
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const colunas = [
    { 
      title: "Código", 
      dataIndex: "codigo", 
      key: "codigo",
      render: (codigo) => <span style={{ fontWeight: 'bold', color: '#345DBD' }}>{codigo}</span>
    },
    { 
      title: "Insumo", 
      dataIndex: "nome", 
      key: "nome" 
    },
    { 
      title: "Quantidade", 
      dataIndex: "quantidade", 
      key: "quantidade",
      render: (quantidade) => <span style={{ fontWeight: 'bold' }}>{quantidade}</span>
    },
    { 
      title: "Instrutor", 
      dataIndex: "instrutor", 
      key: "instrutor" 
    },
    { 
      title: "Data", 
      dataIndex: "data", 
      key: "data" 
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span style={{ 
          color: status === 'confirmada' ? 'green' : 
                 status === 'cancelada' ? 'red' : 'orange',
          fontWeight: 'bold'
        }}>
          {status === 'confirmada' ? 'Confirmada' : 
           status === 'cancelada' ? 'Cancelada' : 'Pendente'}
        </span>
      )
    },
  ];

  return (
    <>
      <div className="text-[#345DBD] font-titillium font-bold italic mb-4">
        <Typography.Title level={2} className="!text-inherit">
          - Reservar insumo
        </Typography.Title>
      </div>

      <div className="flex justify-center items-center p-4">
        <div className="w-full max-w-4xl bg-[#FFFDF4] p-9 rounded shadow-md">
          
          {/* Formulário de Reserva */}
          <Form 
            form={form}
            layout="vertical" 
            onFinish={onFinish}
            disabled={loading}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Form.Item
                label={<span className="font-bold text-sm text-[#345DBD]">Insumo</span>}
                name="insumo_id"
                rules={[{ required: true, message: "Selecione um insumo" }]}
              >
                <Select
                  placeholder="Selecione o insumo"
                  showSearch
                  optionFilterProp="children"
                >
                  {insumos.map(insumo => (
                    <Select.Option key={insumo.id_insumo} value={insumo.id_insumo}>
                      {insumo.nome} {insumo.marca && `- ${insumo.marca}`}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label={<span className="font-bold text-sm text-[#345DBD]">Instrutor</span>}
                name="instrutor_id"
                rules={[{ required: true, message: "Selecione um instrutor" }]}
              >
                <Select placeholder="Selecione o instrutor">
                  {instrutores.map(instrutor => (
                    <Select.Option key={instrutor.id_instrutores} value={instrutor.id_instrutores}>
                      {instrutor.nome} ({instrutor.ra})
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Form.Item
                label={<span className="font-bold text-sm text-[#345DBD]">Quantidade</span>}
                name="quantidade"
                rules={[{ required: true, message: "Digite a quantidade" }]}
              >
                <Input type="number" min={1} placeholder="Quantidade" />
              </Form.Item>

              <Form.Item
                label={<span className="font-bold text-sm text-[#345DBD]">Data da reserva</span>}
                name="data"
                rules={[{ required: true, message: "Selecione a data" }]}
              >
                <DatePicker
                  format="DD/MM/YYYY"
                  className="w-full"
                  placeholder="Selecione a data"
                />
              </Form.Item>
            </div>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                className="bg-[#6EBBCE] text-white rounded-none"
                loading={loading}
                style={{ width: '200px' }}
              >
                Reservar Insumo
              </Button>
            </Form.Item>
          </Form>

          {/* Botão para mostrar/ocultar reservas */}
          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <Button
              type="primary"
              className="bg-[#345DBD] text-white rounded-none"
              onClick={() => {
                const novoEstado = !mostrarTabela;
                setMostrarTabela(novoEstado);
                if (novoEstado) {
                  carregarReservas();
                }
              }}
              loading={loading}
            >
              {mostrarTabela ? "Ocultar reservas" : "Visualizar reservas"}
            </Button>
          </div>

          {/* Tabela de Reservas */}
          {mostrarTabela && (
            <div className="mt-6">
              {reservas.length === 0 ? (
                <Empty description="Nenhuma reserva encontrada" />
              ) : (
                <div>
                  <div style={{ marginBottom: '16px', fontWeight: 'bold', color: '#345DBD' }}>
                    Total de reservas: {reservas.length}
                  </div>
                  <Table 
                    columns={colunas} 
                    dataSource={reservas} 
                    pagination={{ pageSize: 5 }} 
                    loading={loading}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Reservar;