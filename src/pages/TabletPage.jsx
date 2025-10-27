import { Typography, Form, Input, Button } from "antd";
<<<<<<< HEAD
import fflogo from "../assets/fflogo.png";
=======
>>>>>>> 83757ab01048e3fe68caadca1e4dfb24dadf343d

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
<<<<<<< HEAD
              type="primary"
=======
>>>>>>> 83757ab01048e3fe68caadca1e4dfb24dadf343d
              className="bg-[#6EBBCE] text-white rounded-none hover:bg-[#58AAB9] w-[48%]"
              htmlType="submit"
            >
              Retirar
            </Button>
            <Button
<<<<<<< HEAD
              type="primary"
=======
>>>>>>> 83757ab01048e3fe68caadca1e4dfb24dadf343d
              className="bg-[#6EBBCE] text-white rounded-none hover:bg-[#58AAB9] w-[48%]"
              htmlType="submit"
            >
              Devolver
            </Button>
          </div>
        </Form>
      </div>

<<<<<<< HEAD

      <div className="flex items-center mt-10">
        <span className=" text-2xl font-bold text-white font-titillium">
          FiveFull
        </span>
        <img src={fflogo} alt="Logo" className="w-12 h-12 mr-2" />
      </div>

=======
      <div className="mt-10 text-2xl font-bold text-white font-light text-sm font-titillium">FiveFull</div>
>>>>>>> 83757ab01048e3fe68caadca1e4dfb24dadf343d
    </div>
  );
}

export default TabletPage;