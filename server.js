const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
require('dotenv').config();
const path = require('path'); 

const app = express();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173'
}));

app.use('/api/ask', require('./askLLM'));

if (process.env.NODE_ENV === 'production') {
  // resolve to /opt/render/project/client/build
  const clientBuildPath = path.resolve(__dirname, 'client', 'build');

  app.use(express.static(clientBuildPath));

  app.get(/.*/, (req, res) => {
      res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server started on port: ${PORT}`));