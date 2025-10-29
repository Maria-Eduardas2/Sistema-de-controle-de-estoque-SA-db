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
  password: process.env.DB_PASS || 'pass123editmelol',
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

// MOVIMENTAÇÕES - Versão ultra simples que funciona
app.get('/api/movimentacoes', async (req, res) => {
  try {
    console.log("Buscando movimentações de forma segura...");
    
    // Primeiro, vamos verificar e corrigir os dados problemáticos
    const dadosCorrompidos = await pool.query(`
      SELECT id_movimentacao, tipo 
      FROM Movimentacoes 
      WHERE tipo NOT IN ('entrada', 'saida')
    `);
    
    console.log("Dados com tipos inválidos:", dadosCorrompidos.rows);
    
    if (dadosCorrompidos.rows.length > 0) {
      console.log("Corrigindo dados inválidos...");
      await pool.query(`
        UPDATE Movimentacoes 
        SET tipo = 'entrada' 
        WHERE tipo = 'Entrada' OR tipo = 'ENTRADA' OR tipo NOT IN ('entrada', 'saida')
      `);
    }

    // Buscar apenas os dados básicos sem joins complexos
    const result = await pool.query(`
      SELECT 
        id_movimentacao,
        tipo,
        quantidade,
        data_hora,
        id_insumo,
        id_instructor,
        TO_CHAR(data_hora, 'DD/MM/YYYY') as data_formatada,
        TO_CHAR(data_hora, 'HH24:MI') as hora_formatada,
        CASE 
          WHEN tipo = 'entrada' THEN 'Entrada'
          WHEN tipo = 'saida' THEN 'Saída'
          ELSE 'Desconhecido'
        END as tipo_display
      FROM Movimentacoes 
      ORDER BY data_hora DESC
    `);
    
    console.log("Movimentações básicas encontradas:", result.rows.length);
    
    // Se não houver dados, retornar array vazio
    if (result.rows.length === 0) {
      return res.status(200).json([]);
    }
    
    // Para cada movimentação, buscar os dados do insumo separadamente
    const movimentacoesCompletas = await Promise.all(
      result.rows.map(async (mov) => {
        try {
          // Buscar dados do insumo
          const insumoResult = await pool.query(
            'SELECT nome, marca FROM Insumo WHERE id_Insumo = $1',
            [mov.id_insumo]
          );
          
          // Buscar dados do instrutor
          const instrutorResult = await pool.query(
            'SELECT nome, ra FROM Instrutores WHERE id_Instrutores = $1',
            [mov.id_instructor]
          );
          
          return {
            ...mov,
            insumo_nome: insumoResult.rows[0]?.nome || 'Insumo não encontrado',
            insumo_marca: insumoResult.rows[0]?.marca || '',
            instrutor_nome: instrutorResult.rows[0]?.nome || 'Sistema',
            instrutor_ra: instrutorResult.rows[0]?.ra || ''
          };
        } catch (error) {
          console.error(`Erro ao buscar dados para movimentação ${mov.id_movimentacao}:`, error);
          return {
            ...mov,
            insumo_nome: 'Erro ao carregar',
            insumo_marca: '',
            instrutor_nome: 'Erro ao carregar',
            instrutor_ra: ''
          };
        }
      })
    );
    
    res.status(200).json(movimentacoesCompletas);
    
  } catch (error) {
    console.error('Erro crítico ao buscar movimentações:', error);
    
    // Último recurso: retornar apenas os dados mais básicos possíveis
    try {
      const ultimoRecurso = await pool.query(`
        SELECT 
          id_movimentacao,
          tipo,
          quantidade,
          TO_CHAR(data_hora, 'DD/MM/YYYY') as data_formatada,
          TO_CHAR(data_hora, 'HH24:MI') as hora_formatada
        FROM Movimentacoes 
        WHERE tipo IN ('entrada', 'saida')
        ORDER BY data_hora DESC
        LIMIT 50
      `);
      
      res.status(200).json(ultimoRecurso.rows);
    } catch (finalError) {
      res.status(200).json([]); // Retorna array vazio como último recurso
    }
  }
});

