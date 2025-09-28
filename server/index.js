import express from 'express';
import cors from 'cors';

import LoginController from './src/controllers/LoginController.js';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/login', (req, res) => {
  new LoginController().login(req, res);
});

app.get('/', async (_, res) => {
  res.json({
    message: 'Server is running',
    status: 'OK',
    version: '0.0.0'
  });
});

app.listen(3000);