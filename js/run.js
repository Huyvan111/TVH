// ============================================================
//  DATA: Thêm ảnh vào từng group tại đây
//  Mỗi item: { src, caption, isVideo (optional) }
// ============================================================
const GROUPS = {
  k1011: {
    name: 'K10–11',
    color: '#ffd166',
    items: [
    ]
  },
  k1112: {
    name: 'K11–12',
    color: '#ff6b6b',
    items: [
      { src: 'k11-12/img2.jpg', caption: 'Pìa Ngủ 1' },
      { src: 'k11-12/img3.jpg', caption: 'Sigma' },
      { src: 'k11-12/img4.jpg', caption: 'Gian' },
      { src: 'k11-12/img5.jpg', caption: 'Doggy Pìa' },
      { src: 'k11-12/img6.jpg', caption: 'Dang ngu' },
      { src: 'k11-12/img7.jpg', caption: 'Room Review' },
      { src: 'k11-12/img8.jpg', caption: 'Sigma 2' },
      { src: 'k11-12/img10.jpg', caption: 'Cool' },
      { src: 'k11-12/img11.jpg', caption: 'bigdik' },
      { src: 'k11-12/img12.jpg', caption: 'Cum' },
      { src: 'k11-12/img13.jpg', caption: 'Among Ú' },
      { src: 'k11-12/img14.jpg', caption: 'Loop' },
      { src: 'k11-12/img15.jpg', caption: 'Dang Nghien' },
      { src: 'k11-12/img16.jpg', caption: 'Đa Cấp' },
      { src: 'k11-12/img17.jpg', caption: 'or2' },
      { src: 'k11-12/img18.jpg', caption: 'Cu Dệ' },
      { src: 'k11-12/img19.jpg', caption: 'Chại Giống' },
      { src: 'k11-12/img20.jpg', caption: 'Monke' },
      { src: 'k11-12/img21.jpg', caption: 'Khò' },
      { src: 'k11-12/img22.jpg', caption: 'Cu dệ 2' },
      { src: 'k11-12/img23.jpg', caption: 'Hu Ngi' },
      { src: 'k11-12/img24.jpg', caption: 'Bia ngu 1' },
      { src: 'k11-12/img25.jpg', caption: 'Bia ngu 2' },
      { src: 'k11-12/img26.jpg', caption: 'Ngo ngac' },
      { src: 'k11-12/img27.jpg', caption: 'Dang kho' },
      { src: 'k11-12/img28.jpg', caption: '...' },
      { src: 'k11-12/img29.jpg', caption: 'HeHe' },
      { src: 'k11-12/img30.jpg', caption: 'Đói à' },
      { src: 'k11-12/img31.jpg', caption: '@Huylee' },
      { src: 'k11-12/img32.jpg', caption: 'Sumo no pro' },
      { src: 'k11-12/img33.jpg', caption: '@Huylee2' },
      { src: 'k11-12/img34.jpg', caption: ':3' },
      { src: 'k11-12/img35.jpg', caption: 'Sleep...' },
      { src: 'k11-12/img36.jpg', caption: 'Sleep2...' },
      { src: 'k11-12/img37.jpg', caption: 'Mấy con nghiện' },
      { src: 'k11-12/img38.jpg', caption: 'HeHe Boy' },
      { src: 'k11-12/img39.jpg', caption: 'Đa cấp thứ thiệt ' },
      { src: 'k11-12/img40.jpg', caption: '1 xúc xích và 2 trứng' },
      { src: 'k11-12/video1.mp4', caption: 'Hay tời', isVideo: true },
      { src: 'k11-12/video.mp4', caption: 'Chad Sigma male', isVideo: true },
      { src: 'k11-12/video2.mp4', caption: 'Yamateeeee', isVideo: true },
      { src: 'k11-12/video3.mp4', caption: '1 day dtt', isVideo: true },
      
    ]
  },
  k1213: {
    name: 'K12–13',
    color: '#ffd166',
    items: [
    ]
  },
  k1314: { 
    name: 'K13–14',
    color: '#ff9e6d',
    items: [
    ]
  },
  k1415: {
    name: 'K14–15',
    color: '#06d6a0',
    items: [
    ]
  },
  k1516: {
    name: 'K15–16',
    color: '#74b9ff',
    items: [
      { src: 'k11-12/img41.jpg', caption: '🤫' },
      { src: 'k11-12/video4.mp4', caption: '🤫', isVideo: true },
    ]
  }
};
// ============================================================
//  GALLERY LOGIC
// ============================================================
let currentGroupKey = null;
let fsItems = [];
let fsCurrent = 0;
function openGroup(key) {
  currentGroupKey = key;
  const group = GROUPS[key];
  const grid = document.getElementById('gallery-grid');
  document.getElementById('gallery-heading').textContent = group.name;
  document.getElementById('gallery-heading').style.color = group.color;
  document.getElementById('gallery-heading-sub').textContent =group.items.length + ' items';

  grid.innerHTML = '';
  fsItems = group.items;

  group.items.forEach((item, idx) => {
    const fig = document.createElement('figure');
    fig.className = 'gallery-item';
    fig.style.cursor = 'pointer';

    if (item.isVideo) {
      const vid = document.createElement('video');
      vid.src = item.src;
      vid.preload = 'metadata';
      vid.muted = true;
      fig.appendChild(vid);

      const playIcon = document.createElement('div');
      playIcon.className = 'video-play-icon';
      playIcon.textContent = '▶';
      fig.appendChild(playIcon);
    } else {
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.caption;
      img.loading = 'lazy';
      fig.appendChild(img);
    }

    const cap = document.createElement('figcaption');
    cap.textContent = item.caption;
    fig.appendChild(cap);

    fig.addEventListener('click', () => fsShow(idx));
    grid.appendChild(fig);
  });

  document.getElementById('groups-section').style.display = 'none';
  document.getElementById('gallery-section').classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goBack() {
  document.getElementById('gallery-section').classList.remove('active');
  document.getElementById('groups-section').style.display = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================================
//  FULLSCREEN MODAL
// ============================================================
const overlay = document.getElementById('fs-overlay');
const fsBox   = document.getElementById('fs-box');
const fsClose = document.getElementById('fs-close');
const fsPrev  = document.getElementById('fs-prev');
const fsNext  = document.getElementById('fs-next');
const fsCounter = document.getElementById('fs-counter');

function fsShow(index) {
  fsCurrent = (index + fsItems.length) % fsItems.length;
  const item = fsItems[fsCurrent];

  let el = document.getElementById('fs-media');
  const needVideo = !!item.isVideo;

  if (needVideo && el.tagName === 'IMG') {
    const v = document.createElement('video');
    v.id = 'fs-media'; v.controls = true; v.autoplay = true;
    v.style.cssText = el.style.cssText;
    el.replaceWith(v); el = v;
    el.style.maxWidth = '100%';
    el.style.maxHeight = '82vh';
    el.style.borderRadius = '10px';
  } else if (!needVideo && el.tagName === 'VIDEO') {
    el.pause();
    const i = document.createElement('img');
    i.id = 'fs-media';
    i.style.cssText = 'max-width:100%;max-height:82vh;object-fit:contain;border-radius:10px;box-shadow:0 10px 50px rgba(0,0,0,0.7);display:block;';
    el.replaceWith(i); el = i;
  }

  el.src = item.src;
  document.getElementById('fs-caption').textContent = item.caption;
  fsCounter.textContent = `${fsCurrent + 1} / ${fsItems.length}`;
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function fsCloseModal() {
  overlay.classList.remove('active');
  document.body.style.overflow = '';
  const v = fsBox.querySelector('video#fs-media');
  if (v) v.pause();
}

fsClose.addEventListener('click', fsCloseModal);
fsPrev.addEventListener('click', () => fsShow(fsCurrent - 1));
fsNext.addEventListener('click', () => fsShow(fsCurrent + 1));
overlay.addEventListener('click', e => { if (e.target === overlay) fsCloseModal(); });

// Keyboard shortcuts
document.addEventListener('keydown', e => {
  if (!overlay.classList.contains('active')) return;
  switch (e.key) {
    case 'Escape':
      fsCloseModal();
      break;
    case 'ArrowLeft': {
      const el = document.getElementById('fs-media');
      if (el && el.tagName === 'VIDEO') {
        el.currentTime = Math.max(0, el.currentTime - 5);
      } else {
        fsShow(fsCurrent - 1);
      }
      break;
    }
    case 'ArrowRight': {
      const el = document.getElementById('fs-media');
      if (el && el.tagName === 'VIDEO') {
        el.currentTime = Math.min(el.duration || el.currentTime, el.currentTime + 5);
      } else {
        fsShow(fsCurrent + 1);
      }
      break;
    }
  }
});


// ============================================================
//  SLIDESHOW  — mathematically precise, never drifts
// ============================================================
(function initSlideshow() {
  const allItems = [];
  for (const key in GROUPS) {
    GROUPS[key].items.forEach(item => {
      if (!item.isVideo) allItems.push(item);
    });
  }
  if (allItems.length === 0) return;

  const track = document.getElementById('slideshow-track');
  const wrap  = document.getElementById('slideshow-wrap');
  if (!track || !wrap) return;

  const GAP           = 16;
  const VISIBLE_COUNT = 11;   // odd — center index = 5
  const CENTER_IDX    = 5;

  // Item widths per class (must match CSS exactly)
  const W = { normal: 200, side: 240, center: 320 };
  const H = { normal: 145, side: 172, center: 230 };

  // Assign class by distance from center
  function classFor(i) {
    const d = Math.abs(i - CENTER_IDX);
    return d === 0 ? 'center' : d === 1 ? 'side' : 'normal';
  }

  // Calculate the pixel left-edge of item i (relative to track origin)
  // track origin is always the left edge of item 0
  function itemLeft(i) {
    let x = 0;
    for (let j = 0; j < i; j++) {
      x += W[classFor(j)] + GAP;
    }
    return x;
  }

  // Pre-compute how wide one "step" is (width of item 0 + gap)
  // After sliding, item 0 is recycled to the end so the step equals W.normal + GAP
  // But item 0 could also be 'side' at start — we always compute dynamically.

  // Build initial DOM nodes
  let dataOffset = 0; // index in allItems of the leftmost visible item

  function getItem(pos) {
    return allItems[(((dataOffset + pos) % allItems.length) + allItems.length) % allItems.length];
  }

  const nodes = [];
  for (let i = 0; i < VISIBLE_COUNT; i++) {
    const d = getItem(i);
    const div = document.createElement('div');
    div.className = 'slide-item ' + classFor(i);

    const img = document.createElement('img');
    img.src = d.src; img.alt = d.caption; img.loading = 'lazy';
    div.appendChild(img);

    const cap = document.createElement('div');
    cap.className = 'slide-caption';
    cap.textContent = d.caption;
    div.appendChild(cap);

    track.appendChild(div);
    nodes.push(div);
  }

  // translateX so the center item's midpoint aligns with wrap midpoint
  function calcTranslate() {
    const wrapW    = wrap.offsetWidth;
    const centerL  = itemLeft(CENTER_IDX);
    const centerMid = centerL + W.center / 2;
    return wrapW / 2 - centerMid;
  }

  // Apply translate without transition
  function snapToCenter() {
    track.style.transition = 'none';
    track.style.transform  = `translateX(${calcTranslate()}px)`;
  }

  snapToCenter();
  window.addEventListener('resize', snapToCenter);

  let sliding = false;

  function slideNext() {
    if (sliding) return;
    sliding = true;

    // The step is the width of the item that will leave (item 0) + gap
    const stepW = W[classFor(0)] + GAP;

    // Animate left by stepW
    const startX = calcTranslate();
    track.style.transition = 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
    track.style.transform  = `translateX(${startX - stepW}px)`;

    track.addEventListener('transitionend', function onEnd() {
      track.removeEventListener('transitionend', onEnd);

      // Recycle first node to end
      const recycled = nodes.shift();
      dataOffset = (dataOffset + 1) % allItems.length;

      // Update its content to the new last item
      const newData = getItem(VISIBLE_COUNT - 1);
      recycled.querySelector('img').src = newData.src;
      recycled.querySelector('img').alt = newData.caption;
      recycled.querySelector('.slide-caption').textContent = newData.caption;

      // Re-assign classes for all nodes based on new positions
      nodes.push(recycled);
      nodes.forEach((el, i) => {
        el.classList.remove('normal', 'side', 'center');
        el.classList.add(classFor(i));
      });

      // Move the recycled node in DOM to end
      track.appendChild(recycled);

      // Snap back to correct centered position (no visible jump because
      // the new layout's center pixel equals the old layout + stepW)
      snapToCenter();

      sliding = false;
    }, { once: true });
  }

  setInterval(slideNext, 3000);
})();