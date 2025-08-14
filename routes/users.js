const express = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../db');

const router = express.Router();

router.get('/', (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

router.get('/:id', (req, res) => {
    db.get('SELECT * FROM users WHERE id = ?', [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'User not found' });
        res.json(row);
    });
});

router.post('/',
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 chars'),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { name, email, password, profile_picture, about_me, dob, usertype } = req.body;
        db.run(
            `INSERT INTO users (name, email, password, profile_picture, about_me, dob, usertype) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [name, email, password, profile_picture, about_me, dob, usertype || 'user'],
            function (err) {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json({ id: this.lastID });
            }
        );
    }
);

router.put('/:id',
    body('email').optional().isEmail().withMessage('Valid email required'),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { name, email, password, profile_picture, about_me, dob, usertype } = req.body;
        db.run(
            `UPDATE users SET name=?, email=?, password=?, profile_picture=?, about_me=?, dob=?, usertype=? WHERE id=?`,
            [name, email, password, profile_picture, about_me, dob, usertype, req.params.id],
            function (err) {
                if (err) return res.status(500).json({ error: err.message });
                if (this.changes === 0) return res.status(404).json({ error: 'User not found' });
                res.json({ updated: true });
            }
        );
    }
);

router.delete('/:id', (req, res) => {
    db.run(`DELETE FROM users WHERE id = ?`, [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'User not found' });
        res.json({ deleted: true });
    });
});

module.exports = router;