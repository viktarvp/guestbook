const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

app.use(express.json({ extended: true }));

app.use('/api', require('./routes/comment.routes'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'front_end', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'front_end', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || config.get('port') || 5000;

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

// const bodyParser = require('body-parser');

// // IMPORT MODELS
// require('./models/Comment');

// app.use(bodyParser.json());

// //IMPORT ROUTES
// require('./routes/commentRoutes')(app);

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('../frontend/build'));

//   const path = require('path');
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }
