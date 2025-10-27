import { Typography, Form, Input, Button } from "antd";

function TabletPage() {
  const onFinish = (values) => {
    console.log("Ação realizada:", values);
  };

  return (
    <div className="min-h-screen bg-[#345DBD] flex flex-col items-center justify-center p-6">
      <Typography.Title style={{ color: "white", fontWeight: "bold", fontFamily: "Newake", fontStyle: "italic" }}>
        SENAI
      </Typography.Title>

      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-md space-y-4">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label={<span className="text-[#345DBD] font-bold">RA do Instrutor</span>}
            name="ra"
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Input className="rounded-none border-gray-300 focus:border-[#345DBD] focus:shadow-none" />
          </Form.Item>

          <Form.Item
            label={<span className="text-[#345DBD] font-bold">Nome do Insumo</span>}
            name="insumo"
            rules={[{ required: true, message: "Campo obrigatório" }]}
          >
            <Input className="rounded-none border-gray-300 focus:border-[#345DBD] focus:shadow-none" />
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
            />
          </Form.Item>

          <div className="flex justify-between mt-6">
            <Button
              className="bg-[#6EBBCE] text-white rounded-none hover:bg-[#58AAB9] w-[48%]"
              htmlType="submit"
            >
              Retirar
            </Button>
            <Button
              className="bg-[#6EBBCE] text-white rounded-none hover:bg-[#58AAB9] w-[48%]"
              htmlType="submit"
            >
              Devolver
            </Button>
          </div>
        </Form>
      </div>

      <div className="mt-10 text-2xl font-bold text-white font-light text-sm font-titillium">FiveFull</div>
    </div>
  );
}

export default TabletPage;