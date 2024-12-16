const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { connect } = require('mongoose');
const { PORT, MONGODB_URI } = require('./config');
const { errorHandler } = require('./middleware/errorHandler');
const http = require('http');
const { Server } = require('socket.io');

const authRoutes = require('./routes/auth');
const nluRoutes = require('./routes/nlu');
const ttsRoutes = require('./routes/tts');
const sttRoutes = require('./routes/stt');
const userRoutes = require('./routes/user');
const initSocket = require('./socket');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/auth', authRoutes);
app.use('/nlu', nluRoutes);
app.use('/tts', ttsRoutes);
app.use('/stt', sttRoutes);
app.use('/user', userRoutes);

app.use(errorHandler);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

initSocket(io);

// Connect to MongoDB and start server
connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    server.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
  })
  .catch((err) => console.error(err));