const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const { setPath, getPath } = require('./db');
const usersRoutes = require('./routes/users');
const bountiesRoutes = require('./routes/bounties');

const app = express();
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', usersRoutes);
app.use('/api/bounties', bountiesRoutes);

app.post('/api/dbpath', (req, res) => {
    const { path } = req.body;
    if (!path) return res.status(400).json({ error: 'Path is required' });
    try {
        setPath(path);
        res.json({ success: true, currentPath: getPath() });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/dbpath', (req, res) => {
    res.json({ currentPath: getPath() });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});