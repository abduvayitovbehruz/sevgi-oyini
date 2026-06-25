'use strict';

const CRY_VIDEO = '';

const $ = id => document.getElementById(id);

const screens = {
  main:      $('screen-main'),
  confirm:   $('screen-confirm'),
  celebrate: $('screen-celebrate'),
  cry:       $('screen-cry'),
};

function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

const noBtn      = $('btn-no');
const escapeHint = $('escape-hint');
let noTries      = 0;
let escaped      = false;

function safeZone() {
  const vw = document.documentElement.clientWidth;
  const vh = document.documentElement.clientHeight;
  const bw = noBtn.offsetWidth  || 130;
  const bh = noBtn.offsetHeight || 50;
  const pad = 16;
  return {
    minX: pad,
    minY: pad,
    maxX: vw - bw - pad,
    maxY: vh - bh - pad,
  };
}

function escapeNoBtn() {
  if (!escaped) {
    escaped = true;
    document.body.appendChild(noBtn);
    noBtn.style.position = 'fixed';
    noBtn.style.margin   = '0';
    noBtn.style.zIndex   = '9999';
    const r = noBtn.getBoundingClientRect();
    noBtn.style.left = r.left + 'px';
    noBtn.style.top  = r.top  + 'px';
    noBtn.style.transition = 'left 0.25s cubic-bezier(.34,1.56,.64,1), top 0.25s cubic-bezier(.34,1.56,.64,1)';
  }
  moveNoBtn();
}

function moveNoBtn() {
  noTries++;
  const z  = safeZone();
  const cx = parseFloat(noBtn.style.left) || z.minX;
  const cy = parseFloat(noBtn.style.top)  || z.minY;
  let nx, ny, tries = 0;
  do {
    nx = z.minX + Math.random() * (z.maxX - z.minX);
    ny = z.minY + Math.random() * (z.maxY - z.minY);
    tries++;
  } while (
    Math.abs(nx - cx) < 90 &&
    Math.abs(ny - cy) < 60 &&
    tries < 60
  );
  nx = Math.max(z.minX, Math.min(nx, z.maxX));
  ny = Math.max(z.minY, Math.min(ny, z.maxY));
  noBtn.style.left = nx + 'px';
  noBtn.style.top  = ny + 'px';
  escapeHint.textContent = noTries === 1
    ? 'Qochib ketdi! 😏'
    : noTries + ' marta qochdi! 😂';
}

function resetNoBtn() {
  escaped  = false;
  noTries  = 0;
  escapeHint.textContent = '';
  noBtn.style.position   = '';
  noBtn.style.left       = '';
  noBtn.style.top        = '';
  noBtn.style.margin     = '';
  noBtn.style.transition = '';
  noBtn.style.zIndex     = '';
  const group = $('main-btns');
  if (group && !group.contains(noBtn)) group.appendChild(noBtn);
}

noBtn.addEventListener('mouseenter', escapeNoBtn);
noBtn.addEventListener('touchstart', function(e) {
  e.preventDefault();
  escapeNoBtn();
}, { passive: false });

$('btn-yes-main').addEventListener('click', () => showScreen('confirm'));

$('btn-confirm-yes').addEventListener('click', () => {
  showScreen('celebrate');
  spawnConfetti();
  spawnFloatingHearts();
});

$('btn-confirm-no').addEventListener('click', () => {
  showScreen('cry');
  window.open('cry.html', '_blank');
});

$('btn-restart-cel').addEventListener('click', restart);
$('btn-restart-cry').addEventListener('click', restart);

function restart() {
  resetNoBtn();
  stopConfetti();
  showScreen('main');
}

document.addEventListener('DOMContentLoaded', () => {
  spawnDecoHearts('deco-main');
  spawnDecoHearts('deco-confirm');
  spawnFloatingParticles();
});

const COLORS = ['#ff6b9d','#e8304a','#ffb347','#b06bbf','#6bc5f8','#5dde85','#ffd166','#ff9de2'];
let confettiFrame = null;

