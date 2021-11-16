const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({ extended: true }));

app.use('/api', require('./routes/comment.routes'));

const PORT = config.port || 5000;

async function start() {
  try {
    await mongoose.connect(config.mongoUri, {
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
