import { Typography, Form, Input, Button, message, Modal } from "antd";
import { useState, useEffect } from "react";
import fflogo from "../assets/fflogo.png";

function TabletPage() {
  const [loading, setLoading] = useState(false);
  const [validandoReserva, setValidandoReserva] = useState(false);
  const [insumos, setInsumos] = useState([]);
  const [instrutores, setInstrutores] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [formReserva] = Form.useForm();

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
        tipo: tipo,
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

      const responseText = await response.text();
      let data;
      
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Resposta não é JSON:", responseText);
        throw new Error(`Erro no servidor: ${response.status} ${response.statusText}`);
      }

      if (!response.ok) {
        throw new Error(data.error || `Erro ao realizar ${tipo}`);
      }

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

  const validarReserva = async (values) => {
    setValidandoReserva(true);
    try {
      console.log("Validando reserva:", values.codigo_reserva);

      // Buscar reserva pelo código
      const response = await fetch(`${API_BASE}/reservas`);
      
      if (!response.ok) {
        throw new Error("Erro ao buscar reservas");
      }

      const reservas = await response.json();
      const reserva = reservas.find(r => r.codigo_reserva === values.codigo_reserva);

      if (!reserva) {
        throw new Error("Código de reserva não encontrado");
      }

      if (reserva.status !== 'pendente') {
        throw new Error(`Esta reserva já foi ${reserva.status === 'confirmada' ? 'confirmada' : 'cancelada'}`);
      }

      // Preencher automaticamente o formulário principal com os dados da reserva
      form.setFieldsValue({
        ra: reserva.instrutor_ra || '',
        insumo: reserva.insumo_nome || '',
        quantidade: reserva.quantidade || ''
      });

      message.success(`Reserva ${values.codigo_reserva} validada! Preencha a senha para confirmar.`);
      setModalVisible(false);
      
    } catch (error) {
      console.error("Erro ao validar reserva:", error);
      message.error(error.message);
    } finally {
      setValidandoReserva(false);
    }
  };

  const onFinishRetirar = (values) => {
    realizarMovimentacao(values, 'saida');
  };

  const onFinishDevolver = (values) => {
    realizarMovimentacao(values, 'entrada');
  };

  return (
    <div className="min-h-screen bg-[#345DBD] flex flex-col items-center justify-center p-6">
      <Typography.Title style={{ color: "white", fontWeight: "bold", fontFamily: "Newake", fontStyle: "italic" }}>
        SENAI
      </Typography.Title>

      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-md space-y-4">
        <Form 
          form={form}
          layout="vertical" 
          disabled={loading}
        >
          <Form.Item
            label={<span className="text-[#345DBD] font-bold">RA do Instrutor</span>}
            name="ra"
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Input 
              placeholder="Digite o RA do instrutor"
              className="rounded-none border-gray-300 focus:border-[#345DBD] focus:shadow-none"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-[#345DBD] font-bold">Nome do Insumo</span>}
            name="insumo"
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Input 
              placeholder="Digite o nome do insumo"
              className="rounded-none border-gray-300 focus:border-[#345DBD] focus:shadow-none"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-[#345DBD] font-bold">Quantidade</span>}
            name="quantidade"
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Input
              type="number"
              min={1}
              placeholder="Quantidade"
              className="rounded-none border-gray-300 focus:border-[#345DBD] focus:shadow-none"
            />
          </Form.Item>

          <div className="flex justify-between mt-4">
            <Button
              type="primary"
              className="bg-[#6EBBCE] text-white rounded-none hover:bg-[#58AAB9] w-[48%] h-12 text-lg font-bold"
              loading={loading}
              onClick={() => {
                form.validateFields()
                  .then(values => onFinishRetirar(values))
                  .catch(() => message.error("Preencha todos os campos corretamente"));
              }}
            >
              RETIRAR
            </Button>
            
            <Button
              type="primary"
              className="bg-[#6EBBCE] text-white rounded-none hover:bg-[#58AAB9] w-[48%] h-12 text-lg font-bold"
              loading={loading}
              onClick={() => {
                form.validateFields()
                  .then(values => onFinishDevolver(values))
                  .catch(() => message.error("Preencha todos os campos corretamente"));
              }}
            >
              DEVOLVER
            </Button>
          </div>

          {/* Botão para validar reserva */}
          <div className="mt-4">
            <Button
              type="primary"
              className="bg-[#6EBBCE] text-white rounded-none hover:bg-[#58AAB9] w-full h-12 text-lg font-bold"
              onClick={() => setModalVisible(true)}
            >
               VALIDAR RESERVA
            </Button>
          </div>
        </Form>
      </div>

      {/* Modal para validar reserva */}
      <Modal
        title="Validar Reserva"
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          formReserva.resetFields();
        }}
        footer={null}
        centered
      >
        <Form
          form={formReserva}
          layout="vertical"
          onFinish={validarReserva}
          disabled={validandoReserva}
        >
          <Form.Item
            label="Código da Reserva"
            name="codigo_reserva"
            rules={[{ required: true, message: "Digite o código da reserva" }]}
          >
            <Input 
              placeholder="Ex: RES1761732474980"
              className="rounded-none border-gray-300 focus:border-[#345DBD]"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-between gap-2">
              <Button
                onClick={() => {
                  setModalVisible(false);
                  formReserva.resetFields();
                }}
                className="w-1/2 rounded-none border-[#6EBBCE] text-[#6EBBCE] hover:border-[#58AAB9] hover:text-[#58AAB9]"
              >
                Cancelar
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={validandoReserva}
                className="bg-[#6EBBCE] border-[#6EBBCE] text-white w-1/2 rounded-none hover:bg-[#58AAB9]"
              >
                Validar
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

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