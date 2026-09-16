// index.js - API REST simple para obtener locales de Valdivia
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a Base de Datos (Supabase / Neon / Render Postgres)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Endpoint GET: Obtener todos los locales habilitados
app.get('/api/locales', async (req, res) => {
  try {
    const query = `
      SELECT 
        id, 
        nombre, 
        direccion, 
        latitud, 
        longitud, 
        horario_cierre, 
        abierto_ahora 
      FROM locales 
      WHERE activo = true
    `;
    const result = await pool.query(query);
    
    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    console.error('Error al consultar locales:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor al obtener información de locales.'
    });
  }
});

// Endpoint GET: Obtener local por ID
app.get('/api/locales/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const query = 'SELECT * FROM locales WHERE id = $1 AND activo = true';
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Local no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error al obtener el local:', error);
    res.status(500).json({ success: false, message: 'Error del servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});