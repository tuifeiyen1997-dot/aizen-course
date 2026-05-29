/* Video play/pause toggle */
(function () {
  const frame = document.querySelector('.video-frame');
  if (!frame) return;
  const video = frame.querySelector('video.thumb');
  const btn = frame.querySelector('.play');
  if (!video || !btn) return;
  const toggle = () => { if (video.paused) { video.play(); } else { video.pause(); } };
  btn.addEventListener('click', toggle);
  video.addEventListener('click', toggle);
  video.addEventListener('play',  () => frame.setAttribute('data-state', 'playing'));
  video.addEventListener('pause', () => frame.setAttribute('data-state', 'paused'));
  video.addEventListener('ended', () => frame.setAttribute('data-state', 'paused'));
})();

/* Countdown ticker — counts down 7 days 14 hours from page load */
(function () {
  const target = new Date();
  target.setDate(target.getDate() + 7);
  target.setHours(target.getHours() + 14);
  function tick() {
    const now = new Date();
    let s = Math.max(0, Math.floor((target - now) / 1000));
    const d = Math.floor(s / 86400); s -= d * 86400;
    const h = Math.floor(s / 3600);  s -= h * 3600;
    const m = Math.floor(s / 60);    s -= m * 60;
    const $ = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = String(v).padStart(2, '0'); };
    $('cd-d', d); $('cd-h', h); $('cd-m', m); $('cd-s', s);
  }
  tick();
  setInterval(tick, 1000);
})();

/* Enrollment form: price display + submit */
(function () {
  const form = document.getElementById('enroll-form');
  if (!form) return;
  const priceDisplay = document.getElementById('price-display');
  const priceMap = { '1': '8,800', '3': '2,934 × 3', '6': '1,467 × 6' };
  form.addEventListener('change', (e) => {
    if (e.target.name === 'installment' && priceDisplay && priceMap[e.target.value]) {
      priceDisplay.textContent = priceMap[e.target.value];
    }
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name  = (data.get('name')  || '').toString().trim();
    const email = (data.get('email') || '').toString().trim();
    const phone = (data.get('phone') || '').toString().trim();
    const installment = data.get('installment');
    const agreed = document.getElementById('enroll-agree').checked;
    if (!name || !email || !phone) { alert('請完整填寫姓名、Email 與聯絡電話'); return; }
    if (!agreed) { alert('請先同意服務條款與隱私權政策'); return; }
    const planText = { '1': '一次付清 NT$ 8,800', '3': '分 3 期（每期 NT$ 2,934）', '6': '分 6 期（每期 NT$ 1,467）' }[installment] || '一次付清';
    alert(`感謝您的報名！\n\n姓名：${name}\nEmail：${email}\n電話：${phone}\n付款方式：${planText}\n\n我們將盡快與您聯繫確認付款流程。`);
  });
})();
