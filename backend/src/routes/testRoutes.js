import express from 'express';
import { testAIConnection } from '../services/groqService.js';

const router = express.Router();

router.get('/gemini', async (req, res) => {
  try {
    const result = await testAIConnection();
    res.json({ success: true, message: result.message, provider: 'Groq' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message, provider: 'Groq' });
  }
});

export default router;
