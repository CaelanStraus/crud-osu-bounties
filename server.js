const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const usersRoutes = require('./routes/users');
const bountiesRoutes = require('./routes/bounties');

const app = express();
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', usersRoutes);
app.use('/api/bounties', bountiesRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});