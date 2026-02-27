// ============================================================
//  DATA: Thêm ảnh vào từng group tại đây
//  Mỗi item: { src, caption, isVideo (optional) }
// ============================================================
const GROUPS = {
  k1112: {
    name: 'K11–12',
    sub: 'Niên khóa 2011 – 2012',
    color: '#ff6b6b',
    items: [
      { src: 'k11-12/img1.jpg', caption: 'Đày Tộ' },
      { src: 'k11-12/img2.jpg', caption: 'Pìa Ngủ 1' },
      { src: 'k11-12/img3.jpg', caption: 'Sigma' },
      { src: 'k11-12/img4.jpg', caption: 'Gian' },
      { src: 'k11-12/img5.jpg', caption: 'Doggy Pìa' },
      { src: 'k11-12/img6.jpg', caption: 'Dang ngu' },
      { src: 'k11-12/img7.jpg', caption: 'Room Review' },
      { src: 'k11-12/img8.jpg', caption: 'Sigma 2' },
      { src: 'k11-12/img9.jpg', caption: 'Ư Sêd' },
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
      { src: 'k11-12/video1.mp4', caption: 'Hay tời', isVideo: true },
      { src: 'k11-12/video.mp4', caption: 'Chad Sigma male', isVideo: true },
      { src: 'k11-12/video2.mp4', caption: 'Yamateeeee', isVideo: true },
    ]
  },
  k1213: {
    name: 'K12–13',
    sub: 'Niên khóa 2012 – 2013',
    color: '#ffd166',
    items: [
    ]
  },
  k1314: {
    name: 'K13–14',
    sub: 'Niên khóa 2013 – 2014',
    color: '#ff9e6d',
    items: [
    ]
  },
  k1415: {
    name: 'K14–15',
    sub: 'Niên khóa 2014 – 2015',
    color: '#06d6a0',
    items: [
    ]
  },
  k1516: {
    name: 'K15–16',
    sub: 'Niên khóa 2015 – 2016',
    color: '#74b9ff',
    items: [
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
  document.getElementById('gallery-heading-sub').textContent = group.sub + ' — ' + group.items.length + ' items';

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

document.addEventListener('keydown', e => {
  if (!overlay.classList.contains('active')) return;
  if (e.key === 'Escape')     fsCloseModal();
  if (e.key === 'ArrowLeft')  fsShow(fsCurrent - 1);
  if (e.key === 'ArrowRight') fsShow(fsCurrent + 1);
});