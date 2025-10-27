import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";

function Estoque() {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    return ( 
      <Space size={20} direction="vertical">
        <div className="text-[#345DBD] font-titillium font-bold italic">
            <Typography.Title level={2} className="!text-inherit">
            - Estoque
            </Typography.Title>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-lg ">
            <Table
                loading={loading}
                columns={[
                {
                    title: "Id",
                    dataIndex: "Id",
                    render: (link) => {
                    return <Avatar src={link} />;
                    },
                },
                {
                    title: "Insumo",
                    dataIndex: "Insumo",
                },
                {
                    title: "Categoria",
                    dataIndex: "Categoria",
                    render: (value) => <span>${value}</span>,
                },
                {
                    title: "Local armz.",
                    dataIndex: "Localizacao",
                    render: (rating) => {
                    return <Rate value={rating} allowHalf disabled />;
                    },
                },
                {
                    title: "Quant. atual",
                    dataIndex: "quantidade_disponivel",
                },

                {
                    title: "Quant. min",
                    dataIndex: "quantidade_minima",
                },
<<<<<<< HEAD
=======
                {
                    title: "Quant. total",
                    dataIndex: "quantidade_total",
                },
>>>>>>> 83757ab01048e3fe68caadca1e4dfb24dadf343d
                ]}
                dataSource={dataSource}
                pagination={{
                pageSize: 5,
                }}
            ></Table>
        </div>
        </Space>
    );
}

export default Estoque;