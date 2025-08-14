const express = require('express');
const { body, validationResult } = require('express-validator');
const dbModule = require('../db');
const db = dbModule.getDB();
const router = express.Router();

router.get('/', (req, res) => {
    db.all('SELECT * FROM osu_bounties', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

router.get('/:id', (req, res) => {
    db.get('SELECT * FROM osu_bounties WHERE id = ?', [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Bounty not found' });
        res.json(row);
    });
});

router.post('/',
    body('beatmap_title').notEmpty().withMessage('Beatmap title is required'),
    body('beatmap_url').isURL().withMessage('Valid URL required'),
    body('artist').notEmpty().withMessage('Artist is required'),
    body('difficulty').notEmpty().withMessage('Difficulty is required'),
    body('reward').notEmpty().withMessage('Reward is required'),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const {
            beatmap_title, beatmap_url, artist, difficulty, required_mods,
            beatmap_image, description, donators, reward, completed,
            completed_by, completed_at
        } = req.body;

        db.run(
            `INSERT INTO osu_bounties 
            (beatmap_title, beatmap_url, artist, difficulty, required_mods, beatmap_image, description, donators, reward, completed, completed_by, completed_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                beatmap_title, beatmap_url, artist, difficulty, required_mods || 'NM',
                beatmap_image, description, donators || 'Anonymous', reward,
                completed || 0, completed_by, completed_at
            ],
            function (err) {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json({ id: this.lastID });
            }
        );
    }
);

router.put('/:id',
    body('beatmap_url').optional().isURL().withMessage('Valid URL required'),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const {
            beatmap_title, beatmap_url, artist, difficulty, required_mods,
            beatmap_image, description, donators, reward, completed,
            completed_by, completed_at
        } = req.body;

        db.run(
            `UPDATE osu_bounties SET beatmap_title=?, beatmap_url=?, artist=?, difficulty=?, required_mods=?, beatmap_image=?, description=?, donators=?, reward=?, completed=?, completed_by=?, completed_at=? WHERE id=?`,
            [
                beatmap_title, beatmap_url, artist, difficulty, required_mods,
                beatmap_image, description, donators, reward, completed,
                completed_by, completed_at, req.params.id
            ],
            function (err) {
                if (err) return res.status(500).json({ error: err.message });
                if (this.changes === 0) return res.status(404).json({ error: 'Bounty not found' });
                res.json({ updated: true });
            }
        );
    }
);

router.delete('/:id', (req, res) => {
    db.run(`DELETE FROM osu_bounties WHERE id = ?`, [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Bounty not found' });
        res.json({ deleted: true });
    });
});

module.exports = router;
