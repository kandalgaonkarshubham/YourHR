require("dotenv").config();

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/', require('./routes/root'));
app.use('/jobs', require('./routes/jobs'));
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));

app.listen(PORT, () => {
  console.log(`YourHR Backend Server running on http://localhost:${PORT}`);
});
