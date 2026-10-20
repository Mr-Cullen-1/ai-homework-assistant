import { topics, newSession, getProgress, getDemoReward } from './mock-data.js';
import { validateFile, validateAnswer } from './logic.js';

const root = document.querySelector('#app');
const STORAGE_KEY = 'junior-ai-yordamchi-prototype-v1';
const samplePreview = './assets/sample-homework.svg';
const countingPreview = './assets/sample-counting.svg';
const uploadScenarios = [
  ['success', 'Oddiy tahlil'], ['low', 'Noaniq tahlil'], ['empty', 'Misol topilmadi'],
  ['unreadable', 'Xira rasm'], ['processingFail', 'Tahlil xatosi'], ['uploadFail', 'Yuklash xatosi']
];
const clone = value => JSON.parse(JSON.stringify(value));
const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, match => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[match]);
const topic = () => topics[state.session?.topicId || 'arithmetic'];
const taskData = () => topic().exercises.find(task => task.id === state.session.currentTaskId) || topic().exercises[0];
const taskState = () => state.session.tasks[taskData().id];
const formatSize = bytes => bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
const labelForStatus = status => ({ correct: 'Yechildi', incorrect: 'Qayta urining', skipped: 'Keyinga qoldi', needs_help: 'Yordam olindi', in_progress: 'Yechilmoqda', ready: 'Tayyor', not_started: 'Yechilmagan' })[status] || 'Yechilmagan';

function restore() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (stored && typeof stored.view === 'string') {
      if (stored.session?.file?.kind === 'user') {
        stored.session.file.previewUrl = null;
        stored.session.file.needsReselect = true;
      }
      return { ...stored, modal: null, toast: '', chatDraft: '', savedSession: stored.savedSession || null };
    }
  } catch { /* A corrupt browser cache should not block the demo. */ }
  return { view: 'course', history: [], session: null, modal: null, toast: '', chatDraft: '', savedSession: null };
}

let state = restore();
let toastTimer;
function persist() {
  const saved = clone({ view: state.view, history: state.history, session: state.session, savedSession: state.savedSession });
  if (saved.session?.file?.kind === 'user') saved.session.file.previewUrl = null;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
}
function update() { persist(); render(); }
function showToast(message) {
  state.toast = message; render();
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { state.toast = ''; render(); }, 3700);
}
function navigate(view, { replace = false } = {}) {
  if (!replace && state.view !== view) state.history.push(state.view);
  state.view = view;
  state.modal = null;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  update();
}
function back() {
  state.view = state.history.pop() || 'course';
  state.modal = null;
  update();
}
function startSession(topicId = 'arithmetic', scenario = 'success') {
  if (state.session) state.savedSession = clone(state.session);
  state.session = newSession(topicId, scenario);
  state.history = ['course'];
  navigate('upload', { replace: true });
}
function openDemoModal(title, body) { state.modal = { title, body }; render(); }
function activeStep() {
  return ({ upload: 0, analysis: 1, lesson: 2, guided: 3, practice: 3, result: 3, topics: 2 })[state.view] ?? -1;
}

