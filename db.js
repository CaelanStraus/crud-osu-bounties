require('dotenv').config();
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

let db;

let dbPath = process.env.DB_PATH
    ? path.resolve(process.env.DB_PATH)
    : path.resolve(__dirname, '../osu-bounties/database/database.sqlite');

function connect(newPath) {
    if (db) db.close();
    dbPath = path.resolve(newPath);
    db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('Error opening database:', err.message);
        } else {
            console.log(`Connected to SQLite database at ${dbPath}`);
        }
    });
}

connect(dbPath);

module.exports = {
    getDB: () => db,
    setPath: connect,
    getPath: () => dbPath
};
