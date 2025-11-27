// ====== Central Data ======
let requests = [];
let concerns = [];
let announcements = [];

// ====== Load from localStorage ======
if (localStorage.getItem('requests')) {
  requests = JSON.parse(localStorage.getItem('requests'));
}
if (localStorage.getItem('concerns')) {
  concerns = JSON.parse(localStorage.getItem('concerns'));
}
if (localStorage.getItem('announcements')) {
  announcements = JSON.parse(localStorage.getItem('announcements'));
}

// ====== HELPER FUNCTIONS ======

// ----- Requests -----
function addRequest(name, type) {
  requests.push({ id: requests.length + 1, name, type, status: "Pending" });
  localStorage.setItem('requests', JSON.stringify(requests));
  renderRequestsTable();
}

function renderRequestsTable() {
  const container = document.getElementById('requests-table');
  if (!container) return;
  container.innerHTML = '';
  requests.forEach(r => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${r.id}</td>
      <td>${r.name}</td>
      <td>${r.type}</td>
      <td>${r.status}</td>
      <td>
        <button class="action resolve" onclick="resolveRequest(${r.id})">Resolve</button>
        <button class="action delete" onclick="deleteRequest(${r.id})">Delete</button>
      </td>
    `;
    container.appendChild(row);
  });
}

function resolveRequest(id) {
  const req = requests.find(r => r.id === id);
  if (req) {
    req.status = "Resolved";
    localStorage.setItem('requests', JSON.stringify(requests));
    renderRequestsTable();
  }
}

function deleteRequest(id) {
  requests = requests.filter(r => r.id !== id);
  localStorage.setItem('requests', JSON.stringify(requests));
  renderRequestsTable();
}

// ----- Concerns -----
function addConcern(name, issue) {
  concerns.push({ id: concerns.length + 1, name, issue, status: "Pending" });
  localStorage.setItem('concerns', JSON.stringify(concerns));
  renderConcernsTable();
  renderUserConcerns();
}

function renderConcernsTable() {
  const container = document.getElementById('concerns-table');
  if (!container) return;
  container.innerHTML = '';
  concerns.forEach(c => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${c.id}</td>
      <td>${c.name}</td>
      <td>${c.issue}</td>
      <td>${c.status}</td>
      <td>
        <button class="action resolve" onclick="resolveConcern(${c.id})">Resolve</button>
        <button class="action delete" onclick="deleteConcern(${c.id})">Delete</button>
      </td>
    `;
    container.appendChild(row);
  });
}

function resolveConcern(id) {
  const c = concerns.find(c => c.id === id);
  if (c) {
    c.status = "Resolved";
    localStorage.setItem('concerns', JSON.stringify(concerns));
    renderConcernsTable();
    renderUserConcerns();
  }
}

function deleteConcern(id) {
  concerns = concerns.filter(c => c.id !== id);
  localStorage.setItem('concerns', JSON.stringify(concerns));
  renderConcernsTable();
  renderUserConcerns();
}

function renderUserConcerns() {
  const container = document.getElementById('user-concerns');
  if (!container) return;
  container.innerHTML = '';
  concerns.forEach(c => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<strong>${c.name}</strong><p>${c.issue}</p><small>Status: ${c.status}</small>`;
    container.appendChild(div);
  });
}

// ----- Announcements -----
function addAnnouncement(title, content) {
  announcements.push({ title, content });
  localStorage.setItem('announcements', JSON.stringify(announcements));
  renderAdminAnnouncements();
  renderAnnouncements();
}

function renderAdminAnnouncements() {
  const container = document.getElementById('announcements-list');
  if (!container) return;
  container.innerHTML = '';
  announcements.forEach((a, index) => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <h3>${a.title}</h3>
      <p>${a.content}</p>
      <button class="action delete" onclick="deleteAnnouncement(${index})">Delete</button>
    `;
    container.appendChild(div);
  });
}

function deleteAnnouncement(index) {
  announcements.splice(index, 1);
  localStorage.setItem('announcements', JSON.stringify(announcements));
  renderAdminAnnouncements();
  renderAnnouncements();
}

function renderAnnouncements() {
  const container = document.getElementById('announcements');
  if (!container) return;
  container.innerHTML = '';
  announcements.forEach(a => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<h3>${a.title}</h3><p>${a.content}</p>`;
    container.appendChild(div);
  });
}

// ----- Admin Dashboard Summary -----
function renderAdminDashboard() {
  const totalRequests = document.getElementById('total-requests');
  const totalConcerns = document.getElementById('total-concerns');
  const totalAnnouncements = document.getElementById('total-announcements');

  if(totalRequests) totalRequests.textContent = requests.length;
  if(totalConcerns) totalConcerns.textContent = concerns.length;
  if(totalAnnouncements) totalAnnouncements.textContent = announcements.length;
}

// ====== Initialize all on page load ======
document.addEventListener('DOMContentLoaded', () => {
  renderRequestsTable();
  renderConcernsTable();
  renderUserConcerns();
  renderAdminAnnouncements();
  renderAnnouncements();
  renderAdminDashboard();
});
