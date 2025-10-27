import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";

function Movimentacoes() {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    return ( 
      <Space size={20} direction="vertical">
        <div className="text-[#345DBD] font-titillium font-bold italic">
            <Typography.Title level={2} className="!text-inherit">
            - Relatório de movimentações
            </Typography.Title>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-lg ">
            <Table
                loading={loading}
                columns={[
                {
                    title: "Id",
                    dataIndex: "id_movimentacao",
                    render: (link) => {
                    return <Avatar src={link} />;
                    },
                },
                {
                    title: "Insumo",
                    dataIndex: "nome",
                },
                {
                    title: "Tipo mov.",
                    dataIndex: "tipo",
                    render: (value) => <span>${value}</span>,
                },
                {
                    title: "Quantidade",
                    dataIndex: "quantidade",
                    render: (rating) => {
                    return <Rate value={rating} allowHalf disabled />;
                    },
                },
                {
                    title: "Data",
                    dataIndex: "data_hora",
                },

                {
                    title: "Hora",
                    dataIndex: "data_hora",
                },
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

export default Movimentacoes;