function header() {
  const reward = getDemoReward(state.session);
  return `<header class="site-header"><div class="header-inner">
    <button class="brand" data-action="home" aria-label="Junior Academy demo bosh sahifasi"><span class="brand-crop" aria-hidden="true"></span><span class="brand-fallback">junior<small>academy</small></span></button>
    <nav class="header-links" aria-label="Platforma havolalari"><button data-action="header-schedule">Dars jadvali</button><button data-action="header-coins">Coin tarixi</button></nav>
    <div class="header-stats"><button class="stat-chip" data-action="header-energy" title="Demo energiya">⚡ <strong>Demo</strong></button><button class="stat-chip" data-action="header-coins" title="Ushbu prototipdagi demo coinlar">🪙 <strong>${reward.coins} demo coin</strong></button><button class="icon-chip" data-action="header-notify" aria-label="Bildirishnomalar">♧<i></i></button><button class="icon-chip" data-action="header-profile" aria-label="Profil">♙</button></div>
  </div></header>`;
}
function stepper() {
  const labels = ['Yuklash', 'Tahlil', 'Mini dars', 'Yechish'];
  const step = activeStep();
  return `<div class="subnav"><button class="back-link" data-action="back">← <span>Ortga</span></button><nav class="stepper" aria-label="Jarayon bosqichlari">${labels.map((label, index) => `<button class="step ${index === step ? 'active' : ''} ${index < step ? 'done' : ''}" data-action="step" data-index="${index}" ${index === step ? 'aria-current="step"' : ''}>${index + 1}. ${label}</button>`).join('<span class="step-arrow">›</span>')}</nav></div>`;
}
function mascot(className = '') { return `<div class="mascot ${className}" role="img" aria-label="Junior Academy robot yordamchisi"></div>`; }
function pill(text, tone = 'blue') { return `<span class="pill ${tone}">${escapeHtml(text)}</span>`; }
function apple(count) { return `<span class="apples" aria-label="${count} ta olma">${'🍎'.repeat(count)}</span>`; }
function equation(item, answer = '?') { return `${item.a} ${item.symbol} ${item.b} = ${answer}`; }
function visualEquation(item) {
  const left = item.a ?? item.left, right = item.b ?? item.right, result = item.answer ?? item.result;
  return `<div class="visual-equation"><div>${apple(left)}<small>${left} ta olma</small></div><b>${item.symbol}</b><div>${apple(right)}<small>${right} ta olma</small></div><b>=</b><div>${apple(result)}<small>${result} ta olma</small></div></div>`;
}
function progressCard() {
  const { completed, total, percent } = getProgress(state.session);
  const reward = getDemoReward(state.session);
  return `<section class="card rail-card"><h3>Sizning progressingiz</h3><div class="progress-row"><div class="progress-ring" style="--progress:${percent}%"><span>${percent}%</span></div><div><span class="muted">Bajarilgan mashqlar</span><strong class="big-count">${completed} / ${total}</strong></div></div><div class="rail-reward">⭐ <span>Ushbu demo vazifada <strong>+${reward.coins} coin · +${reward.xp} XP</strong></span></div><p class="fine-print">Demo mukofotlar. LMS balansiga qo‘shilmaydi.</p></section>`;
}
function chatCard() {
  const chat = state.session?.chat || [];
  return `<section class="card rail-card chat-card"><div class="chat-heading">${mascot('mascot-tiny')}<div><h3>Savolingiz bormi?</h3><p>Joriy mavzu haqida so‘rang. Javoblar oldindan yozilgan demo.</p></div></div>
  <div class="chat-messages" aria-live="polite">${chat.length ? chat.slice(-3).map(message => `<div class="chat-message ${message.from}">${escapeHtml(message.text)}${message.error ? ' <button data-action="chat-retry">Qayta urinish</button>' : ''}</div>`).join('') : '<div class="chat-empty">Masalan: “Qanday sanayman?”</div>'}</div>
  <form id="chat-form" class="chat-form"><input id="chat-input" name="question" maxlength="120" placeholder="Savolingizni yozing..." value="${escapeHtml(state.chatDraft)}" aria-label="Savol yozing" /><button type="submit" aria-label="Savolni yuborish">➤</button></form></section>`;
}
function taskList() {
  return `<section class="card rail-card"><h3>Ushbu mavzudagi misollar</h3><div class="rail-task-list">${topic().exercises.map((item, index) => {
    const status = state.session.tasks[item.id].status;
    return `<button class="rail-task ${item.id === state.session.currentTaskId ? 'selected' : ''}" data-action="select-task" data-id="${item.id}"><span class="number-dot">${index + 1}</span><span>${item.a} ${item.symbol} ${item.b}</span><em class="status ${status}">${labelForStatus(status)}</em></button>`;
  }).join('')}</div></section>`;
}
function sidebar(kind = 'progress') {
  if (kind === 'upload') return `<aside class="sidebar"><section class="card rail-card"><h3>Qanday yordam beradi?</h3><ol class="help-steps"><li><b>Mavzuni aniqlaydi</b><small>Tanlangan namuna asosida demo natija.</small></li><li><b>Tegishli darsni ko‘rsatadi</b><small>Sodda va qisqa mini dars.</small></li><li><b>O‘zi yechishga urinadi</b><small>Avval o‘zingiz javob yozasiz.</small></li><li><b>Qadam-baqadam yordam</b><small>Maslahat va izohlarni oching.</small></li></ol></section><section class="card robot-note">${mascot('mascot-small')}<div><b>Masalani o‘zing yechib ko‘r!</b><p>Men har doim yoningdaman 💛</p></div></section><section class="card rail-card"><h3>Demo holatini tanlang</h3><p class="muted small">Xatolik va noaniqlik holatlarini ko‘rish uchun.</p><div class="scenario-list">${uploadScenarios.map(([key, label]) => `<button class="scenario ${state.session.scenario === key ? 'active' : ''}" data-action="scenario" data-value="${key}">${label}</button>`).join('')}</div></section></aside>`;
  const daily = kind === 'result' ? `<section class="card rail-card"><h3>Bugungi demo natijalar</h3><p>✅ To‘g‘ri javoblar: ${getProgress(state.session).completed}</p><p>🔁 Qayta urinishlar: ${Object.values(state.session.tasks).reduce((sum, task) => sum + Math.max(0, task.attempts - 1), 0)}</p></section>` : '';
  return `<aside class="sidebar">${progressCard()}${kind === 'lesson' ? lessonProgress() : kind === 'practice' || kind === 'guided' ? taskList() : ''}${daily}${chatCard()}</aside>`;
}
function lessonProgress() {
  const tabs = ['Mavzuni tushunish', 'Misollar bilan ko‘rish', 'Qadam-baqadam yechish', 'Mustaqil yechish'];
  return `<section class="card rail-card"><h3>Bu mavzudagi bo‘limlar</h3><div class="rail-task-list">${tabs.map((text, index) => `<button class="rail-task ${index === state.session.lessonTab ? 'selected' : ''}" data-action="lesson-tab" data-index="${index}"><span class="number-dot">${index + 1}</span><span>${text}</span></button>`).join('')}</div></section>`;
}
function shell(main, side = sidebar()) { return `${stepper()}<div class="page-grid"><main class="main-column">${main}</main>${side}</div>`; }

function courseScreen() {
  return `<main class="course-page"><div class="course-back">← <span>Matematika kursi · 1-sinf demo</span></div><div class="course-top"><div class="card course-tile"><div class="course-art">${mascot('mascot-small')}<span>Matematika</span></div><div><h2>Matematika</h2>${pill('1-sinf', 'yellow')}</div></div><div class="card course-tile"><div><p class="muted">Sizning taraqqiyotingiz</p><h2>Demo kurs</h2><div class="course-line"></div></div></div><div class="card course-tile lesson-tile"><div><small>1. Dars</small><h2>Qo‘shish va ayirish</h2><button class="btn orange" data-action="start-course">Davom ettirish</button></div></div><button class="card course-tile ai-tile" data-action="start-course">${mascot('mascot-small')}<span><b>AI yordamchi ${pill('Beta', 'orange')}</b><small>Uyga vazifada yordam ol</small></span><strong>›</strong></button></div><div class="course-path"><svg class="path-road" viewBox="0 0 1200 300" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false"><path d="M 90 245 C 300 240 345 95 550 98 S 770 226 920 219 S 1050 132 1130 110" fill="none" stroke="#eeb241" stroke-width="72" stroke-linecap="round"/><path d="M 90 245 C 300 240 345 95 550 98 S 770 226 920 219 S 1050 132 1130 110" fill="none" stroke="#ffd35f" stroke-width="58" stroke-linecap="round"/><path d="M 90 245 C 300 240 345 95 550 98 S 770 226 920 219 S 1050 132 1130 110" fill="none" stroke="#fff0a6" stroke-width="3" stroke-dasharray="15 16" stroke-linecap="round"/></svg>${[1, 2, 3].map(n => `<button class="path-card" data-action="start-course">${mascot('mascot-tiny')}<b>${n}-sinf</b></button>`).join('')}</div><div class="card course-callout"><h2>Uyga vazifada yordam kerakmi?</h2><p>Rasm yoki PDF tanlang, mavzuni o‘rganing va mashqlarni mustaqil yeching.</p><button class="btn primary" data-action="start-course">AI yordamchini ochish →</button></div></main>`;
}

