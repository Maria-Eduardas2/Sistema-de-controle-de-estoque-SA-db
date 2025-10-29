import { Avatar, Space, Table, Typography, Tag, Button, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { 
  ArrowUpOutlined, 
  ArrowDownOutlined, 
  UserOutlined,
  ReloadOutlined
} from "@ant-design/icons";

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
        throw new Error("Erro ao buscar movimentações");
      }
      const data = await response.json();
      
      const formatado = data.map((item) => ({
        key: item.id_movimentacao,
        id_movimentacao: item.id_movimentacao,
        tipo: item.tipo,
        tipo_display: item.tipo_display,
        quantidade: item.quantidade,
        data_hora: item.data_hora,
        data_formatada: item.data_formatada,
        hora_formatada: item.hora_formatada,
        insumo_nome: item.insumo_nome,
        insumo_marca: item.insumo_marca,
        categoria_nome: item.categoria_nome,
        instrutor_nome: item.instrutor_nome,
        instrutor_ra: item.instrutor_ra,
        // Configuração baseada no tipo
        tipo_config: getTipoConfig(item.tipo)
      }));
      setDataSource(formatado);
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  // Configuração de tipos
  const getTipoConfig = (tipo) => {
    const configs = {
      entrada: { 
        color: 'green', 
        icon: <ArrowUpOutlined />, 
        text: 'Entrada' 
      },
      saida: { 
        color: 'red', 
        icon: <ArrowDownOutlined />, 
        text: 'Saída' 
      }
    };
    return configs[tipo] || { color: 'default', icon: null, text: tipo };
  };

  // Colunas da tabela
  const columns = [
    {
      title: "ID",
      dataIndex: "id_movimentacao",
      width: 70,
      render: (id) => (
        <Avatar 
          size="small" 
          style={{ backgroundColor: '#345DBD' }}
        >
          {id}
        </Avatar>
      ),
    },
    {
      title: "Insumo",
      dataIndex: "insumo_nome",
      render: (nome, record) => (
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{nome}</div>
          {record.insumo_marca && (
            <div style={{ fontSize: '12px', color: '#666' }}>
              {record.insumo_marca}
              {record.categoria_nome && ` • ${record.categoria_nome}`}
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Tipo",
      dataIndex: "tipo",
      width: 100,
      render: (tipo, record) => {
        const config = record.tipo_config;
        return (
          <Tag 
            color={config.color}
            icon={config.icon}
            style={{ 
              border: 'none', 
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              minWidth: '80px',
              justifyContent: 'center'
            }}
          >
            {config.text}
          </Tag>
        );
      },
    },
    {
      title: "Quantidade",
      dataIndex: "quantidade",
      width: 120,
      render: (quantidade, record) => (
        <div style={{ 
          textAlign: 'center',
          fontWeight: 'bold',
          color: record.tipo === 'entrada' ? '#52c41a' : '#ff4d4f',
          fontSize: '16px'
        }}>
          {record.tipo === 'entrada' ? '+' : '-'}{quantidade}
        </div>
      ),
    },
    {
      title: "Data",
      dataIndex: "data_formatada",
      width: 110,
      render: (data) => (
        <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
          {data}
        </div>
      ),
    },
    {
      title: "Hora",
      dataIndex: "hora_formatada",
      width: 80,
      render: (hora) => (
        <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
          {hora}
        </div>
      ),
    },
    {
      title: "Instrutor",
      dataIndex: "instrutor_nome",
      render: (nome, record) => (
        <div>
          {nome ? (
            <Tooltip title={`RA: ${record.instrutor_ra}`}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <UserOutlined style={{ color: '#345DBD' }} />
                <span>{nome}</span>
              </div>
            </Tooltip>
          ) : (
            <Tag color="default">Sistema</Tag>
          )}
        </div>
      ),
    },
  ];

  // Estatísticas rápidas
  const estatisticas = dataSource.reduce((acc, item) => {
    if (item.tipo === 'entrada') {
      acc.entradas += item.quantidade;
      acc.totalEntradas++;
    } else {
      acc.saidas += item.quantidade;
      acc.totalSaidas++;
    }
    return acc;
  }, { entradas: 0, saidas: 0, totalEntradas: 0, totalSaidas: 0 });

  return (
    <Space size={20} direction="vertical" style={{ width: '100%' }}>
      <div className="text-[#345DBD] font-titillium font-bold italic">
        <Typography.Title level={2} className="!text-inherit">
          - Relatório de movimentações
        </Typography.Title>
      </div>

      {/* Estatísticas */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '16px',
          marginBottom: '20px'
        }}>
          <div style={{ 
            background: '#f6ffed', 
            border: '1px solid #b7eb8f',
            padding: '16px',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>
              +{estatisticas.entradas}
            </div>
            <div style={{ color: '#52c41a', fontWeight: '500' }}>
              Entradas ({estatisticas.totalEntradas})
            </div>
          </div>
          <div style={{ 
            background: '#fff2f0', 
            border: '1px solid #ffccc7',
            padding: '16px',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff4d4f' }}>
              -{estatisticas.saidas}
            </div>
            <div style={{ color: '#ff4d4f', fontWeight: '500' }}>
              Saídas ({estatisticas.totalSaidas})
            </div>
          </div>
          <div style={{ 
            background: '#f0f5ff', 
            border: '1px solid #adc6ff',
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
            type="primary" 
            onClick={carregarMovimentacoes}
            loading={loading}
            icon={<ReloadOutlined />}
            className="bg-[#6EBBCE] border-[#6EBBCE] rounded-none"
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
              `${range[0]}-${range[1]} de ${total} movimentações`
          }}
          scroll={{ x: 800 }}
        />
      </div>
    </Space>
  );
}

export default Movimentacoes;