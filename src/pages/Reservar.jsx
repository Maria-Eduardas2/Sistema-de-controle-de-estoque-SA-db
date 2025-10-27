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
      <div className="text-[#345DBD] font-titillium font-bold italic mb-4">
        <Typography.Title level={2} className="!text-inherit">
          - Reservar insumo
        </Typography.Title>
      </div>

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
                Reservar
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>

    );
}

export default Reservar;