function uploadScreen() {
  const session = state.session;
  const loading = session.fileStatus === 'uploading' || session.fileStatus === 'processing';
  const error = session.fileStatus === 'upload_failed';
  const fileInfo = session.file ? `<div class="selected-file"><span>📄</span><div><b>${escapeHtml(session.file.name)}</b><small>${session.file.kind === 'sample' ? 'Tayyor demo namuna' : `${escapeHtml(session.file.type || 'Fayl')} · ${formatSize(session.file.size)}`}</small></div><button data-action="clear-file" aria-label="Faylni olib tashlash">×</button></div>` : '';
  return shell(`<section class="hero upload-hero"><div class="hero-copy">${pill('Beta', 'orange')}<h1>AI yordamchi<br/>Uyga vazifada yordam!</h1><p>Vazifangizni yuklang, mavzuni tushuning, o‘zingiz yechishga urinib ko‘ring va kerak bo‘lsa yordam oling.</p></div>${mascot('mascot-hero')}</section>
  <div class="feature-grid">${[['📄','Vazifani yukla','PDF, rasm yoki screenshot'],['📖','Mavzuni tushun','Tegishli darsni ochamiz'],['✅','O‘zi yechishga urin','Javobingizni tekshiring'],['💡','Qadam-baqadam yordam','Maslahat va izohlar']].map(([icon,title,desc],i) => `<button class="feature ${i === 0 ? 'selected' : ''}" data-action="feature" data-index="${i}"><span>${icon}</span><b>${title}</b><small>${desc}</small><em>›</em></button>`).join('')}</div>
  <section class="card upload-box" id="drop-zone"><div class="upload-icon">☁</div><h2>Uyga vazifangizni yuklang</h2><p>PDF, PNG, JPG yoki rasm (screenshot)</p><input class="file-input" id="file-picker" type="file" accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg" aria-label="Vazifa faylini tanlash"/><button class="btn orange" data-action="pick-file">Fayl tanlash</button><span class="muted">Yoki faylni shu yerga tashlang</span>${fileInfo}${loading ? `<div class="loading-line"><span></span></div><p class="loading-text" role="status">${session.fileStatus === 'uploading' ? 'Demo yuklash...' : 'Simulyatsiya qilingan tahlil...'}</p>` : ''}${error ? `<div class="inline-alert error" role="alert">Demo yuklash xatosi. Qayta urinib ko‘ring yoki boshqa holatni tanlang. <button data-action="retry-upload">Qayta urinish</button></div>` : ''}<div class="upload-tip">💡 Rasm aniq va yozuvlar yaxshi ko‘rinadigan bo‘lsa, ko‘rish osonroq bo‘ladi. <b>Demo: fayl serverga yuborilmaydi.</b></div></section>
  <section class="samples"><div class="section-title"><h3>Namuna vazifalar</h3><p>Darhol sinab ko‘rish uchun tayyor demo namunalar.</p></div><div class="sample-grid"><button class="sample-card" data-action="sample"><img src="${samplePreview}" alt="Qo‘shish va ayirish demo vazifasi"/><span><b>Qo‘shish va ayirish</b><small>1-sinf · 4 ta mashq</small></span><em>→</em></button><button class="sample-card" data-action="topic-sample"><span class="sample-icon">🍎</span><span><b>Sonlarni sanash</b><small>1-sinf · 3 ta mashq</small></span><em>→</em></button></div></section>`, sidebar('upload'));
}

function filePreview() {
  const file = state.session.file;
  if (!file) return '<div class="empty-preview">Hali fayl tanlanmadi.</div>';
  if (file.needsReselect) return `<div class="empty-preview">${escapeHtml(file.name)} — sahifa yangilangani uchun faylni qayta tanlang.<button class="btn outline" data-action="pick-file">Qayta tanlash</button></div>`;
  if (file.type === 'application/pdf') return `<object class="preview-object" data="${escapeHtml(file.previewUrl)}" type="application/pdf"><p>PDF oldindan ko‘rish mavjud emas. Fayl: ${escapeHtml(file.name)}</p></object>`;
  return `<img class="preview-image" src="${escapeHtml(file.previewUrl)}" alt="${escapeHtml(file.name)} oldindan ko‘rish"/>`;
}