function spawnConfetti() {
  stopConfetti();
  const wrap = $('confetti-wrap');
  wrap.innerHTML = '';
  let loops = 0;
  function batch() {
    if (loops++ > 7) return;
    for (let i = 0; i < 25; i++) {
      const el = document.createElement('div');
      el.className = 'confetti-piece';
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      el.style.cssText =
        'left:' + (Math.random()*100) + 'vw;' +
        'top:-20px;' +
        'background:' + color + ';' +
        'width:' + (6+Math.random()*10) + 'px;' +
        'height:' + (8+Math.random()*14) + 'px;' +
        'border-radius:' + (Math.random()>.5?'50%':'3px') + ';' +
        'animation-duration:' + (1.8+Math.random()*2) + 's;' +
        'animation-delay:' + (Math.random()*.4) + 's;';
      wrap.appendChild(el);
      setTimeout(() => el.remove(), 4500);
    }
    confettiFrame = setTimeout(batch, 900);
  }
  batch();
}

function stopConfetti() {
  clearTimeout(confettiFrame);
  const wrap = $('confetti-wrap');
  if (wrap) wrap.innerHTML = '';
}

function spawnFloatingHearts() {
  const card = document.querySelector('#screen-celebrate .card');
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      const el = document.createElementNS('http://www.w3.org/2000/svg','svg');
      el.setAttribute('viewBox','0 0 100 90');
      const s = 18 + Math.random() * 20;
      el.setAttribute('width', s + 'px');
      el.setAttribute('height', s + 'px');
      el.classList.add('mini-heart');
      el.innerHTML = '<path d="M50 85C50 85 5 52 5 28C5 14 14 5 27 5C36 5 44 10 50 18C56 10 64 5 73 5C86 5 95 14 95 28C95 52 50 85 50 85Z" fill="' + COLORS[Math.floor(Math.random()*4)] + '"/>';
      el.style.cssText = 'left:' + (10+Math.random()*80) + '%;bottom:15%;animation-duration:' + (1+Math.random()*1.5) + 's;';
      card.appendChild(el);
      setTimeout(() => el.remove(), 2500);
    }, i * 200);
  }
}

function spawnDecoHearts(id) {
  const wrap = $(id);
  if (!wrap) return;
  [
    {x:'7%', y:'7%', s:26, c:'#ffb3cc', d:0},
    {x:'87%',y:'5%', s:20, c:'#e8304a', d:.4},
    {x:'4%', y:'74%',s:17, c:'#ffb3cc', d:.8},
    {x:'83%',y:'72%',s:19, c:'#e8304a', d:.3},
    {x:'50%',y:'3%', s:15, c:'#ff6b9d', d:.6},
    {x:'17%',y:'86%',s:13, c:'#ffb3cc', d:1},
    {x:'76%',y:'87%',s:17, c:'#ff6b9d', d:.2},
  ].forEach(cfg => {
    const el = document.createElementNS('http://www.w3.org/2000/svg','svg');
    el.setAttribute('viewBox','0 0 100 90');
    el.setAttribute('width', cfg.s+'px');
    el.setAttribute('height', cfg.s+'px');
    el.classList.add('deco-heart');
    el.innerHTML = '<path d="M50 85C50 85 5 52 5 28C5 14 14 5 27 5C36 5 44 10 50 18C56 10 64 5 73 5C86 5 95 14 95 28C95 52 50 85 50 85Z" fill="' + cfg.c + '"/>';
    el.style.cssText = 'left:'+cfg.x+';top:'+cfg.y+';animation-duration:'+(2+Math.random()*1.5)+'s;animation-delay:'+cfg.d+'s;';
    wrap.appendChild(el);
  });
}

function spawnFloatingParticles() {
  const wrap = $('particles');
  setInterval(() => {
    const el = document.createElementNS('http://www.w3.org/2000/svg','svg');
    const s  = 8 + Math.random() * 14;
    el.setAttribute('viewBox','0 0 100 90');
    el.setAttribute('width', s+'px');
    el.setAttribute('height', s+'px');
    el.style.cssText = 'position:fixed;left:'+(Math.random()*100)+'vw;bottom:-20px;pointer-events:none;z-index:0;opacity:0.45;animation:float-heart '+(3+Math.random()*3)+'s linear forwards;';
    el.innerHTML = '<path d="M50 85C50 85 5 52 5 28C5 14 14 5 27 5C36 5 44 10 50 18C56 10 64 5 73 5C86 5 95 14 95 28C95 52 50 85 50 85Z" fill="#ffb3cc"/>';
    wrap.appendChild(el);

    function showScreen(name) {

    const noBtn = document.getElementById('btn-no');
    if (name !== 'main' && noBtn) {
        noBtn.remove();
    }
    

    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[name].classList.add('active');
}
    setTimeout(() => el.remove(), 6000);
  }, 1000);
}
