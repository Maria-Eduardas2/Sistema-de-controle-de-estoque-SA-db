import { Typography, Form, Input, Button, Table, Empty, DatePicker } from "antd";
import { useState } from "react";

function Reservar() {
  const [mostrarTabela, setMostrarTabela] = useState(false);
  const [reservas, setReservas] = useState([]); 

  const colunas = [
    { title: "ID do Insumo", dataIndex: "id", key: "id" },
    { title: "Nome do Insumo", dataIndex: "nome", key: "nome" },
    { title: "Quantidade", dataIndex: "quantidade", key: "quantidade" },
    { title: "Instrutor", dataIndex: "instrutor", key: "instrutor" },
    { title: "Data", dataIndex: "data", key: "data" },
  ];

  const onFinish = (values) => {
    const dadosComCodigo = { ...values, codigo: "RES123" };
    console.log("Reserva enviada:", dadosComCodigo);
  };

  return (
    <>
      <div className="text-[#345DBD] font-titillium font-bold italic mb-4">
        <Typography.Title level={2} className="!text-inherit">
          - Reservar insumo
        </Typography.Title>
      </div>

      <div className="flex justify-center items-center p-4">
        <div className="w-full bg-[#FFFDF4] p-9 rounded shadow-md">
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label={<span className="font-bold text-sm text-[#345DBD]">ID do insumo</span>}
              name="id"
              rules={[{ required: true, message: "Campo obrigatório" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={<span className="font-bold text-sm text-[#345DBD]">Nome do insumo</span>}
              name="nome"
              rules={[{ required: true, message: "Campo obrigatório" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={<span className="font-bold text-sm text-[#345DBD]">Quantidade</span>}
              name="quantidade"
              rules={[{ required: true, message: "Campo obrigatório" }]}
            >
              <Input type="number" min={1} />
            </Form.Item>

            <Form.Item
              label={<span className="font-bold text-sm text-[#345DBD]">Data e hora</span>}
              name="data"
              rules={[{ required: true, message: "Campo obrigatório" }]}
            >
              <DatePicker
                showTime
                format="DD/MM/YYYY HH:mm"
                className="w-full"
              />
            </Form.Item>


            <Form.Item>
              <Button type="primary" htmlType="submit" className="bg-[#6EBBCE] text-white">
                Reservar
              </Button>
            </Form.Item>
          </Form>

          <Button
            type="primary"
            className="bg-[#6EBBCE] text-white"
            onClick={() => setMostrarTabela((prev) => !prev)}
          >
            {mostrarTabela ? "Ocultar reservas" : "Visualizar reservas"}
          </Button>



          {mostrarTabela && (
            <div className="mt-6">
              {reservas.length === 0 ? (
                <Empty description="Nenhuma reserva encontrada" />
              ) : (
                <Table columns={colunas} dataSource={reservas} pagination={{ pageSize: 5 }} />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Reservar;