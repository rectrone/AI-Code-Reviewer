const express = require('express');
const dotenv = require('dotenv');
const AiRoutes = require('./Src/Routes/Ai.Routes');
const router = express.Router();

const app = express();
const PORT = process.env.PORT|| 4000;
dotenv.config();
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
}
);
app.use('/ai', AiRoutes);

app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`);
});
