<<<<<<< HEAD
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
=======
import { useState, useEffect } from "react";
import { Typography, Form, Input, Button } from "antd";

function Reservar() {
    const [codigoReserva, setCodigoReserva] = useState("");

    const gerarCodigoReserva = () => {
        const timestamp = Date.now();
        const aleatorio = Math.floor(Math.random() * 1000);
        return `RES-${timestamp}-${aleatorio}`;
    };

    useEffect(() => {
        setCodigoReserva(gerarCodigoReserva());
    }, []);

    const onFinish = (values) => {
        const dadosComCodigo = { ...values, codigo: codigoReserva };
        console.log("Reserva enviada:", dadosComCodigo);
    };

    return ( 
     <>
>>>>>>> 83757ab01048e3fe68caadca1e4dfb24dadf343d
      <div className="text-[#345DBD] font-titillium font-bold italic mb-4">
        <Typography.Title level={2} className="!text-inherit">
          - Reservar insumo
        </Typography.Title>
      </div>

<<<<<<< HEAD
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
=======
      <div className="flex justify-center items-center p-20">
        <div className="w-full bg-[#FFFDF4] p-9 rounded shadow-md">
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label={
                <span className="font-bold text-sm font-titillium text-[#345DBD]">
                  Código da reserva
                </span>
              }
              name="codigo"
              initialValue={codigoReserva}

            >
              <Input
                value={codigoReserva}
                disabled
                className="rounded-none border-gray-300 text-[#345DBD] font-bold focus:border-[#345DBD] focus:shadow-none"
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="font-bold text-sm font-titillium text-[#345DBD]">
                  ID do insumo
                </span>
              }
              name="id"
              rules={[{ required: true, message: "Campo obrigatório" }]}
            >
              <Input className="rounded-none border-gray-300 focus:border-[#345DBD] focus:shadow-none" />
            </Form.Item>

            <Form.Item
              label={
                <span className="font-bold text-sm font-titillium text-[#345DBD]">
                  Nome do insumo
                </span>
              }
              name="nome"
              rules={[{ required: true, message: "Campo obrigatório" }]}
            >
              <Input className="rounded-none border-gray-300 focus:border-[#345DBD] focus:shadow-none" />
            </Form.Item>

            <Form.Item
              label={
                <span className="font-bold text-sm font-titillium text-[#345DBD]">
                  Quantidade
                </span>
              }
              name="quantidade"
              rules={[{ required: true, message: "Campo obrigatório" }]}
            >
              <Input
                type="number"
                min={1}
                className="rounded-none border-gray-300 focus:border-[#345DBD] focus:shadow-none"
              />
            </Form.Item>

            <Form.Item>
              <Button
                className="bg-[#6EBBCE] text-white rounded-none border-gray-300 focus:border-[#345DBD] focus:shadow-none"
                type="primary"
                htmlType="submit"
              >
>>>>>>> 83757ab01048e3fe68caadca1e4dfb24dadf343d
                Reservar
              </Button>
            </Form.Item>
          </Form>
<<<<<<< HEAD

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
=======
        </div>
      </div>
    </>

    );
>>>>>>> 83757ab01048e3fe68caadca1e4dfb24dadf343d
}

export default Reservar;