import { Avatar, Space, Table, Typography, Tag, Progress, Button } from "antd";
import { useEffect, useState } from "react";
import { ReloadOutlined } from "@ant-design/icons";

function Estoque() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    carregarEstoque();
  }, []);

  const carregarEstoque = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/api/estoque");
      if (!response.ok) {
        throw new Error("Erro ao buscar dados do estoque");
      }
      const data = await response.json();
      
      const formatado = data.map((item) => ({
        key: item.id,
        id: item.id,
        insumo_id: item.insumo_id,
        insumo_nome: item.insumo_nome,
        insumo_marca: item.insumo_marca,
        categoria_nome: item.categoria_nome,
        localizacao_nome: item.localizacao_nome,
        quantidade_disponivel: item.quantidade_disponivel,
        quantidade_minima: item.quantidade_minima,
        ultima_atualizacao: item.ultima_atualizacao,
        status: item.quantidade_disponivel <= item.quantidade_minima ? 'critico' : 
                item.quantidade_disponivel <= item.quantidade_minima * 2 ? 'alerta' : 'normal'
      }));
      setDataSource(formatado);
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  // Colunas da tabela
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 80,
      render: (id) => <Avatar size="small" style={{ backgroundColor: '#345DBD' }}>{id}</Avatar>,
    },
    {
      title: "Insumo",
      dataIndex: "insumo_nome",
      render: (nome, record) => (
        <div>
          <div style={{ fontWeight: 'bold' }}>{nome}</div>
          {record.insumo_marca && (
            <div style={{ fontSize: '12px', color: '#666' }}>Marca: {record.insumo_marca}</div>
          )}
        </div>
      ),
    },
    {
      title: "Categoria",
      dataIndex: "categoria_nome",
      render: (categoria) => (
        <Tag 
          style={{ 
            border: '1px solid #6EBBCE',
            background: 'transparent',
            color: '#345DBD',
            fontWeight: 'bold'
          }}
        >
          {categoria || 'Sem categoria'}
        </Tag>
      ),
    },
    {
      title: "Localização",
      dataIndex: "localizacao_nome",
      render: (localizacao) => (
        <Tag 
          style={{ 
            border: '1px solid #6EBBCE',
            background: 'transparent',
            color: '#345DBD',
            fontWeight: 'bold'
          }}
        >
          {localizacao || 'Sem localização'}
        </Tag>
      ),
    },
    {
      title: "Quantidade",
      dataIndex: "quantidade_disponivel",
      render: (quantidade, record) => (
        <div style={{ minWidth: 120 }}>
          <div style={{ marginBottom: 4 }}>
            <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#345DBD' }}>{quantidade}</span>
            <span style={{ fontSize: '12px', color: '#666', marginLeft: 4 }}>
              / mín: {record.quantidade_minima}
            </span>
          </div>
          <Progress 
            percent={Math.min((quantidade / (record.quantidade_minima * 3)) * 100, 100)}
            size="small"
            strokeColor={{
              '0%': '#6EBBCE',
              '100%': '#345DBD',
            }}
            showInfo={false}
          />
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        const config = {
          critico: { 
            color: '#345DBD', 
            background: 'transparent',
            border: '1px solid #345DBD',
            text: 'Crítico' 
          },
          alerta: { 
            color: '#345DBD', 
            background: 'transparent',
            border: '1px solid #6EBBCE', 
            text: 'Alerta' 
          },
          normal: { 
            color: '#345DBD', 
            background: 'transparent',
            border: '1px solid #6EBBCE',
            text: 'Normal' 
          }
        };
        
        const current = config[status] || config.normal;
        return (
          <Tag 
            style={{ 
              border: current.border,
              background: current.background,
              color: current.color,
              fontWeight: 'bold'
            }}
          >
            {current.text}
          </Tag>
        );
      },
    },
  ];

  return (
    <Space size={20} direction="vertical" style={{ width: '100%' }}>
      <div className="text-[#345DBD] font-titillium font-bold italic">
        <Typography.Title level={2} className="!text-inherit">
          - Estoque
        </Typography.Title>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography.Text strong style={{ color: '#345DBD' }}>
            Total: {dataSource.length} itens em estoque
          </Typography.Text>
          <Button 
            type="primary" 
            onClick={carregarEstoque}
            loading={loading}
            icon={<ReloadOutlined />}
            style={{
              background: '#6EBBCE',
              borderColor: '#6EBBCE',
              color: 'white',
              borderRadius: '0px'
            }}
          >
            Atualizar
          </Button>
        </div>

        <Table
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} de ${total} itens`
          }}
          scroll={{ x: 800 }}
        />
      </div>
    </Space>
  );
}

export default Estoque;