function analysisScreen() {
  const s = state.session;
  const status = s.analysisStatus;
  const ready = status === 'ready' || status === 'confirmed';
  const issue = status === 'low' || status === 'empty' || status === 'unreadable' || status === 'error';
  const message = status === 'low' ? 'Mavzu taxmini noaniq. Namuna natijasini tasdiqlang yoki boshqa rasm tanlang.' : status === 'empty' ? 'Demo tahlilda topshiriqlar topilmadi.' : status === 'unreadable' ? 'Rasm matni xira deb belgilandi. Aniqroq rasm tanlang.' : 'Demo tahlil amalga oshmadi. Qayta urinib ko‘ring.';
  return shell(`<section class="card analysis-banner"><div class="file-emoji">📄</div><div><h2>Uyga vazifangiz tanlandi!</h2><p>Quyidagi tahlil — oldindan tayyorlangan <b>demo natija</b>. Fayl matni haqiqatan o‘qilmadi.</p></div>${mascot('mascot-small')}</section>
  <div class="analysis-grid"><section class="card preview-card"><h3>Yuklangan fayl</h3><div class="preview-frame">${filePreview()}</div><div class="preview-actions"><button class="btn subtle" data-action="zoom">⌕ Faylni kattalashtirish</button><button class="btn subtle" data-action="replace-file">↻ Yana bir fayl tanlash</button></div><p class="fine-print">${escapeHtml(s.file?.name || 'Demo namuna')} · ${s.file?.kind === 'sample' ? 'Demo namuna' : s.file?.size ? formatSize(s.file.size) : 'Fayl tanlanmadi'}</p></section>
  <section class="card analysis-card"><div class="analysis-heading">${mascot('mascot-tiny')}<h3>Simulyatsiya qilingan tahlil</h3></div>${status === 'processing' ? `<div class="skeletons" role="status"><span></span><span></span><span></span><p>Demo tahlil tayyorlanmoqda...</p></div>` : issue ? `<div class="inline-alert ${status === 'low' ? 'warning' : 'error'}" role="alert">${message}</div>` : `<h3>${status === 'confirmed' ? 'Tasdiqlangan demo natija' : 'Namuna natijasi tayyor!'}</h3><p>Tanlangan demo ssenariy uchun mavzu va mashqlar:</p>`}
  ${status !== 'processing' && status !== 'error' && status !== 'empty' && status !== 'unreadable' ? `<div class="analysis-details"><div><span>Fan</span><b>${escapeHtml(s.analysis.subject)}</b></div><div><span>Aniqlangan sinf</span><b>${s.analysis.grade}-sinf</b></div><div><span>Mavzu</span><b>${escapeHtml(s.analysis.topic)}</b></div><div><span>Ishonchlilik</span><b>${s.analysis.confidence}% · demo ko‘rsatkichi</b></div></div>` : ''}
  ${status === 'low' ? `<div class="action-row"><button class="btn primary" data-action="confirm-analysis">Shu mavzuni tasdiqlash</button><button class="btn outline" data-action="choose-topic">Boshqa mavzuni tanlash</button></div>` : ready ? `<div class="action-row"><button class="btn primary" data-action="open-lesson">Mavzuni ko‘rish →</button><button class="btn outline" data-action="start-practice">To‘g‘ridan-to‘g‘ri yechish</button></div>` : status === 'processing' ? '' : `<div class="action-row"><button class="btn outline" data-action="retry-analysis">Qayta tahlil qilish</button><button class="btn primary" data-action="replace-file">Boshqa fayl tanlash</button></div>`}</section></div>
  <section class="tasks-section"><h3>Topshiriqlar</h3>${ready ? topic().exercises.map((item, index) => `<div class="card detected-task"><span class="number-dot">${index + 1}</span><div><b>${index + 1}-misol · Hisoblang</b><p>${equation(item)}</p></div><button class="btn primary" data-action="select-task" data-id="${item.id}">Boshlash</button></div>`).join('') : `<div class="card empty-state">${status === 'processing' ? 'Tahlil yakunlangach mashqlar ko‘rinadi.' : 'Hozircha tasdiqlangan mashqlar yo‘q.'}</div>`}</section>`, sidebar());
}

function lessonScreen() {
  const s = state.session, t = topic();
  const tabs = ['Mavzuni tushunish', 'Misollar bilan ko‘rish', 'Qadam-baqadam yechish', 'Mustaqil yechish'];
  const tab = s.lessonTab;
  const content = tab === 0 ? `<div class="lesson-blocks">${t.lessons.map(item => `<div class="lesson-block"><h3>📖 ${item.title}</h3><p>${item.body}</p>${visualEquation(item)}<div class="remember">💡 <b>Eslab qoling!</b> ${item.tip}</div></div>`).join('')}</div>` : tab === 1 ? `<div class="lesson-block"><h3>Misollarni ko‘rib chiqamiz</h3><p>Avval misolni ko‘ring, keyin mustaqil mashq qiling.</p>${visualEquation(t.examples[0])}<button class="btn primary" data-action="open-guided">Barcha misollarni ko‘rish →</button></div>` : tab === 2 ? `<div class="lesson-block"><h3>Qadam-baqadam tushuntirish</h3><ol class="numbered-steps">${t.examples[0].steps.map(step => `<li>${step}</li>`).join('')}</ol><button class="btn primary" data-action="open-guided">Birgalikda yechish →</button></div>` : `<div class="lesson-block"><h3>Endi sizning navbatingiz!</h3><p>Javobni o‘zingiz topishga harakat qiling. Qiyin bo‘lsa, maslahatlar bor.</p><button class="btn primary" data-action="start-practice">Mustaqil yechishni boshlash →</button></div>`;
  return shell(`<section class="hero compact-hero"><div class="hero-copy">${pill('Mini dars', 'yellow')}<h1>${escapeHtml(t.title)}</h1><p>${escapeHtml(t.intro)}</p></div>${mascot('mascot-compact')}</section><section class="card lesson-card"><div class="tabbar">${tabs.map((name, index) => `<button class="tab ${tab === index ? 'active' : ''}" data-action="lesson-tab" data-index="${index}">${name}</button>`).join('')}</div>${content}<div class="lesson-footer"><button class="btn outline" data-action="lesson-prev">← Oldingi</button><span class="dots">${tabs.map((_,index) => `<i class="${index === tab ? 'active' : ''}"></i>`).join('')}</span><button class="btn primary" data-action="lesson-next">${tab === 3 ? 'Mustaqil yechish' : `Keyingi: ${tabs[tab + 1]}`} →</button></div></section>`, sidebar('lesson'));
}

