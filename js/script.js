// Custom cursor
const cursor = document.getElementById('cursor');
const dot = document.getElementById('cursor-dot');
let mx = 0, my = 0, cx = 0, cy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left = mx + 'px';
  dot.style.top = my + 'px';
});

function animateCursor() {
  cx += (mx - cx) * 0.12;
  cy += (my - cy) * 0.12;
  cursor.style.left = cx + 'px';
  cursor.style.top = cy + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .project-item, .stack-item').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// Falling leaves / petals
const canvas = document.getElementById('leaf-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const COLORS = ['#6B8F5E', '#A8C5A0', '#3D5C3A', '#9C8E7A', '#7A9BB5'];

class Leaf {
  constructor() { this.reset(true); }
  reset(init) {
    this.x = Math.random() * canvas.width;
    this.y = init ? Math.random() * canvas.height : -20;
    this.size = 3 + Math.random() * 5;
    this.speed = 0.4 + Math.random() * 0.8;
    this.drift = (Math.random() - 0.5) * 0.6;
    this.rot = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.03;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.opacity = 0.2 + Math.random() * 0.5;
    this.shape = Math.random() > 0.5 ? 'oval' : 'petal';
  }
  update() {
    this.y += this.speed;
    this.x += this.drift + Math.sin(this.y * 0.01) * 0.3;
    this.rot += this.rotSpeed;
    if (this.y > canvas.height + 20) this.reset(false);
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rot);
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    if (this.shape === 'oval') {
      ctx.ellipse(0, 0, this.size, this.size * 1.8, 0, 0, Math.PI * 2);
    } else {
      ctx.moveTo(0, -this.size * 2);
      ctx.bezierCurveTo(this.size, -this.size, this.size, this.size, 0, this.size * 2);
      ctx.bezierCurveTo(-this.size, this.size, -this.size, -this.size, 0, -this.size * 2);
    }
    ctx.fill();
    ctx.restore();
  }
}

const leaves = Array.from({ length: 28 }, () => new Leaf());

function animateLeaves() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  leaves.forEach(l => { l.update(); l.draw(); });
  requestAnimationFrame(animateLeaves);
}
animateLeaves();

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

