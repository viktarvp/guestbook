const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

app.use(express.json({ extended: true }));

app.use('/api', require('./routes/comment.routes'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));
  app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || process.env.APP_PORT;

async function start() {
  try {
    await mongoose.connect(process.env.APP_DB, {
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
