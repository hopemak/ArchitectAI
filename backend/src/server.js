import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import net from 'net';
import { connectDB } from './config/database.js';
import { errorHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import testRoutes from './routes/testRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use(helmet());
app.use(cors({ origin: '*', credentials: true }));
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/test', testRoutes);

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'ArchitectAI API is running' });
});

app.use(errorHandler);

// Find free port
function findFreePort(startPort) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.listen(startPort, () => {
      const port = server.address().port;
      server.close(() => resolve(port));
    });
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        findFreePort(startPort + 1).then(resolve).catch(reject);
      } else {
        reject(err);
      }
    });
  });
}

const startPort = parseInt(process.env.PORT) || 3000;

findFreePort(startPort).then(port => {
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
    console.log(`📚 Health check: http://localhost:${port}/api/health`);
    console.log(`🔑 Gemini test: http://localhost:${port}/api/test/gemini`);
    
    // Save actual port to file for frontend to read
    import('fs').then(fs => {
      fs.writeFileSync('.port', String(port));
    });
  });
});
