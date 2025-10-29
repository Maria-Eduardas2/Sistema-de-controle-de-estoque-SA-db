import express from 'express';
import cors from 'cors';
import pkg from 'pg';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config();

const { Pool } = pkg;
const app = express();
const PORT = process.env.PORT || 3001;

// Configuração do pool do PostgreSQL com suas credenciais
const pool = new Pool({
  user: process.env.DB_USER || 'admin',
  host: process.env.DB_HOST || '217.160.125.126',
  database: process.env.DB_NAME || 'duds_main',
  password: process.env.DB_PASS || 'pass123editmelol', // Note: DB_PASS em vez de DB_PASSWORD
  port: process.env.DB_PORT || 14327,
});

// Middleware
app.use(cors());
app.use(express.json());

// Testar conexão com o banco
pool.on('connect', () => {
  console.log('✅ Conectado ao PostgreSQL');
});

pool.on('error', (err) => {
  console.error('❌ Erro na conexão com PostgreSQL:', err);
});

// Rota de teste
app.get('/api/hello', (req, res) => {
  res.json({ 
    message: 'API funcionando! 🚀',
    timestamp: new Date().toISOString(),
    database: 'PostgreSQL conectado'
  });
});

// INSUMOS
app.post('/api/insumos', async (req, res) => {
  try {
    const { nome, marca, id_categoria, id_localizacao, quantidade_total } = req.body;
    
    const result = await pool.query(
      `INSERT INTO Insumo (nome, marca, id_categoria, id_localizacao, quantidade_total) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [nome, marca, id_categoria, id_localizacao, quantidade_total || 0]
    );

    // Criar registro no estoque
    await pool.query(
      'INSERT INTO Estoque (id_insumo, quantidade_disponivel, quantidade_minima) VALUES ($1, $2, $3)',
      [result.rows[0].id_insumo, quantidade_total || 0, 0]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar insumo:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.get('/api/insumos', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT i.*, c.nome as categoria_nome, l.nome as localizacao_nome,
             e.quantidade_disponivel, e.quantidade_minima
      FROM Insumo i
      LEFT JOIN Categoria c ON i.id_categoria = c.id_Categoria
      LEFT JOIN Localizacao l ON i.id_localizacao = l.id_Localizacao
      LEFT JOIN Estoque e ON i.id_Insumo = e.id_insumo
    `);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar insumos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// CATEGORIAS
app.post('/api/categorias', async (req, res) => {
  try {
    const { nome } = req.body;
    
    const result = await pool.query(
      'INSERT INTO Categoria (nome) VALUES ($1) RETURNING *',
      [nome]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.get('/api/categorias', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Categoria ORDER BY id_Categoria');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// LOCALIZAÇÕES
app.post('/api/localizacoes', async (req, res) => {
  try {
    const { nome } = req.body;
    
    const result = await pool.query(
      'INSERT INTO Localizacao (nome) VALUES ($1) RETURNING *',
      [nome]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar localização:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.get('/api/localizacoes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Localizacao ORDER BY id_Localizacao');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar localizações:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// MANUTENÇÃO
app.post('/api/manutencoes', async (req, res) => {
  try {
    const { id_insumo, descricao, data_inicio, data_fim, status } = req.body;
    
    const result = await pool.query(
      `INSERT INTO Manutencao (id_insumo, descricao, data_inicio, data_fim, status) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [id_insumo, descricao, data_inicio, data_fim, status || 'agendada']
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar manutenção:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.get('/api/manutencoes', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        m.id_manutencao as id,
        m.descricao,
        m.data_inicio,
        m.data_fim,
        m.status,
        i.id_insumo as insumo_id,
        i.nome as insumo_nome,
        i.marca as insumo_marca,
        c.nome as categoria_nome,
        TO_CHAR(m.data_inicio, 'DD/MM/YYYY') as data_inicio_formatada,
        TO_CHAR(m.data_fim, 'DD/MM/YYYY') as data_fim_formatada,
        CASE 
          WHEN m.data_fim IS NULL AND m.status != 'cancelada' THEN 'Em andamento'
          WHEN m.status = 'concluida' THEN 'Concluída'
          WHEN m.status = 'cancelada' THEN 'Cancelada'
          ELSE 'Agendada'
        END as status_display
      FROM Manutencao m
      LEFT JOIN Insumo i ON m.id_insumo = i.id_Insumo
      LEFT JOIN Categoria c ON i.id_categoria = c.id_Categoria
      ORDER BY m.data_inicio DESC, m.id_manutencao DESC
    `);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar manutenções:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// MOVIMENTAÇÕES - Histórico completo (CORRIGIDO)
app.get('/api/movimentacoes', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        m.id_movimentacao,
        m.tipo,
        m.quantidade,
        m.data_hora,
        i.id_insumo,
        i.nome as insumo_nome,
        i.marca as insumo_marca,
        c.nome as categoria_nome,
        instr.nome as instrutor_nome,
        instr.ra as instrutor_ra,
        TO_CHAR(m.data_hora, 'DD/MM/YYYY') as data_formatada,
        TO_CHAR(m.data_hora, 'HH24:MI') as hora_formatada,
        CASE 
          WHEN m.tipo = 'entrada' THEN 'Entrada'
          WHEN m.tipo = 'saida' THEN 'Saída'
          ELSE m.tipo
        END as tipo_display
      FROM Movimentacoes m
      LEFT JOIN Insumo i ON m.id_insumo = i.id_Insumo
      LEFT JOIN Categoria c ON i.id_categoria = c.id_Categoria
      LEFT JOIN Instrutores instr ON m.id_instructor = instr.id_Instrutores
      ORDER BY m.data_hora DESC, m.id_movimentacao DESC
    `);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar movimentações:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// ADICIONAR: Rota para criar movimentações (se precisar)
app.post('/api/movimentacoes', async (req, res) => {
  try {
    const { id_instructor, id_insumo, tipo, quantidade } = req.body;
    
    // Validar se o tipo é válido para o ENUM
    if (!['entrada', 'saida'].includes(tipo)) {
      return res.status(400).json({ error: 'Tipo deve ser "entrada" ou "saida"' });
    }
    
    const result = await pool.query(
      `INSERT INTO Movimentacoes (id_instructor, id_insumo, tipo, quantidade) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [id_instructor, id_insumo, tipo, quantidade]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar movimentação:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// ESTOQUE - Lista completa com joins
app.get('/api/estoque', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        e.id_Estoque as id,
        i.id_Insumo as insumo_id,
        i.nome as insumo_nome,
        i.marca as insumo_marca,
        c.nome as categoria_nome,
        l.nome as localizacao_nome,
        e.quantidade_disponivel,
        e.quantidade_minima,
        e.ultima_atualizacao
      FROM Estoque e
      LEFT JOIN Insumo i ON e.id_insumo = i.id_Insumo
      LEFT JOIN Categoria c ON i.id_categoria = c.id_Categoria
      LEFT JOIN Localizacao l ON i.id_localizacao = l.id_Localizacao
      ORDER BY e.id_Estoque
    `);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar estoque:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📊 Conectando ao banco: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
});