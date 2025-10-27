import { Typography, Form, Input, Button } from "antd";

function Deletar() {
    const onFinish = (values) => {
    console.log("Dados enviados:", values);
    };

    return ( 
    <>
      <div className="text-[#345DBD] font-titillium font-bold italic mb-4">
        <Typography.Title level={2} className="!text-inherit">
          - Remover itens
        </Typography.Title>
      </div>

      <div className="flex justify-center items-center p-4">
        <div className="w-full bg-[#FFFDF4] p-9 rounded shadow-md">
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label={
                <span className="font-bold text-sm font-titillium text-[#345DBD]">
                  Nome do insumo
                </span>
              }
              name="insumo"
            >
              <Input className="rounded-none border-gray-300 focus:border-[#345DBD] focus:shadow-none" />
            </Form.Item>

            <Form.Item
              label={
                <span className="font-bold text-sm font-titillium text-[#345DBD]">
                  Nome da localização
                </span>
              }
              name="localizacao"
            >
              <Input className="rounded-none border-gray-300 focus:border-[#345DBD] focus:shadow-none" />
            </Form.Item>

            <Form.Item
              label={
                <span className="font-bold text-sm font-titillium text-[#345DBD]">
                  Nome da categoria
                </span>
              }
              name="categoria"
            >
              <Input className="rounded-none border-gray-300 focus:border-[#345DBD]
               focus:shadow-none" />
            </Form.Item>

            <Form.Item>
              <Button
                className="bg-[#6EBBCE] text-white rounded-none 
                border-gray-300 focus:border-[#345DBD] focus:shadow-none hover:bg-[#74A9C4]"
                type="primary"
                htmlType="submit"
              >
                Remover
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>

    );
}

export default Deletar;