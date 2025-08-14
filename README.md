# CRUD OSU Bounties Web App

A Node.js + Express web application for managing **users** and **osu! bounties** stored in an SQLite database.  
The app includes:
- REST API endpoints for CRUD operations
- A simple browser-based admin panel
- Ability to **change the database file path** at runtime from the UI
- Basic input validation

---

## 📂 Project Structure
```
crud-osu-bounties/
│── server.js              # Main Express server
│── db.js                  # SQLite connection handler (dynamic path)
│── routes/
│   ├── users.js           # CRUD for users table
│   ├── bounties.js        # CRUD for osu_bounties table
│── public/
│   ├── index.html         # Frontend UI
│   ├── script.js          # Frontend JavaScript
│   ├── style.css          # Frontend styles
│── package.json           # Node.js dependencies
└── README.md              # This file
```

---

## 🚀 Features
- **Users CRUD**: Add, view, update, delete users
- **Bounties CRUD**: Add, view, update, delete osu! bounties
- **Web Interface**: Manage data directly from your browser
- **Basic Validation**: Email format, required fields, password length, etc.
---
## 🛠️ Prerequisites
- **Node.js** (v20+ recommended)
- **npm** (comes with Node.js)
- osu-bounties SQLite database file (default path: `../osu-bounties/database/database.sqlite`)
---
## 📦 Installation
1. Clone or download this repository.
2. Navigate into the folder that contains the laravel project 'osu-bounties':
   ```
   cd crud-osu-bounties
   ```
3. Install dependencies:
   ```
   npm install
   ```
---
## ▶️ Running the App
Start the Express server:
```
node server.js
```
Open in your browser:
```
http://localhost:3000
```
---
## 🌐 API Endpoints

### **Users**
| Method | Endpoint         | Description           |
|--------|-----------------|-----------------------|
| GET    | `/api/users`     | Get all users         |
| GET    | `/api/users/:id` | Get user by ID        |
| POST   | `/api/users`     | Create a new user     |
| PUT    | `/api/users/:id` | Update existing user  |
| DELETE | `/api/users/:id` | Delete user           |

### **Bounties**
| Method | Endpoint            | Description           |
|--------|--------------------|-----------------------|
| GET    | `/api/bounties`     | Get all bounties      |
| GET    | `/api/bounties/:id` | Get bounty by ID      |
| POST   | `/api/bounties`     | Create new bounty     |
| PUT    | `/api/bounties/:id` | Update existing bounty|
| DELETE | `/api/bounties/:id` | Delete bounty         |
---
## 💻 Using the Web App
1. **Users Section**: Add a new user via the form, or delete existing ones.
2. **Bounties Section**: Add a new bounty or delete existing ones.
3. All changes are immediately saved to the SQLite database.
