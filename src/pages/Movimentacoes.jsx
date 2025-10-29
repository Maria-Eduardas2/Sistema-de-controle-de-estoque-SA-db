import { Space, Table, Typography, Button, message, Tag } from "antd";
import { useEffect, useState } from "react";
import { ReloadOutlined, ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

function Movimentacoes() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    carregarMovimentacoes();
  }, []);

  const carregarMovimentacoes = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/api/movimentacoes");
      
      if (!response.ok) {
        throw new Error("Erro ao carregar movimentações");
      }
      
      const data = await response.json();
      
      const formatado = data.map((item) => ({
        key: item.id_movimentacao,
        id: item.id_movimentacao,
        insumo: item.insumo_nome || 'N/A',
        tipo: item.tipo_display || item.tipo,
        quantidade: item.quantidade,
        data: item.data_formatada,
        hora: item.hora_formatada,
        instrutor: item.instrutor_nome || 'Sistema'
      }));
      
      setDataSource(formatado);
      
    } catch (error) {
      console.error("Erro:", error);
      message.error("Erro ao carregar movimentações");
    } finally {
      setLoading(false);
    }
  };

  // Estatísticas com novo estilo
  const estatisticas = dataSource.reduce((acc, item) => {
    if (item.tipo === 'Entrada' || item.tipo === 'entrada') {
      acc.entradas += item.quantidade;
      acc.totalEntradas++;
    } else {
      acc.saidas += item.quantidade;
      acc.totalSaidas++;
    }
    return acc;
  }, { entradas: 0, saidas: 0, totalEntradas: 0, totalSaidas: 0 });

  const colunas = [
    {
      title: "ID",
      dataIndex: "id",
      width: 70,
    },
    {
      title: "Insumo",
      dataIndex: "insumo",
    },
    {
      title: "Tipo",
      dataIndex: "tipo",
      render: (tipo) => (
        <Tag 
          style={{
            border: `1px solid #6EBBCE`,
            background: 'transparent',
            color: '#345DBD',
            fontWeight: 'bold'
          }}
        >
          {tipo === 'Entrada' || tipo === 'entrada' ? (
            <span style={{ color: '#345DBD' }}>
              <ArrowUpOutlined style={{ marginRight: 4 }} />
              Entrada
            </span>
          ) : (
            <span style={{ color: '#345DBD' }}>
              <ArrowDownOutlined style={{ marginRight: 4 }} />
              Saída
            </span>
          )}
        </Tag>
      ),
    },
    {
      title: "Quantidade",
      dataIndex: "quantidade",
      render: (quantidade, record) => (
        <span style={{ 
          fontWeight: 'bold',
          color: '#345DBD'
        }}>
          {quantidade}
        </span>
      ),
    },
    {
      title: "Data",
      dataIndex: "data",
    },
    {
      title: "Hora",
      dataIndex: "hora",
    },
    {
      title: "Instrutor",
      dataIndex: "instrutor",
    },
  ];

  return (
    <Space size={20} direction="vertical" style={{ width: '100%' }}>
      <div className="text-[#345DBD] font-titillium font-bold italic">
        <Typography.Title level={2} className="!text-inherit">
          - Relatório de movimentações
        </Typography.Title>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        {/* Estatísticas com novo estilo */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '16px',
          marginBottom: '20px'
        }}>
          <div style={{ 
            background: 'transparent',
            border: '2px solid #6EBBCE',
            padding: '16px',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#345DBD' }}>
              +{estatisticas.entradas}
            </div>
            <div style={{ color: '#345DBD', fontWeight: '500' }}>
              Entradas ({estatisticas.totalEntradas})
            </div>
          </div>
          <div style={{ 
            background: 'transparent',
            border: '2px solid #6EBBCE',
            padding: '16px',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#345DBD' }}>
              -{estatisticas.saidas}
            </div>
            <div style={{ color: '#345DBD', fontWeight: '500' }}>
              Saídas ({estatisticas.totalSaidas})
            </div>
          </div>
          <div style={{ 
            background: 'transparent',
            border: '2px solid #6EBBCE',
            padding: '16px',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#345DBD' }}>
              {estatisticas.entradas - estatisticas.saidas}
            </div>
            <div style={{ color: '#345DBD', fontWeight: '500' }}>
              Saldo Líquido
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography.Text strong style={{ color: '#345DBD' }}>
            Total: {dataSource.length} movimentações
          </Typography.Text>
          <Button 
            onClick={carregarMovimentacoes}
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
          columns={colunas}
          dataSource={dataSource}
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} de ${total} movimentações`
          }}
          scroll={{ x: 800 }}
        />
      </div>
    </Space>
  );
}

export default Movimentacoes;