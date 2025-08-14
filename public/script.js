async function loadUsers() {
    const res = await fetch('/api/users');
    const users = await res.json();
    const tbody = document.querySelector('#usersTable tbody');
    tbody.innerHTML = '';
    users.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${user.id}</td><td>${user.name}</td><td>${user.email}</td>
                        <td><button onclick="deleteUser(${user.id})">Delete</button></td>`;
        tbody.appendChild(tr);
    });
}

async function loadBounties() {
    const res = await fetch('/api/bounties');
    const bounties = await res.json();
    const tbody = document.querySelector('#bountiesTable tbody');
    tbody.innerHTML = '';
    bounties.forEach(b => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${b.id}</td><td>${b.beatmap_title}</td><td>${b.artist}</td><td>${b.reward}</td>
                        <td><button onclick="deleteBounty(${b.id})">Delete</button></td>`;
        tbody.appendChild(tr);
    });
}

document.getElementById('userForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (res.ok) {
        e.target.reset();
        loadUsers();
    }
});

document.getElementById('bountyForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const res = await fetch('/api/bounties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (res.ok) {
        e.target.reset();
        loadBounties();
    }
});

async function deleteUser(id) {
    await fetch(`/api/users/${id}`, { method: 'DELETE' });
    loadUsers();
}

async function deleteBounty(id) {
    await fetch(`/api/bounties/${id}`, { method: 'DELETE' });
    loadBounties();
}

loadUsers();
loadBounties();