// MOVIMENTAÇÕES - Criar nova movimentação
app.post('/api/movimentacoes', async (req, res) => {
  try {
    const { id_instructor, id_insumo, tipo, quantidade } = req.body;
    
    console.log("Recebendo movimentação:", { id_instructor, id_insumo, tipo, quantidade });
    
    // Validar se o tipo é válido para o ENUM
    if (!['entrada', 'saida'].includes(tipo)) {
      return res.status(400).json({ error: 'Tipo deve ser "entrada" ou "saida"' });
    }

    // Validar se o instrutor existe
    const instrutorExistente = await pool.query(
      'SELECT id_instrutores FROM Instrutores WHERE id_instrutores = $1',
      [id_instructor]
    );

    if (instrutorExistente.rows.length === 0) {
      return res.status(404).json({ error: 'Instrutor não encontrado' });
    }

    // Validar se o insumo existe
    const insumoExistente = await pool.query(
      'SELECT id_Insumo FROM Insumo WHERE id_Insumo = $1',
      [id_insumo]
    );

    if (insumoExistente.rows.length === 0) {
      return res.status(404).json({ error: 'Insumo não encontrado' });
    }

    // Inserir a movimentação
    const result = await pool.query(
      `INSERT INTO Movimentacoes (id_instructor, id_insumo, tipo, quantidade) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [id_instructor, id_insumo, tipo, quantidade]
    );

    // Atualizar o estoque
    if (tipo === 'entrada') {
      await pool.query(
        'UPDATE Estoque SET quantidade_disponivel = quantidade_disponivel + $1 WHERE id_insumo = $2',
        [quantidade, id_insumo]
      );
    } else if (tipo === 'saida') {
      await pool.query(
        'UPDATE Estoque SET quantidade_disponivel = quantidade_disponivel - $1 WHERE id_insumo = $2',
        [quantidade, id_insumo]
      );
    }

    console.log("Movimentação criada com sucesso:", result.rows[0]);
    res.status(201).json({ 
      success: true,
      message: `Movimentação de ${tipo} realizada com sucesso`,
      movimentacao: result.rows[0]
    });

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

// ROTAS PARA DELETAR

// Deletar insumo
app.delete('/api/insumos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verificar se o insumo existe
    const insumoExistente = await pool.query(
      'SELECT * FROM Insumo WHERE id_Insumo = $1',
      [id]
    );

    if (insumoExistente.rows.length === 0) {
      return res.status(404).json({ error: 'Insumo não encontrado' });
    }

    // Deletar registros relacionados primeiro (devido às foreign keys)
    await pool.query('DELETE FROM Movimentacoes WHERE id_insumo = $1', [id]);
    await pool.query('DELETE FROM Manutencao WHERE id_insumo = $1', [id]);
    await pool.query('DELETE FROM Reserva WHERE id_insumo = $1', [id]);
    await pool.query('DELETE FROM Estoque WHERE id_insumo = $1', [id]);
    
    // Deletar o insumo
    await pool.query('DELETE FROM Insumo WHERE id_Insumo = $1', [id]);

    res.status(200).json({ 
      success: true,
      message: 'Insumo deletado com sucesso',
      insumo: insumoExistente.rows[0]
    });
  } catch (error) {
    console.error('Erro ao deletar insumo:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Deletar categoria
app.delete('/api/categorias/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verificar se a categoria existe
    const categoriaExistente = await pool.query(
      'SELECT * FROM Categoria WHERE id_Categoria = $1',
      [id]
    );

    if (categoriaExistente.rows.length === 0) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }

    // Verificar se há insumos usando esta categoria
    const insumosComCategoria = await pool.query(
      'SELECT COUNT(*) FROM Insumo WHERE id_categoria = $1',
      [id]
    );

    if (parseInt(insumosComCategoria.rows[0].count) > 0) {
      return res.status(400).json({ 
        error: 'Não é possível deletar esta categoria pois existem insumos vinculados a ela' 
      });
    }

    // Deletar a categoria
    await pool.query('DELETE FROM Categoria WHERE id_Categoria = $1', [id]);

    res.status(200).json({ 
      success: true,
      message: 'Categoria deletada com sucesso',
      categoria: categoriaExistente.rows[0]
    });
  } catch (error) {
    console.error('Erro ao deletar categoria:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Deletar localização
app.delete('/api/localizacoes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verificar se a localização existe
    const localizacaoExistente = await pool.query(
      'SELECT * FROM Localizacao WHERE id_Localizacao = $1',
      [id]
    );

    if (localizacaoExistente.rows.length === 0) {
      return res.status(404).json({ error: 'Localização não encontrada' });
    }

    // Verificar se há insumos usando esta localização
    const insumosComLocalizacao = await pool.query(
      'SELECT COUNT(*) FROM Insumo WHERE id_localizacao = $1',
      [id]
    );

    if (parseInt(insumosComLocalizacao.rows[0].count) > 0) {
      return res.status(400).json({ 
        error: 'Não é possível deletar esta localização pois existem insumos vinculados a ela' 
      });
    }

    // Deletar a localização
    await pool.query('DELETE FROM Localizacao WHERE id_Localizacao = $1', [id]);

    res.status(200).json({ 
      success: true,
      message: 'Localização deletada com sucesso',
      localizacao: localizacaoExistente.rows[0]
    });
  } catch (error) {
    console.error('Erro ao deletar localização:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Buscar insumos por nome (para o select)
app.get('/api/insumos/busca/:nome', async (req, res) => {
  try {
    const { nome } = req.params;
    const result = await pool.query(
      `SELECT i.*, c.nome as categoria_nome, l.nome as localizacao_nome
       FROM Insumo i
       LEFT JOIN Categoria c ON i.id_categoria = c.id_Categoria
       LEFT JOIN Localizacao l ON i.id_localizacao = l.id_Localizacao
       WHERE i.nome ILIKE $1`,
      [`%${nome}%`]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar insumos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// INSTRUTORES - Login e Cadastro
app.post('/api/instrutores/login', async (req, res) => {
  try {
    const { ra, senha } = req.body;
    
    const result = await pool.query(
      'SELECT id_instrutores, nome, ra, telefone, email FROM Instrutores WHERE ra = $1 AND senha = $2',
      [ra, senha]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'RA ou senha incorretos' });
    }

    res.status(200).json({ 
      success: true,
      user: result.rows[0],
      message: 'Login realizado com sucesso'
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.post('/api/instrutores/cadastro', async (req, res) => {
  try {
    const { nome, ra, telefone, email, senha } = req.body;
    
    // Verificar se RA já existe
    const existing = await pool.query(
      'SELECT id_instrutores FROM Instrutores WHERE ra = $1',
      [ra]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'RA já cadastrado' });
    }

    const result = await pool.query(
      `INSERT INTO Instrutores (nome, ra, telefone, email, senha) 
       VALUES ($1, $2, $3, $4, $5) RETURNING id_instrutores, nome, ra, telefone, email`,
      [nome, ra, telefone || null, email || null, senha]
    );

    res.status(201).json({ 
      success: true,
      user: result.rows[0],
      message: 'Instrutor cadastrado com sucesso'
    });
  } catch (error) {
    console.error('Erro no cadastro:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para buscar todos os instrutores (opcional, para debug)
app.get('/api/instrutores', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id_instrutores, nome, ra, telefone, email FROM Instrutores ORDER BY id_instrutores'
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar instrutores:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// RESERVAS
app.post('/api/reservas', async (req, res) => {
  try {
    const { id_instructor, id_insumo, quantidade, data_reserva, codigo_reserva, status } = req.body;
    
    const result = await pool.query(
      `INSERT INTO Reserva (id_instructor, id_insumo, quantidade, data_reserva, codigo_reserva, status) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [id_instructor, id_insumo, quantidade, data_reserva, codigo_reserva, status || 'pendente']
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar reserva:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.get('/api/reservas', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        r.id_Reserva as id,
        r.quantidade,
        r.data_reserva,
        r.codigo_reserva,
        r.status,
        i.nome as insumo_nome,
        i.marca as insumo_marca,
        instr.nome as instrutor_nome,
        TO_CHAR(r.data_reserva, 'DD/MM/YYYY') as data_formatada
      FROM Reserva r
      LEFT JOIN Insumo i ON r.id_insumo = i.id_Insumo
      LEFT JOIN Instrutores instr ON r.id_instructor = instr.id_Instrutores
      ORDER BY r.data_reserva DESC
    `);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar reservas:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});


// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📊 Conectando ao banco: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
});