function guidedScreen() {
  const s = state.session, example = topic().examples[s.exampleIndex];
  return shell(`<section class="hero compact-hero"><div class="hero-copy">${pill('Misollar bilan ko‘rish', 'yellow')}<h1>Misollarni birgalikda yechamiz</h1><p>Har bir qadamni tushunib, keyin mustaqil mashq qiling.</p></div>${mascot('mascot-compact')}</section><section class="card guided-card"><div class="tabbar"><button class="tab active" data-action="open-guided">AI bilan yechish</button><button class="tab" data-action="similar">O‘xshash misollar</button><button class="tab" data-action="start-practice">Mustaqil yechish</button></div><div class="guided-heading"><h2><span class="number-label">${s.exampleIndex + 1}-misol</span> Hisoblang: ${equation(example)}</h2><div class="pager"><button data-action="example-prev" aria-label="Oldingi misol">←</button><span>${s.exampleIndex + 1} / ${topic().examples.length}</span><button data-action="example-next" aria-label="Keyingi misol">→</button></div></div><div class="guided-content"><div><h3>🤖 AI yechimi va tushuntirish <small>demo matn</small></h3><ol class="numbered-steps">${example.steps.map(step => `<li>${step}</li>`).join('')}</ol>${s.alternate ? `<div class="remember">💡 <b>Boshqa usul:</b> ${example.other}</div>` : ''}</div>${visualEquation(example)}</div><div class="guided-footer"><div class="answer-banner">✓ Javob: ${example.answer}<small>${equation(example, example.answer)} — to‘g‘ri.</small></div><div class="action-row"><button class="btn outline" data-action="alternate">${s.alternate ? 'Asosiy usul' : 'Boshqa usulda'}</button><button class="btn primary" data-action="example-next">Keyingi misol →</button><button class="btn subtle" data-action="start-practice">O‘zim yechaman</button></div></div></section>`, sidebar('guided'));
}

function practiceScreen() {
  const s = state.session, item = taskData(), current = taskState(), index = topic().exercises.findIndex(task => task.id === item.id), progress = getProgress(s);
  return shell(`<section class="hero compact-hero"><div class="hero-copy">${pill('Mustaqil yechish', 'yellow')}<h1>Endi sizning navbatingiz!</h1><p>Avval o‘zingiz javob toping. Qiyin bo‘lsa, maslahat oling.</p></div>${mascot('mascot-compact')}</section><section class="card practice-card"><div class="task-numbers">${topic().exercises.map((task, i) => `<button class="task-number ${task.id === item.id ? 'active' : ''} ${s.tasks[task.id].status === 'correct' ? 'complete' : ''}" data-action="select-task" data-id="${task.id}" aria-label="${i + 1}-misol, ${labelForStatus(s.tasks[task.id].status)}">${i + 1}</button>`).join('')}</div><div class="practice-heading"><h2><span class="number-label">${index + 1}-misol</span> Hisoblang.</h2><button class="btn outline" data-action="save-later">♧ Keyinga saqlash</button></div><div class="equation-box">${equation(item)}</div><label class="answer-label" for="answer-input">Javobingizni kiriting</label><div class="answer-field"><input id="answer-input" type="text" inputmode="numeric" autocomplete="off" aria-describedby="answer-help" placeholder="Javobni yozing..." value="${escapeHtml(current.draft)}" ${current.status === 'correct' ? 'disabled' : ''}/><span>⌨</span></div><p id="answer-help" class="fine-print">Butun son yozing. Bo‘sh yoki matnli javob yuborilmaydi.</p><div class="keypad" aria-label="Raqamli klaviatura">${['1','2','3','4','5','6','7','8','9','0','−','⌫'].map(key => `<button data-action="keypad" data-key="${key}" ${current.status === 'correct' ? 'disabled' : ''}>${key}</button>`).join('')}</div><div class="practice-actions"><button class="btn outline" data-action="hint">💡 Maslahat so‘rash</button><button class="btn outline" data-action="steps">▶ Qadam-baqadam yordam</button><button class="btn primary" data-action="submit-answer" ${current.status === 'correct' ? 'disabled' : ''}>Javobni tekshirish →</button></div>${current.hint ? `<div class="inline-alert info">💡 <b>Maslahat:</b> ${item.hint}</div>` : ''}${current.steps ? `<div class="inline-alert info"><b>Qadamlar:</b><ol>${item.steps.map(step => `<li>${step}</li>`).join('')}</ol><small>Javobni baribir o‘zingiz kiriting.</small></div>` : ''}${current.feedback ? `<div class="inline-alert ${current.feedback.kind}" role="status">${current.feedback.text}</div>` : ''}${current.status === 'correct' ? `<div class="correct-actions"><span>+10 demo coin · +5 demo XP</span><button class="btn primary" data-action="next-task">${progress.completed === progress.total ? 'Yakuniy natijani ko‘rish' : 'Keyingi misol'} →</button></div>` : ''}</section>`, sidebar('practice'));
}

