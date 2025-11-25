import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ProcessController } from './controllers/process.controller';

// Cargar variables de entorno
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 4000;

// Inicializar controlador
const processController = new ProcessController();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'ai-service',
    timestamp: new Date().toISOString(),
  });
});

// Ruta principal
app.get('/', (req, res) => {
  res.json({
    message: 'AVIVA AI Service - Microservicio de Orquestación de IA',
    version: '1.0.0',
    endpoints: {
      health: 'GET /health',
      process: 'POST /process',
    },
  });
});

// Endpoint de procesamiento
app.post('/process', (req, res) => processController.process(req, res));

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🤖 AI Service running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`🎯 Process endpoint: POST http://localhost:${PORT}/process`);
});

export default app;