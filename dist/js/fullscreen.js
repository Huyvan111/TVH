// fullscreen.js - attach click handlers to gallery images and show an overlay
(function(){
  function createOverlay(){
    const overlay = document.createElement('div');
    overlay.className = 'fs-overlay';

    const media = document.createElement('div');
    // will contain img or video
    overlay.appendChild(media);

    const close = document.createElement('button');
    close.className = 'fs-close';
    close.innerText = 'Close';
    overlay.appendChild(close);

    const caption = document.createElement('div');
    caption.className = 'fs-caption';
    overlay.appendChild(caption);

    // close handlers
    function hide(){
      overlay.classList.remove('visible');
      setTimeout(()=>{ media.innerHTML = ''; caption.textContent = ''; }, 200);
    }

    close.addEventListener('click', hide);
    overlay.addEventListener('click', function(e){ if(e.target===overlay) hide(); });
    document.addEventListener('keydown', function(e){ if(e.key==='Escape') hide(); });

    document.body.appendChild(overlay);
    return {overlay, media, caption, hide};
  }

  // init after DOM ready
  function init(){
    const galleryItems = document.querySelectorAll('.gallery-container .gallery-item');
    if(!galleryItems.length) return;
    const {overlay, media, caption} = createOverlay();

    galleryItems.forEach(function(item){
      item.style.cursor = 'pointer';
      item.addEventListener('click', function(){
        // clear previous
        media.innerHTML = '';
        const imgEl = item.querySelector('img');
        const vidEl = item.querySelector('video');
        if(imgEl){
          const copy = document.createElement('img');
          copy.src = imgEl.src;
          copy.alt = imgEl.alt || '';
          media.appendChild(copy);
        } else if(vidEl){
          const copy = document.createElement('video');
          copy.src = vidEl.src;
          copy.controls = true;
          copy.autoplay = true;
          copy.style.maxWidth = '95%';
          copy.style.maxHeight = '95%';
          media.appendChild(copy);
        }
        caption.textContent = (imgEl? imgEl.alt : (vidEl? vidEl.alt : '')) || '';
        overlay.classList.add('visible');
      });
    });
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