function resultScreen() {
  const s = state.session, t = topic(), progress = getProgress(s), reward = getDemoReward(s);
  return shell(`<section class="card result-hero"><div><h1>Zo‘r ish!</h1><h2>Barcha ${progress.total} ta mashqni yechdingiz!</h2><p>Ajoyib! ${escapeHtml(t.title)} mavzusini mashq qildingiz. Shu tarzda davom eting!</p></div>${mascot('mascot-result')}<div class="reward-stack"><div>🪙 <strong>+${reward.coins} demo coin</strong><small>Bu vazifadagi mashqlar uchun</small></div><div>⚡ <strong>+${reward.xp} demo XP</strong><small>Faqat ushbu prototipda</small></div><div>⭐ <strong>${progress.completed}/${progress.total}</strong><small>Bajarilgan mashqlar</small></div></div></section><section class="card result-detail"><h2>Yechilgan misollar</h2><div class="result-list">${t.exercises.map((item,index) => `<div class="result-item"><b>${index + 1}. ${equation(item, item.answer)}</b><span>✓ ${escapeHtml(item.explanation)}</span></div>`).join('')}</div><p class="fine-print">Mukofotlar bir mashq uchun bir marta ko‘rsatiladi. Ular haqiqiy LMS hisobiga qo‘shilmaydi.</p></section><section class="card next-section"><h2>Yana misol yechishni xohlaysizmi?</h2><p>Keyingi qadamni tanlang.</p><div class="next-grid"><button class="next-card" data-action="new-upload"><span>🖼️</span><b>Yangi misol yuklash</b><small>Rasm yoki PDF tanlang</small><em>→</em></button><button class="next-card" data-action="similar"><span>📄</span><b>O‘xshash misollar</b><small>Shu mavzudagi yangi demo mashqlar</small><em>→</em></button><button class="next-card" data-action="choose-topic"><span>📖</span><b>Boshqa mavzu</b><small>Yangi mavzuni tanlang</small><em>→</em></button></div></section>`, sidebar('result'));
}

function topicsScreen() {
  return shell(`<section class="hero compact-hero"><div class="hero-copy">${pill('Mavzu tanlash', 'yellow')}<h1>Boshqa mavzuni tanlang</h1><p>Bu tanlov avvalgi demo sessiyani o‘chirmaydi.</p></div>${mascot('mascot-compact')}</section><section class="topic-grid">${Object.values(topics).map(item => `<button class="card topic-card" data-action="select-topic" data-id="${item.id}"><span>📖</span><h2>${item.title}</h2><p>${item.grade}-sinf · ${item.exercises.length} ta mashq</p><em>Mini darsni ochish →</em></button>`).join('')}</section>${state.savedSession ? '<button class="btn outline" data-action="resume-old">Avvalgi sessiyaga qaytish</button>' : ''}`, sidebar());
}

function modal() {
  if (!state.modal) return '';
  return `<div class="modal-overlay" data-action="close-modal"><div class="modal-panel" role="dialog" aria-modal="true" aria-label="${escapeHtml(state.modal.title)}" data-stop="true"><div class="modal-head"><h2>${escapeHtml(state.modal.title)}</h2><button data-action="close-modal" aria-label="Yopish">×</button></div><div class="modal-body">${state.modal.body}</div></div></div>`;
}
function render() {
  const screen = ({ course: courseScreen, upload: uploadScreen, analysis: analysisScreen, lesson: lessonScreen, guided: guidedScreen, practice: practiceScreen, result: resultScreen, topics: topicsScreen })[state.view] || courseScreen;
  root.innerHTML = `${header()}<div class="page-container page-${state.view}">${screen()}</div>${state.toast ? `<div class="toast" role="status">${escapeHtml(state.toast)}</div>` : ''}${modal()}`;
}

function beginAnalysis() {
  const s = state.session;
  if (!s.file) return showToast('Avval fayl yoki demo namuna tanlang.');
  const id = s.id;
  s.fileStatus = 'uploading'; s.analysisStatus = 'idle'; update();
  setTimeout(() => {
    if (state.session?.id !== id) return;
    if (s.scenario === 'uploadFail') { s.fileStatus = 'upload_failed'; update(); return; }
    s.fileStatus = 'uploaded'; s.analysisStatus = 'processing'; navigate('analysis');
    setTimeout(() => {
      if (state.session?.id !== id) return;
      s.fileStatus = s.scenario === 'processingFail' ? 'processing_failed' : s.scenario === 'low' ? 'needs_clarification' : 'processed';
      s.analysisStatus = ({ success: 'ready', low: 'low', empty: 'empty', unreadable: 'unreadable', processingFail: 'error' })[s.scenario] || 'ready';
      update();
    }, 850);
  }, 550);
}

function useFile(file) {
  if (!file) return;
  const validation = validateFile(file);
  if (!validation.ok) return showToast(validation.message);
  const name = file.name || 'Nomsiz fayl';
  if (state.session.file?.kind === 'user' && state.session.file.previewUrl) URL.revokeObjectURL(state.session.file.previewUrl);
  state.session.file = { kind: 'user', name, type: file.type || (name.toLowerCase().endsWith('.pdf') ? 'application/pdf' : 'image/jpeg'), size: file.size, previewUrl: URL.createObjectURL(file), needsReselect: false };
  beginAnalysis();
}

function chooseSample(topicId = 'arithmetic') {
  if (state.session.topicId !== topicId) state.session = newSession(topicId, state.session.scenario);
  state.session.file = { kind: 'sample', name: topicId === 'arithmetic' ? '1-sinf-demo-vazifa.svg' : 'sanash-demo-vazifa.svg', type: 'image/svg+xml', size: 5400, previewUrl: topicId === 'arithmetic' ? samplePreview : countingPreview };
  beginAnalysis();
}

function selectTask(id) {
  if (!state.session || !state.session.tasks[id]) return;
  state.session.currentTaskId = id;
  const current = state.session.tasks[id];
  if (current.status === 'not_started' || current.status === 'ready' || current.status === 'skipped') current.status = 'in_progress';
  navigate('practice');
}

