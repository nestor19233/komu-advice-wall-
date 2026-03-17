// ===========================
// ADVICE DATA
// ===========================
const initialAdvice = [
  {
    name: "Chukwuemeka A.",
    year: "Final Year / Alumni",
    dept: "Computer Science",
    cat: "Exams",
    likes: 34,
    liked: false,
    img: null,
    text: "Start reading from the first week of the semester. Cramming the night before rarely works — lecturers test deep understanding, not surface memorisation. Create a timetable, stick to it and never miss a class."
  },
  {
    name: "Adaeze N.",
    year: "400 Level",
    dept: "Biochemistry",
    cat: "Study Tips",
    likes: 28,
    liked: false,
    img: null,
    text: "Form a serious study group of 3-5 people from your first semester. Explaining topics to others is the fastest way to truly understand them. Choose people who actually want to study, not just gist."
  },
  {
    name: "Emeka O.",
    year: "Alumni",
    dept: "Business Administration",
    cat: "Career",
    likes: 41,
    liked: false,
    img: null,
    text: "Start building your CV from 100 level. Volunteer, join clubs, attend conferences. By final year you will have real experience for job interviews. Grades alone will not get you far in today's world."
  },
  {
    name: "Blessing I.",
    year: "300 Level",
    dept: "Law",
    cat: "Money",
    likes: 22,
    liked: false,
    img: null,
    text: "Budget your allowance from day one. Many students hit financial crisis by second semester. Track every naira — it adds up faster than you think. Cook your own food when you can, it saves so much."
  },
  {
    name: "Uche M.",
    year: "Alumni",
    dept: "Engineering",
    cat: "Social Life",
    likes: 19,
    liked: false,
    img: null,
    text: "Be careful of who you spend your time with. Your circle will either push you to excel or pull you into distraction. Choose people who are going somewhere. Bad company ruins good character."
  },
  {
    name: "Anonymous",
    year: "Final Year",
    dept: "Mass Communication",
    cat: "General",
    likes: 37,
    liked: false,
    img: null,
    text: "Visit the library regularly, not just during exams. KOMU library has resources most students never use. Those who use it consistently always perform better. Make it a weekly habit from your first month."
  },
  {
    name: "Ngozi A.",
    year: "Alumni",
    dept: "Microbiology",
    cat: "Exams",
    likes: 25,
    liked: false,
    img: null,
    text: "Collect past questions for every course from your first week. Pattern recognition from past questions is one of the most powerful exam preparation strategies. Most questions repeat with slight variations."
  },
  {
    name: "Fidelis K.",
    year: "400 Level",
    dept: "Computer Science",
    cat: "Career",
    likes: 30,
    liked: false,
    img: null,
    text: "As a CS student — learn to code beyond the classroom. Build real projects on GitHub, learn web development or mobile apps. Your portfolio will speak louder than your grades at any tech interview."
  }
];

// ===========================
// VARIABLES
// ===========================
let allAdvice = [...initialAdvice];
let currentFilter = 'all';
let activeModalIdx = null;
let uploadedImage = null;

// ===========================
// HELPER — GET CATEGORY CLASS
// ===========================
function catClass(cat) {
  const map = {
    'Exams':      'cat-exams',
    'Career':     'cat-career',
    'Social Life':'cat-social',
    'Money':      'cat-money',
    'Study Tips': 'cat-study',
    'General':    'cat-general'
  };
  return map[cat] || 'cat-general';
}

// ===========================
// BUILD ONE CARD HTML
// ===========================
function createCard(item, idx) {
  const imgHtml = item.img
    ? `<img class="card-img" src="${item.img}" alt="Photo" />`
    : `<div class="card-img-placeholder">🎓</div>`;

  return `
    <div class="advice-card" onclick="openModal(${idx})">
      ${imgHtml}
      <div class="card-body">
        <span class="card-cat ${catClass(item.cat)}">${item.cat}</span>
        <p class="card-text">${item.text}</p>
        <span class="read-more">👆 Tap to read full advice</span>
        <div class="card-footer">
          <div class="card-author">
            <span>${item.name}</span>
            ${item.year}
          </div>
          <button
            class="like-btn ${item.liked ? 'liked' : ''}"
            onclick="event.stopPropagation(); toggleLike(${idx})">
            ${item.liked ? '❤️' : '🤍'} ${item.likes}
          </button>
        </div>
      </div>
    </div>`;
}

// ===========================
// RENDER WALL PAGE
// ===========================
function renderAll() {
  const grid  = document.getElementById('all-cards');
  const empty = document.getElementById('empty-state');

  const list = currentFilter === 'all'
    ? allAdvice
    : allAdvice.filter(a => a.cat === currentFilter);

  if (list.length === 0) {
    grid.innerHTML = '';
    empty.style.display = 'block';
    return;
  }

  empty.style.display = 'none';
  grid.innerHTML = list
    .map(item => createCard(item, allAdvice.indexOf(item)))
    .join('');
}

