const express = require('express');
const app = express();
const cors = require('cors');
// const https = require('https');
// const fs = require('fs');

require('dotenv').config();
const mongoose = require('mongoose');

// const privateKey = fs.readFileSync('/etc/letsencrypt/live/.myschedule.kr/privkey.pem', 'utf8');
// const certificate = fs.readFileSync('/etc/letsencrypt/live/.myschedule.kr/cert.pem', 'utf8');
// const ca = fs.readFileSync('/etc/letsencrypt/live/.myschedule.kr/chain.pem', 'utf8');

// const credentials = {
//    key: privateKey,
//    cert: certificate,
//    ca: ca
// };

// const httpsServer = https.createServer(credentials, app);

app.use(express.json());

mongoose
  .connect(process.env.MongoDBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB is connected...'))
  .catch((error) => console.error('MongoDB connecting ERROR: ', error));

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, world');
});

app.use('/my-schedule/api/user', require('./routes/user'));
app.use('/my-schedule/api/schedule', require('./routes/schedule'));
app.use('/my-schedule/api/calendar', require('./routes/calendar'));
app.use('/my-schedule/api/challenge', require('./routes/challenge'));

// error handler function
app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

app.use('/upload', express.static('upload'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});

// httpsServer.listen('8443', () => {
//   console.log('https server is running at 8443');
// });
