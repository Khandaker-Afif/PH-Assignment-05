// Data for the cards
const services = [
 { id: 's1', name: 'National Emergency Number', en: 'National Emergency', number: '999', category: 'All', icon: './assets/emergency.png' },
 { id: 's2', name: 'Police Helpline Number', en: 'Police', number: '999', category: 'Police', icon: './assets/police.png' },
 { id: 's3', name: 'Fire Service Number', en: 'Fire Service', number: '999', category: 'Fire', icon: './assets/fire-service.png' },
 { id: 's4', name: 'Ambulance Service', en: 'Ambulance', number: '1994-999999', category: 'Health', icon: './assets/ambulance.png' },
 { id: 's5', name: 'Women & Child Helpline', en: 'Women & Child Helpline', number: '109', category: 'Help', icon: './assets/emergency.png' },
 { id: 's6', name: 'Anti-Corruption Helpline', en: 'Anti-Corruption', number: '106', category: 'Govt.', icon: './assets/emergency.png' },
 { id: 's7', name: 'Electricity Helpline', en: 'Electricity Outage', number: '16216', category: 'Electricity', icon: './assets/emergency.png' },
 { id: 's8', name: 'Brac Helpline', en: 'Brac', number: '16445', category: 'NGO', icon: './assets/brac.png' },
 { id: 's9', name: 'Bangladesh Railway Helpline', en: 'Bangladesh Railway', number: '163', category: 'Travel', icon: './assets/Bangladesh-Railway.png' },
];

// Local state (persist to localStorage)
const STORAGE_KEY = 'esd_app_state_v1';
const defaultState = { hearts: 0, coins: 100, copies: 0, history: [] };

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { ...defaultState };
  } catch {
    return { ...defaultState };
  }
}
function saveState(s) { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); }

let state = loadState();

// DOM refs
const cardsArea = document.getElementById('cardsArea');
const heartCountEl = document.getElementById('heartCount');
const coinCountEl = document.getElementById('coinCount');
const copyCountEl = document.getElementById('copyCount');
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

// tiny inline SVG helpers
const svgHeart = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M20.8 6.6a5.5 5.5 0 0 0-7.78-.18L12 7.5l-1.02-1.02a5.5 5.5 0 0 0-7.78.18 5.5 5.5 0 0 0 .02 7.78L12 21l9.78-6.56a5.5 5.5 0 0 0 .02-7.84z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const svgCopy = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="9" y="9" width="9" height="11" rx="2" stroke="currentColor" stroke-width="1.2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const svgPhone = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M22 16.92V20a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.18 2 2 0 0 1 4 2h3.09a1 1 0 0 1 1 .75c.12.83.33 1.6.62 2.33a1 1 0 0 1-.24 1l-1.27 1.27a16 16 0 0 0 6 6l1.27-1.27a1 1 0 0 1 1-.24c.73.29 1.5.5 2.33.62a1 1 0 0 1 .75 1V20z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

// render cards
function renderCards() {
  cardsArea.innerHTML = '';
  services.forEach(svc => {
    const card = document.createElement('article');
    card.className = 'card';
    card.dataset.id = svc.id;

    // build markup: icon, absolute favorite, title, subtitle, phone, badge, bottom buttons
    card.innerHTML = `
      <div class="top">
        <div class="icon-box">
          <img src="${svc.icon}" alt="${svc.name} icon" onerror="this.style.opacity=0.6;"/>
        </div>
      </div>

      <button class="favorite" data-action="fav" aria-label="Favorite" title="Favorite">
        ${svgHeart}
      </button>

      <div class="title">${svc.name}</div>
      <div class="subtitle">${svc.en}</div>

      <div class="phone">${svc.number}</div>
      <span class="badge">${svc.category}</span>

      <div class="bottom-buttons-row" role="group" aria-label="${svc.name} actions">
        <button class="btn copy" data-action="copy" data-number="${svc.number}" title="Copy number">
          ${svgCopy}<span>Copy</span>
        </button>
        <button class="btn call" data-action="call" data-id="${svc.id}" data-number="${svc.number}" title="Call number">
          ${svgPhone}<span>Call</span>
        </button>
      </div>
    `;
    cardsArea.appendChild(card);
  });
}

// UI updates
function updateSummaryUI() {
  heartCountEl.textContent = state.hearts;
  coinCountEl.textContent = state.coins;
  copyCountEl.textContent = state.copies;
}

function renderHistory() {
  historyList.innerHTML = '';
  if (!state.history || state.history.length === 0) {
    historyList.innerHTML = '<div class="empty">No calls yet</div>';
    return;
  }
  state.history.slice().reverse().forEach(entry => {
    const item = document.createElement('div');
    item.className = 'history-item';
    item.innerHTML = `
      <div class="meta">
        <div class="service">${entry.name}</div>
        <div class="number">${entry.number}</div>
      </div>
      <div class="time">${entry.time}</div>
    `;
    historyList.appendChild(item);
  });
}

// helpers
function getLocalTimeString() {
  return new Date().toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  });
}

// Actions
function handleFav() {
  state.hearts = Number(state.hearts) + 1;
  saveState(state);
  updateSummaryUI();
}

async function handleCopy(number) {
  try {
    await navigator.clipboard.writeText(number);
    alert(`Copied ${number} to clipboard`);
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = number;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert(`Copied ${number} to clipboard`);
  }
  state.copies = Number(state.copies) + 1;
  saveState(state);
  updateSummaryUI();
}

function handleCall(serviceId, number) {
  const COST = 20;
  if (Number(state.coins) < COST) {
    alert('Not enough coins. Each call costs 20 coins.');
    return;
  }

  const svc = services.find(s => s.id === serviceId) || { name: 'Unknown Service' };
  alert(`Calling ${svc.name} - ${number}`);

  state.coins = Number(state.coins) - COST;
  state.history.push({
    name: svc.name,
    number,
    time: getLocalTimeString()
  });

  saveState(state);
  updateSummaryUI();
  renderHistory();
}

// event delegation for cards (works if click happens on SVG or text)
cardsArea.addEventListener('click', (ev) => {
  const btn = ev.target.closest('button');
  if (!btn || !cardsArea.contains(btn)) return;
  const action = btn.dataset.action;
  if (!action) return;

  if (action === 'fav') { handleFav(); return; }
  if (action === 'copy') { const number = btn.dataset.number; handleCopy(number); return; }
  if (action === 'call') { const serviceId = btn.dataset.id; const number = btn.dataset.number; handleCall(serviceId, number); return; }
});

// clear history
clearHistoryBtn.addEventListener('click', () => {
  if (!state.history || state.history.length === 0) { alert('History is already empty.'); return; }
  if (!confirm('Clear all call history?')) return;
  state.history = [];
  saveState(state);
  renderHistory();
});

// initial render
renderCards();
updateSummaryUI();
renderHistory();
