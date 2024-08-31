require("dotenv").config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(express.json());

app.use('/', require('./routes/root'));
app.use('/jobs', require('./routes/jobs'));
app.use('/skills', require('./routes/skills'));
app.use('/depts', require('./routes/depts'));
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/user', require('./routes/user'));
app.use('/upload', require('./routes/upload'));

app.listen(PORT, () => {
  console.log(`YourHR Backend Server running on http://localhost:${PORT}`);
});
