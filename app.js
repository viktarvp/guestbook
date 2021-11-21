require('dotenv').config();
const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const app = express();
const path = require('path');

app.use(express.json({ extended: true }));

app.use('/api', require('./routes/comment.routes'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));
  app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || process.env.APP_PORT || 5000;

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected...');

    app.listen(PORT, () => {
      console.log(`app running on port ${PORT}`);
    });
  } catch (e) {
    console.log('Server error', e.messate);
    process.exit(1);
  }
}

start();
