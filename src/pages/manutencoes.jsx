import { Avatar, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";

function Manutencoes() {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    return ( 
      <Space size={20} direction="vertical">
        <div className="text-[#345DBD] font-titillium font-bold italic">
            <Typography.Title level={2} className="!text-inherit">
            - Histórico de manutenções
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
                    title: "Descrição",
                    dataIndex: "descricao",
                },
                {
                    title: "Data de início",
                    dataIndex: "data_inicio",
                    render: (value) => <span>${value}</span>,
                },
                {
                    title: "Data final",
                    dataIndex: "data_fim",
                    render: (rating) => {
                    return <Rate value={rating} allowHalf disabled />;
                    },
                },
                {
                    title: "Status",
                    dataIndex: "status",
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

export default Manutencoes;