function submitAnswer() {
  const item = taskData(), current = taskState();
  if (current.status === 'correct') return;
  const verdict = validateAnswer(current.draft, item.answer);
  if (verdict === 'empty') { current.feedback = { kind: 'error', text: 'Javobni yozing, keyin tekshiring.' }; return update(); }
  if (verdict === 'invalid') { current.feedback = { kind: 'error', text: 'Iltimos, javobni butun son ko‘rinishida yozing.' }; return update(); }
  current.attempts += 1;
  if (verdict === 'correct') {
    current.status = 'correct';
    current.feedback = { kind: 'success', text: `To‘g‘ri! ${item.explanation} +10 demo coin va +5 demo XP.` };
  } else {
    current.status = 'incorrect';
    current.feedback = { kind: 'warning', text: 'Yaxshi urinish! Yana bir bor sanab ko‘ring yoki maslahat oling.' };
  }
  update();
}

function nextTask() {
  const exercises = topic().exercises;
  if (getProgress(state.session).completed === exercises.length) return navigate('result');
  const index = exercises.findIndex(item => item.id === state.session.currentTaskId);
  const next = [...exercises.slice(index + 1), ...exercises.slice(0, index + 1)].find(item => state.session.tasks[item.id].status !== 'correct');
  if (next) selectTask(next.id);
}

function scriptedChatResponse(question) {
  const q = question.toLocaleLowerCase('uz');
  if (q.includes('xato') || q.includes('tarmoq')) return { error: true, text: 'Demo javob hozir ko‘rinmadi. Qayta urinishni bosing.' };
  if (q.includes('javob') || q.includes('yechim')) return { text: 'Avval o‘zingiz urinib ko‘ring. Maslahat tugmasi joriy misolga mos yo‘l ko‘rsatadi.' };
  if (q.includes('ayir')) return { text: 'Ayirishda boshlang‘ich sondan orqaga sanang. Olingan narsalarni alohida tasavvur qiling.' };
  if (q.includes('qo‘sh') || q.includes('qosh') || q.includes('san')) return { text: 'Qo‘shishda birinchi sondan boshlab oldinga sanang. Olmalarni bittadan sanashga urinib ko‘ring.' };
  return { text: 'Bu demo yordamchi qisqa maslahat beradi. “Qanday sanayman?” deb so‘rang yoki misoldagi Maslahat tugmasini bosing.' };
}
function sendChat(question, retry = false) {
  if (!state.session) return;
  const cleaned = question.trim();
  if (!cleaned) return showToast('Avval savolingizni yozing.');
  if (!retry) state.session.chat.push({ from: 'student', text: cleaned });
  state.chatDraft = '';
  state.session.chat.push({ from: 'assistant', text: 'Demo javob tayyorlanmoqda...' });
  const id = state.session.id; update();
  setTimeout(() => {
    if (state.session?.id !== id) return;
    state.session.chat.pop();
    state.session.chat.push({ from: 'assistant', ...scriptedChatResponse(cleaned) });
    update();
  }, 650);
}

