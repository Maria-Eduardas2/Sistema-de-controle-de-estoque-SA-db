import { Avatar, Space, Table, Typography, Tag, Button, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { 
  CalendarOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  CloseCircleOutlined,
  ToolOutlined 
} from "@ant-design/icons";

function Manutencoes() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    carregarManutencoes();
  }, []);

  const carregarManutencoes = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/api/manutencoes");
      if (!response.ok) {
        throw new Error("Erro ao buscar manutenções");
      }
      const data = await response.json();
      
      const formatado = data.map((item) => ({
        key: item.id,
        id: item.id,
        descricao: item.descricao,
        data_inicio: item.data_inicio,
        data_fim: item.data_fim,
        data_inicio_formatada: item.data_inicio_formatada,
        data_fim_formatada: item.data_fim_formatada,
        status: item.status,
        status_display: item.status_display,
        insumo_nome: item.insumo_nome,
        insumo_marca: item.insumo_marca,
        categoria_nome: item.categoria_nome,
        insumo_id: item.insumo_id,
        // Cores e ícones baseados no status
        status_config: getStatusConfig(item.status)
      }));
      setDataSource(formatado);
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  // Configuração de status
  const getStatusConfig = (status) => {
    const configs = {
      agendada: { 
        color: 'blue', 
        icon: <CalendarOutlined />, 
        text: 'Agendada' 
      },
      em_andamento: { 
        color: 'orange', 
        icon: <ClockCircleOutlined />, 
        text: 'Em Andamento' 
      },
      concluida: { 
        color: 'green', 
        icon: <CheckCircleOutlined />, 
        text: 'Concluída' 
      },
      cancelada: { 
        color: 'red', 
        icon: <CloseCircleOutlined />, 
        text: 'Cancelada' 
      }
    };
    return configs[status] || configs.agendada;
  };

  // Colunas da tabela
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 70,
      render: (id) => (
        <Avatar 
          size="small" 
          style={{ backgroundColor: '#345DBD' }}
          icon={<ToolOutlined />}
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
      title: "Descrição",
      dataIndex: "descricao",
      render: (descricao) => (
        <Tooltip title={descricao}>
          <span style={{ 
            display: 'block',
            maxWidth: '200px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {descricao}
          </span>
        </Tooltip>
      ),
    },
    {
      title: "Data Início",
      dataIndex: "data_inicio_formatada",
      width: 120,
      render: (data, record) => (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 'bold' }}>{data}</div>
        </div>
      ),
    },
    {
      title: "Data Fim",
      dataIndex: "data_fim_formatada",
      width: 120,
      render: (data, record) => (
        <div style={{ textAlign: 'center' }}>
          {data ? (
            <div style={{ fontWeight: 'bold' }}>{data}</div>
          ) : (
            <Tag color="default">-</Tag>
          )}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 140,
      render: (status, record) => {
        const config = record.status_config;
        return (
          <Tag 
            color={config.color} 
            icon={config.icon}
            style={{ 
              border: 'none', 
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            {config.text}
          </Tag>
        );
      },
    },
    {
      title: "Ações",
      key: "acoes",
      width: 100,
      render: (_, record) => (
        <Space>
          <Tooltip title="Ver detalhes">
            <Button 
              type="link" 
              size="small"
              style={{ color: '#345DBD' }}
            >
              Detalhes
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Space size={20} direction="vertical" style={{ width: '100%' }}>
      <div className="text-[#345DBD] font-titillium font-bold italic">
        <Typography.Title level={2} className="!text-inherit">
          - Histórico de manutenções
        </Typography.Title>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography.Text strong style={{ color: '#345DBD' }}>
            Total: {dataSource.length} manutenções
          </Typography.Text>
          <Button 
            type="primary" 
            onClick={carregarManutencoes}
            loading={loading}
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
              `${range[0]}-${range[1]} de ${total} manutenções`
          }}
          scroll={{ x: 800 }}
        />
      </div>
    </Space>
  );
}

export default Manutencoes;