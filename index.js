const express = require('express');
const { Pool } = require('pg');
const app = express();
const PORT   = process.env.PORT || 3000;

app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Error connecting to database:', err.stack);
  } else {
    console.log('✅ Successfully connected to PostgreSQL database!');
    release();
  }
});

app.get('/', (req, res)=>{res.json({
    message: '🎉 Welcome to my Full-Stack REST API!',
    status:'Running',
    database: 'PostgreSQL Connected',
    version: '2.0 - With Database',
    timestamp: new Date().toISOString(),
    endpoints: {
      info: {
        home: 'GET /',
        skills: 'GET /skills',
        about: 'GET /about',
        health: 'GET /health'
      },
      database: {
        init: 'GET /init-db (run this first!)',
        create_user: 'POST /users',
        get_all_users: 'GET /users',
        get_user: 'GET /users/:id',
        update_user: 'PUT /users/:id',
        delete_user: 'DELETE /users/:id'
      }
    },
      instructions: 'Visit /init-db first to create the database table!'
});
});

app.get('/skills', (req, res) => {
  res.json({
    name: 'Preeti Rani',
    experience: '11 years in C++ and Node.js',
    current_role: 'Senior Developer',
    languages: ['C++', 'C++11/14/17', 'Node.js', 'JavaScript'],
    frameworks: ['Express.js', 'STL'],
    tools: ['Docker', 'Git', 'Railway.app', 'Google Test', 'CMake'],
    databases: ['PostgreSQL', 'MySQL', 'MongoDB'],
    cloud: ['Render.com', 'Railway.app', 'Learning AWS'],
    devops: ['CI/CD', 'Docker', 'Automated Deployments'],
    current_learning: ['AWS', 'Kubernates', 'System Design', 'Microservices'],
    status: '🚀 Interview Ready with Full-Stack Skills!',
    github: 'github.com/Chidiya-coder',
    deployed_on: 'Railway.app',
    achievement: 'First cloud deployment completed!'
  });
});

app.get('/about', (req, res) => {
  res.json({
    project: 'Full-Stack REST API with PostgreSQL',
    date: new Date().toISOString(),
    description: 'Production-ready REST API with database integration',
    features: [
      'RESTful API design',
      'PostgreSQL database integration',
      'Complete CRUD operations',
      'Automated CI/CD deployment',
      'Error handling and validation',
      'Production monitoring'
    ],
    tech_stack: {
      backend: 'Node.js + Express.js',
      database: 'PostgreSQL',
      hosting: 'Render.com',
      ci_cd: 'GitHub → Automated Deploy'
    },
    achievement: 'Successfully deployed to cloud!',
    next_steps: ['Add database', 'Learn Docker', 'Practice more']
  });
});

app.get('/projects', (req, res) => {
  res.json({
    total_projects: 'Multiple enterprise applications',
    years_experience: 11,
    team_leadership: 'Led team of 3 developers',
    testing: 'Google Test framework (gtest)',
    microservices: 'Node.js microservices architecture',
    recent_achievement: 'Deployed cloud application with CI/CD'
  });
});

app.get('/interview-ready', (req, res) => {
  res.json({
    technical_skills: 'Strong ✓',
    cloud_deployment: 'Experienced ✓',
    version_control: 'Git & GitHub ✓',
    ci_cd: 'Implemented ✓',
    ready_to_interview: true,
    confidence: 'HIGH',
    proof: 'You are looking at it! This live API proves my skills.'
  });
});

app.get('/init-db', async (req, res) => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        skill VARCHAR(100),
        experience_years INTEGER,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    
    res.json({ 
      success: true,
      message: '✅ Database table created successfully!',
      table_name: 'users',
      columns: [
        'id (auto-increment)',
        'name (required)',
        'email (required, unique)',
        'skill (optional)',
        'experience_years (optional)',
        'created_at (auto)'
      ],
      next_step: 'Now you can create users with POST /users'
    });
  } catch (err) {
    console.error('❌ Error creating table:', err);
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
});

app.post('/users', async (req, res) => {
  const { name, email, skill, experience_years } = req.body;
  
  // Validation
  if (!name || !email) {
    return res.status(400).json({ 
      success: false,
      error: 'Name and email are required',
      example: {
        name: 'John Doe',
        email: 'john@example.com',
        skill: 'C++',
        experience_years: 12
      }
    });
  }
  
  try {
    const result = await pool.query(
      'INSERT INTO users (name, email, skill, experience_years) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, skill || null, experience_years || null]
    );
    
    res.status(201).json({
      success: true,
      message: '✅ User created successfully!',
      user: result.rows[0]
    });
  } catch (err) {
    console.error('❌ Error creating user:', err);
    
    // Handle duplicate email
    if (err.code === '23505') {
      res.status(409).json({ 
        success: false,
        error: 'This email already exists in database' 
      });
    } else if (err.code === '42P01') {
      // Table doesn't exist
       res.status(400).json({
        success: false,
        error: 'Database table not initialized. Please visit /init-db first!'
      });
    } else {
      res.status(500).json({ 
        success: false,
        error: err.message 
      });
    }
  }
});

app.get('/users', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM users ORDER BY created_at DESC'
    );
    
    res.json({
      success: true,
      count: result.rows.length,
      users: result.rows
    });
  } catch (err) {
    console.error('❌ Error fetching users:', err);
    
    if (err.code === '42P01') {
      res.status(400).json({
        success: false,
        error: 'Database table not initialized. Please visit /init-db first!'
      });
      } else {
      res.status(500).json({ 
        success: false,
        error: err.message 
      });
    }
  }
});


app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false,
        error: `User with ID ${id} not found` 
      });
    }
     res.json({
      success: true,
      user: result.rows[0]
    });
  } catch (err) {
    console.error('❌ Error fetching user:', err);
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
});


app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, skill, experience_years } = req.body;
  
  try {
    const result = await pool.query(
      `UPDATE users 
       SET name = COALESCE($1, name),
           email = COALESCE($2, email),
           skill = COALESCE($3, skill),
           experience_years = COALESCE($4, experience_years)
       WHERE id = $5
       RETURNING *`,
      [name, email, skill, experience_years, id]
    );

     if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false,
        error: `User with ID ${id} not found` 
      });
    }
    
    res.json({
      success: true,
      message: '✅ User updated successfully!',
      user: result.rows[0]
    });
  } catch (err) {
    console.error('❌ Error updating user:', err);
    res.status(500).json({ 
         success: false,
      error: err.message 
    });
  }
});


app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await pool.query(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false,
        error: `User with ID ${id} not found` 
      });
    }
    res.json({
      success: true,
      message: '✅ User deleted successfully!',
      deleted_user: result.rows[0]
    });
  } catch (err) {
    console.error('❌ Error deleting user:', err);
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
});


app.get('/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ 
      success: true,
      status: 'healthy',
      database: 'connected',
      database_time: result.rows[0].now,
      server_time: new Date().toISOString()
    });
  } catch (err) {
    res.status(503).json({ 
      success: false,
      status: 'unhealthy',
      database: 'disconnected',
      error: err.message
    });
      }
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    available_endpoints: 'Visit / for list of endpoints'
  });
});

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
     console.log(`📊 Database connection configured`);
  console.log(`✅ Ready to accept requests!`);
})