function handleAction(action, target) {
  const s = state.session;
  switch (action) {
    case 'home': state.history = []; navigate('course', { replace: true }); break;
    case 'back': back(); break;
    case 'start-course': startSession(); break;
    case 'header-schedule': openDemoModal('Dars jadvali', '<p>Bu mustaqil prototip. Haqiqiy dars jadvali LMS orqali ochiladi.</p>'); break;
    case 'header-coins': openDemoModal('Coin tarixi', `<p>Haqiqiy coin balansi ulanmagan. Ushbu sessiyadagi mukofot: <b>+${getDemoReward(s).coins} demo coin</b>.</p>`); break;
    case 'header-energy': openDemoModal('Demo energiya', '<p>Energiya ko‘rsatkichi faqat vizual namuna. LMS hisobiga ulanmagan.</p>'); break;
    case 'header-notify': openDemoModal('Bildirishnomalar', '<p>Bu demo uchun yangi bildirishnoma yo‘q.</p>'); break;
    case 'header-profile': openDemoModal('Profil', '<p>Prototipda akkauntga kirish talab qilinmaydi. Mashqlar faqat shu brauzerda demo sifatida saqlanadi.</p>'); break;
    case 'feature': {
      const i = Number(target.dataset.index);
      if (i === 0) document.querySelector('#drop-zone')?.scrollIntoView({ behavior: 'smooth' });
      else showToast(['', 'Fayl tanlang: demo tahlildan keyin mini dars ochiladi.', 'Tahlildan keyin mashqlarni mustaqil ishlang.', 'Mashqda maslahat va qadamlar mavjud.'][i]);
      break;
    }
    case 'scenario': if (s) { s.scenario = target.dataset.value; s.analysis.confidence = s.scenario === 'low' ? 48 : 96; update(); } break;
    case 'pick-file': if (state.view === 'upload') document.querySelector('#file-picker')?.click(); else { navigate('upload'); setTimeout(() => document.querySelector('#file-picker')?.click(), 30); } break;
    case 'clear-file': if (s.file?.kind === 'user' && s.file.previewUrl) URL.revokeObjectURL(s.file.previewUrl); s.file = null; s.fileStatus = 'selected'; update(); break;
    case 'sample': chooseSample(); break;
    case 'topic-sample': chooseSample('counting'); break;
    case 'retry-upload': beginAnalysis(); break;
    case 'replace-file': navigate('upload'); setTimeout(() => document.querySelector('#file-picker')?.click(), 30); break;
    case 'retry-analysis': s.analysisStatus = 'processing'; update(); setTimeout(() => { s.analysisStatus = s.scenario === 'processingFail' ? 'error' : s.scenario === 'low' ? 'low' : s.scenario === 'empty' ? 'empty' : s.scenario === 'unreadable' ? 'unreadable' : 'ready'; update(); }, 650); break;
    case 'confirm-analysis': s.analysisStatus = 'confirmed'; update(); break;
    case 'zoom': openDemoModal('Yuklangan fayl', `<div class="zoom-content">${filePreview()}</div>`); break;
    case 'open-lesson': navigate('lesson'); break;
    case 'open-guided': navigate('guided'); break;
    case 'start-practice': selectTask(s.currentTaskId); break;
    case 'select-task': selectTask(target.dataset.id); break;
    case 'step': {
      const index = Number(target.dataset.index);
      if (index === 0) navigate('upload');
      else if (index === 1 && s?.file) navigate('analysis');
      else if (index === 2 && ['ready', 'confirmed'].includes(s?.analysisStatus)) navigate('lesson');
      else if (index === 3 && ['ready', 'confirmed'].includes(s?.analysisStatus)) selectTask(s.currentTaskId);
      else showToast('Avval fayl tanlab, demo tahlilni yakunlang.');
      break;
    }
    case 'lesson-tab': s.lessonTab = Number(target.dataset.index); update(); break;
    case 'lesson-prev': if (s.lessonTab) { s.lessonTab -= 1; update(); } else back(); break;
    case 'lesson-next': if (s.lessonTab < 3) { s.lessonTab += 1; update(); } else selectTask(s.currentTaskId); break;
    case 'example-prev': s.exampleIndex = (s.exampleIndex - 1 + topic().examples.length) % topic().examples.length; s.alternate = false; update(); break;
    case 'example-next': s.exampleIndex = (s.exampleIndex + 1) % topic().examples.length; s.alternate = false; update(); break;
    case 'alternate': s.alternate = !s.alternate; update(); break;
    case 'keypad': {
      const current = taskState();
      if (current.status === 'correct') break;
      const key = target.dataset.key;
      current.draft = key === '⌫' ? current.draft.slice(0, -1) : key === '−' ? (current.draft.startsWith('-') ? current.draft.slice(1) : `-${current.draft}`) : `${current.draft}${key}`;
      current.feedback = null; update(); document.querySelector('#answer-input')?.focus(); break;
    }
    case 'hint': { const current = taskState(); current.hint = true; if (current.status !== 'correct') current.status = 'needs_help'; update(); break; }
    case 'steps': { const current = taskState(); current.steps = !current.steps; if (current.status !== 'correct') current.status = 'needs_help'; update(); break; }
    case 'save-later': {
      const current = taskState();
      if (current.status !== 'correct') current.status = 'skipped';
      const next = topic().exercises.find(item => item.id !== s.currentTaskId && s.tasks[item.id].status !== 'correct');
      if (next) selectTask(next.id); else update();
      showToast('Javobingiz saqlandi. Keyin bu misolga qaytishingiz mumkin.');
      break;
    }
    case 'submit-answer': submitAnswer(); break;
    case 'next-task': nextTask(); break;
    case 'new-upload': startSession(s.topicId); break;
    case 'similar': {
      state.savedSession = clone(s);
      state.session = newSession(s.topicId);
      state.session.file = { kind: 'sample', name: 'O‘xshash mashqlar · demo', type: 'image/svg+xml', size: 5400, previewUrl: s.topicId === 'counting' ? countingPreview : samplePreview };
      state.session.fileStatus = 'processed'; state.session.analysisStatus = 'ready';
      state.history = ['course', 'analysis']; selectTask(state.session.currentTaskId); break;
    }
    case 'choose-topic': navigate('topics'); break;
    case 'select-topic': {
      state.savedSession = clone(s);
      state.session = newSession(target.dataset.id);
      state.session.file = { kind: 'sample', name: 'Tanlangan mavzu · demo', type: 'image/svg+xml', size: 5400, previewUrl: target.dataset.id === 'counting' ? countingPreview : samplePreview };
      state.session.fileStatus = 'processed'; state.session.analysisStatus = 'ready';
      state.history = ['course', 'topics']; navigate('lesson', { replace: true }); break;
    }
    case 'resume-old': if (state.savedSession) { state.session = clone(state.savedSession); const oldProgress = getProgress(state.session); navigate(oldProgress.completed === oldProgress.total ? 'result' : 'analysis'); } break;
    case 'chat-retry': {
      const previous = [...s.chat].reverse().find(message => message.from === 'student');
      if (previous) sendChat(previous.text.replace(/xato|tarmoq/gi, 'sanash'), true);
      break;
    }
    case 'close-modal': state.modal = null; render(); break;
  }
}

root.addEventListener('click', event => {
  const target = event.target.closest('[data-action]');
  if (!target || event.target.closest('[data-stop]') && target.dataset.action === 'close-modal' && target.classList.contains('modal-overlay')) return;
  handleAction(target.dataset.action, target);
});
root.addEventListener('input', event => {
  if (event.target.id === 'answer-input' && state.session) {
    const current = taskState(); current.draft = event.target.value; current.feedback = null;
    if (current.status === 'not_started' || current.status === 'incorrect' || current.status === 'skipped' || current.status === 'needs_help') current.status = 'in_progress';
    persist();
  }
  if (event.target.id === 'chat-input') state.chatDraft = event.target.value;
});
root.addEventListener('change', event => { if (event.target.id === 'file-picker') useFile(event.target.files?.[0]); });
root.addEventListener('submit', event => {
  if (event.target.id === 'chat-form') { event.preventDefault(); sendChat(state.chatDraft); }
});
root.addEventListener('dragover', event => { if (event.target.closest('#drop-zone')) { event.preventDefault(); event.target.closest('#drop-zone').classList.add('dragging'); } });
root.addEventListener('dragleave', event => { if (event.target.closest('#drop-zone')) event.target.closest('#drop-zone').classList.remove('dragging'); });
root.addEventListener('drop', event => { const zone = event.target.closest('#drop-zone'); if (zone) { event.preventDefault(); zone.classList.remove('dragging'); useFile(event.dataTransfer.files?.[0]); } });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && state.modal) { state.modal = null; render(); } });
render();
