import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";

function Estoque() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8080/api/estoque")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao buscar dados do estoque");
        }
        return res.json();
      })
      .then((data) => {
        // Ajusta os dados para a tabela
        const formatado = data.map((item) => ({
          key: item.id,
          Id: item.id,
          Insumo: item.nome,
          Categoria: item.categoria,
          Localizacao: item.localizacao, // se for número, será usado no Rate
          quantidade_disponivel: item.quantidadeDisponivel,
          quantidade_minima: item.quantidadeMinima,
        }));
        setDataSource(formatado);
      })
      .catch((err) => {
        console.error("Erro:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Space size={20} direction="vertical">
      <div className="text-[#345DBD] font-titillium font-bold italic">
        <Typography.Title level={2} className="!text-inherit">
          - Estoque
        </Typography.Title>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-lg">
        <Table
          loading={loading}
          columns={[
            {
              title: "Id",
              dataIndex: "Id",
              render: (id) => <Avatar>{id}</Avatar>,
            },
            {
              title: "Insumo",
              dataIndex: "Insumo",
            },
            {
              title: "Categoria",
              dataIndex: "Categoria",
              render: (value) => <span>{value}</span>,
            },
            {
              title: "Local armz.",
              dataIndex: "Localizacao",
              render: (rating) => <Rate value={rating} allowHalf disabled />,
            },
            {
              title: "Quant. atual",
              dataIndex: "quantidade_disponivel",
            },
            {
              title: "Quant. min",
              dataIndex: "quantidade_minima",
            },
          ]}
          dataSource={dataSource}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </Space>
  );
}

export default Estoque;