// ===========================
// RENDER HOME PAGE
// ===========================
function renderHome() {
  const top = [...allAdvice]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 3);

  document.getElementById('home-cards').innerHTML = top
    .map(item => createCard(item, allAdvice.indexOf(item)))
    .join('');

  document.getElementById('total-count').textContent = allAdvice.length;
}

// ===========================
// FILTER BY CATEGORY
// ===========================
function filterCards(cat, btn) {
  currentFilter = cat;
  document.querySelectorAll('.cat-pill')
    .forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  renderAll();
}

// ===========================
// LIKE A CARD
// ===========================
function toggleLike(idx) {
  allAdvice[idx].liked = !allAdvice[idx].liked;
  allAdvice[idx].likes += allAdvice[idx].liked ? 1 : -1;
  renderAll();
  renderHome();
}

// ===========================
// OPEN MODAL
// ===========================
function openModal(idx) {
  activeModalIdx = idx;
  const item = allAdvice[idx];

  document.getElementById('modal-img-area').innerHTML = item.img
    ? `<img class="modal-img" src="${item.img}" alt="Photo" />`
    : `<div class="modal-img-placeholder">🎓</div>`;

  const catEl = document.getElementById('modal-cat');
  catEl.className = `modal-cat ${catClass(item.cat)}`;
  catEl.textContent = item.cat;

  document.getElementById('modal-text').textContent = item.text;
  document.getElementById('modal-author').innerHTML =
    `<span>${item.name}</span>${item.year} · ${item.dept}`;

  updateModalLikeBtn();
  document.getElementById('modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function updateModalLikeBtn() {
  if (activeModalIdx === null) return;
  const item = allAdvice[activeModalIdx];
  const btn  = document.getElementById('modal-like-btn');
  btn.className = `like-btn ${item.liked ? 'liked' : ''}`;
  btn.innerHTML = `${item.liked ? '❤️' : '🤍'} ${item.likes}`;
}

function modalLike() {
  if (activeModalIdx === null) return;
  toggleLike(activeModalIdx);
  updateModalLikeBtn();
}

function closeModalOutside(e) {
  if (e.target === document.getElementById('modal-overlay')) closeModalDirect();
}

function closeModalDirect() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
  activeModalIdx = null;
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModalDirect();
});

// ===========================
// IMAGE UPLOAD
// ===========================
function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    showToast('❌ Please select an image file.');
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    showToast('❌ Image too large. Max 5MB.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    uploadedImage = e.target.result;
    document.getElementById('upload-preview').src = uploadedImage;
    document.getElementById('upload-preview').classList.add('show');
    document.getElementById('upload-placeholder').style.display = 'none';
    document.getElementById('upload-change').classList.add('show');
    document.getElementById('upload-box').classList.add('has-image');
    showToast('📸 Photo selected! Looking good!');
  };
  reader.readAsDataURL(file);
}

// ===========================
// SUBMIT ADVICE
// ===========================
function submitAdvice() {
  const name = document.getElementById('input-name').value.trim() || 'Anonymous';
  const year = document.getElementById('input-year').value.trim() || 'KOMU Student';
  const dept = document.getElementById('input-dept').value.trim() || 'KOMU';
  const cat  = document.getElementById('input-cat').value;
  const text = document.getElementById('input-advice').value.trim();

  if (!cat) { showToast('⚠️ Please select a category.'); return; }
  if (text.length < 20) { showToast('⚠️ Please write at least 20 characters.'); return; }

  allAdvice.unshift({ name, year, dept, cat, likes: 0, liked: false, img: uploadedImage, text });

  renderAll();
  renderHome();

  document.getElementById('input-name').value   = '';
  document.getElementById('input-year').value   = '';
  document.getElementById('input-dept').value   = '';
  document.getElementById('input-advice').value = '';
  document.getElementById('input-cat').value    = '';
  document.getElementById('image-input').value  = '';
  document.getElementById('upload-preview').src = '';
  document.getElementById('upload-preview').classList.remove('show');
  document.getElementById('upload-placeholder').style.display = 'block';
  document.getElementById('upload-change').classList.remove('show');
  document.getElementById('upload-box').classList.remove('has-image');
  uploadedImage = null;

  showToast('✅ Your advice is now on the wall!');
  setTimeout(() => showPage('wall'), 1200);
}

// ===========================
// TOAST
// ===========================
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3200);
}

// ===========================
// PAGE NAVIGATION
// ===========================
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById('nav-' + name);
  if (btn) btn.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (name === 'wall') renderAll();
  if (name === 'home') renderHome();
}

// ===========================
// MOBILE NAV
// ===========================
function toggleMobileNav() {
  document.getElementById('mobile-nav').classList.toggle('open');
}

function closeMobileNav() {
  document.getElementById('mobile-nav').classList.remove('open');
}

// ===========================
// START
// ===========================
renderHome();
renderAll();
