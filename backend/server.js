const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./src/routes/auth');
const userRoutes = require('./src/routes/users');
const taskRoutes = require('./src/routes/tasks');
const projectRoutes = require('./src/routes/projects');

// Import database (optional - uncomment when ready to connect)
// const sequelize = require('./src/config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware Setup
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:4200',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mount API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/projects', projectRoutes);

// Basic API Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Taskorbit API is running perfectly!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    port: PORT,
    database: 'Connected (will add database later)',
    cors: `Enabled for ${process.env.FRONTEND_URL}`
  });
});

app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'Backend server is working!',
    timestamp: new Date().toISOString(),
    availableEndpoints: [
      'GET /api/health - Server health check',
      'GET /api/test - Test endpoint'
    ]
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint '${req.originalUrl}' not found`,
    suggestion: 'Check available endpoints at /api/health',
    availableEndpoints: [
      'GET /api/health',
      'GET /api/test'
    ]
  });
});

// Start Server
app.listen(PORT, () => {
  console.log('\n🚀 =======================================');
  console.log('🚀    TASKORBIT API SERVER STARTED     🚀');
  console.log('🚀 =======================================');
  console.log(`📍 Server URL: http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
  console.log(`🌐 CORS Origin: ${process.env.FRONTEND_URL}`);
  console.log(`⏰ Started: ${new Date().toLocaleString()}`);
  console.log('\n✅ Available Test Endpoints:');
  console.log(`   - http://localhost:${PORT}/api/health`);
  console.log(`   - http://localhost:${PORT}/api/test`);
  console.log('\n🚀 =======================================');
  console.log('✅ Server ready to accept requests!');
  console.log('🚀 =======================================\n');
});