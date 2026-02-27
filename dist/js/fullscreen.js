// ============================================================
//  fullscreen.js  –  Modal viewer giới hạn trong màn hình
// ============================================================

(function () {
  /* ── 1. Inject CSS ────────────────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = `
    /* Overlay tối */
    #fs-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.85);
      z-index: 9999;
      align-items: center;
      justify-content: center;
    }
    #fs-overlay.active { display: flex; }

    /* Khung modal – luôn nằm trong viewport */
    #fs-box {
      position: relative;
      max-width: min(90vw, 900px);
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    /* Ảnh / video bên trong modal */
    #fs-media {
      max-width: 100%;
      max-height: 80vh;
      object-fit: contain;
      border-radius: 8px;
      box-shadow: 0 8px 40px rgba(0,0,0,0.6);
      display: block;
    }

    /* Caption */
    #fs-caption {
      color: #fff;
      font-size: 1rem;
      text-align: center;
      opacity: 0.85;
      max-width: 90vw;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Nút đóng */
    #fs-close {
      position: fixed;
      top: 16px;
      right: 20px;
      background: rgba(255,255,255,0.15);
      border: none;
      color: #fff;
      font-size: 1.6rem;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
      z-index: 10001;
    }
    #fs-close:hover { background: rgba(255,255,255,0.35); }

    /* Nút prev / next */
    .fs-nav {
      position: fixed;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(255,255,255,0.15);
      border: none;
      color: #fff;
      font-size: 1.8rem;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
      z-index: 10001;
    }
    .fs-nav:hover { background: rgba(255,255,255,0.35); }
    #fs-prev { left: 14px; }
    #fs-next { right: 14px; }

    /* Counter */
    #fs-counter {
      position: fixed;
      top: 18px;
      left: 50%;
      transform: translateX(-50%);
      color: rgba(255,255,255,0.7);
      font-size: 0.85rem;
      z-index: 10001;
    }
  `;
  document.head.appendChild(style);

  /* ── 2. Tạo DOM ───────────────────────────────────────────── */
  const overlay  = document.createElement('div');   overlay.id = 'fs-overlay';
  const box      = document.createElement('div');   box.id = 'fs-box';
  const media    = document.createElement('img');   media.id = 'fs-media';
  const caption  = document.createElement('p');     caption.id = 'fs-caption';
  const btnClose = document.createElement('button'); btnClose.id = 'fs-close'; btnClose.innerHTML = '✕';
  const btnPrev  = document.createElement('button'); btnPrev.id = 'fs-prev'; btnPrev.className = 'fs-nav'; btnPrev.innerHTML = '&#8249;';
  const btnNext  = document.createElement('button'); btnNext.id = 'fs-next'; btnNext.className = 'fs-nav'; btnNext.innerHTML = '&#8250;';
  const counter  = document.createElement('span');  counter.id = 'fs-counter';

  box.append(media, caption);
  overlay.append(btnClose, btnPrev, btnNext, counter, box);
  document.body.appendChild(overlay);

  /* ── 3. Dữ liệu items ─────────────────────────────────────── */
  let items = [];   // { src, caption, isVideo }
  let current = 0;

  function buildItems() {
    items = [];
    document.querySelectorAll('.gallery-item').forEach(fig => {
      const img   = fig.querySelector('img');
      const video = fig.querySelector('video');
      const cap   = fig.querySelector('figcaption')?.textContent || '';
      if (img)   items.push({ src: img.src,   caption: cap, isVideo: false });
      if (video) items.push({ src: video.src, caption: cap, isVideo: true  });
    });
  }

  /* ── 4. Hiển thị item ─────────────────────────────────────── */
  function show(index) {
    if (!items.length) return;
    current = (index + items.length) % items.length;
    const item = items[current];

    // Swap img ↔ video nếu cần
    let el = box.querySelector('#fs-media');
    const needVideo = item.isVideo;
    if (needVideo && el.tagName === 'IMG') {
      const v = document.createElement('video');
      v.id = 'fs-media'; v.controls = true; v.autoplay = true;
      el.replaceWith(v); el = v;
    } else if (!needVideo && el.tagName === 'VIDEO') {
      el.pause();
      const i = document.createElement('img');
      i.id = 'fs-media';
      el.replaceWith(i); el = i;
    }

    el.src = item.src;
    caption.textContent = item.caption;
    counter.textContent = `${current + 1} / ${items.length}`;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    const v = box.querySelector('video#fs-media');
    if (v) v.pause();
  }

  /* ── 5. Events ────────────────────────────────────────────── */
  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', () => show(current - 1));
  btnNext.addEventListener('click', () => show(current + 1));

  // Click ngoài box → đóng
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });

  // Phím tắt
  document.addEventListener('keydown', e => {
    if (!overlay.classList.contains('active')) return;
    if (e.key === 'Escape')      close();
    if (e.key === 'ArrowLeft')   show(current - 1);
    if (e.key === 'ArrowRight')  show(current + 1);
  });

  // Click vào gallery items
  function bindClicks() {
    document.querySelectorAll('.gallery-item').forEach((fig, idx) => {
      fig.style.cursor = 'pointer';
      fig.addEventListener('click', () => { buildItems(); show(idx); });
    });
  }

  /* ── 6. Init ──────────────────────────────────────────────── */
  buildItems();
  bindClicks();
})();