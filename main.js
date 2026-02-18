const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
const particleCount = 60; 

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() - 0.5) * 0.15;
        this.speedY = (Math.random() - 0.5) * 0.15;
        this.opacity = Math.random() * 0.2 + 0.05; 
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = `rgba(52, 211, 153, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

const portfolioItems = [
    { 
        type: 'image', title: 'Product Showcase', category: '3D Modeling', aspect: 'aspect-[3/4]', 
        image: '000 (7).png', 
        gradient: 'from-purple-900 to-indigo-900', icon: 'fas fa-user-astronaut', iconColor: 'text-purple-300',
        description: "A mix of 3D modeling and AI for a perfect and clean result",
        tags: ["Blender", "AI"]
    },
    { 
        type: 'slider', title: 'Behind the scene', category: '3D Animation', aspect: 'aspect-[4/3]', 
        beforeLabel: 'Wireframe', afterLabel: 'Render',
        beforeImage: '0000004.jpg',
        afterImage: '0000004-.jpg',
        description: "An Engine Model and animation showing the underlying topology vs the final path-traced render. Created in Blender using Cycles.",
        tags: ["Blender", "Cycles", "Hard Surface"]
    },
    { 
        type: 'video', title: '3D Animation', category: 'Animation', duration: '0:50', aspect: 'aspect-square',
        videoSrc: '000-000.mp4', 
        description: "A 3D Animation showcasing the new Generation of Air Conditioners or as they call it Polymer Cooler",
        tags: ["Blender"]
    },
    { 
        type: 'quote', text: "Loading Fact...", 
        author: "System", gradient: 'from-slate-800 to-slate-900',
        description: "A fun API integration I added to keep things interesting!",
        tags: ["API", "JavaScript"]
    },
     { type: 'image', title: 'Product Viz', category: 'Rendering', aspect: 'aspect-video', image: '000 (9).png', gradient: 'from-lime-900 to-emerald-900', icon: 'fas fa-box', iconColor: 'text-lime-300', description: "Photorealistic product visualization for a commercial client. Focused on studio lighting and material accuracy.", tags: ["Blender", "AI"] },
    { type: 'image', title: 'Product Viz', category: 'Realistic Rendering', aspect: 'aspect-square', image: '000-000-0.jpg', gradient: 'from-teal-900 to-green-900', icon: 'fas fa-dice-d20', iconColor: 'text-teal-300', description: "helping someone having his pot eternally", tags: ["Blender"] },
    { type: 'image', title: 'Product Viz', category: 'Rendering', aspect: 'aspect-[3/4]', image: '000 (13).png', gradient: 'from-green-950 to-emerald-950', icon: 'fas fa-dragon', iconColor: 'text-green-400', description: "Product advertisment design", tags: ["Blender", "AI"] },
    { type: 'video', title: 'Announcment', category: 'Animation', duration: '1:34', aspect: 'aspect-video', videoSrc: 'Video 2026-02-10 02-56-54_audio.mp4', description: "the announcement motiongraphic for hackathon at Sharif University", tags: ["After Effects" , "Illustrator"] },
    { type: 'image', title: 'Product viz', category: 'Modeling', aspect: 'aspect-square', image: '000 (12).png', gradient: 'from-stone-900 to-emerald-950', icon: 'fas fa-robot', iconColor: 'text-stone-400', description: "Mixing AI with 3D modeling to reach higher heights", tags: ["Blender", "AI"] },
	{ type: 'image', title: 'Product viz', category: 'Modeling', aspect: 'aspect-square', image: '000 (17).png', gradient: 'from-stone-900 to-emerald-950', icon: 'fas fa-robot', iconColor: 'text-stone-400', description: "Grabbing AI tools to help and make a better cloth!", tags: ["Blender", "AI"] },
	{ type: 'image', title: 'Product viz', category: 'Modeling', aspect: 'aspect-square', image: '00-000-0.jpg', gradient: 'from-stone-900 to-emerald-950', icon: 'fas fa-robot', iconColor: 'text-stone-400', description: "3D modeling of SunScreens", tags: ["Blender"] },
	{ type: 'image', title: 'Product viz', category: 'Modeling', aspect: 'aspect-square', image: '000 (15).jpg', gradient: 'from-stone-900 to-emerald-950', icon: 'fas fa-robot', iconColor: 'text-stone-400', description: "showcasing an eye care product by mixing 3D modeling and AI", tags: ["Blender", "AI"] }
];

const container = document.getElementById('gallery-container');
const modal = document.getElementById('project-modal');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

portfolioItems.forEach((item, index) => {
    let content = '';
    
    // SLIDER
    if (item.type === 'slider') {
        const beforeStyle = item.beforeImage ? `background-image: url('${item.beforeImage}'); background-size: cover;` : `background-color: #064e3b;`;
        const afterStyle = item.afterImage ? `background-image: url('${item.afterImage}'); background-size: cover;` : `background-color: #022c22;`;
        content = `
            <div class="relative w-full ${item.aspect} group select-none slider-container z-10" id="slider-${index}">
                <div class="absolute inset-0 h-full w-full bg-cover bg-center" style="${afterStyle}">
                    ${!item.afterImage ? `<div class="w-full h-full flex items-center justify-center text-center"><h3 class="font-bold tracking-widest uppercase text-sm">${item.afterLabel}</h3></div>` : ''}
                </div>
                <div class="before-layer absolute inset-0 h-full w-full bg-cover bg-center z-10" style="clip-path: inset(0 50% 0 0); ${beforeStyle}">
                     ${!item.beforeImage ? `<div class="w-full h-full flex items-center justify-center text-emerald-200/50 text-center"><h3 class="font-bold tracking-widest uppercase text-sm">${item.beforeLabel}</h3></div>` : ''}
                </div>
                <input type="range" min="0" max="100" value="50" step="0.1" class="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30" oninput="trackDrag(this)">
                <div class="slider-handle absolute inset-y-0 left-1/2 pointer-events-none z-20 flex items-center justify-center -ml-5"><div class="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-white shadow-lg border border-white/20"><i class="fas fa-arrows-alt-h text-xs"></i></div></div>
            </div>
            <div class="p-5 relative z-10 border-t border-white/5 bg-slate-900/50"><h3 class="font-semibold text-lg text-white mb-1">${item.title}</h3><p class="text-[10px] font-bold uppercase tracking-widest text-emerald-400">${item.category}</p></div>`;
    
    // STANDARD (Image/Video)
    } else {
        let visual = '';
        const aspectClass = (item.image || (item.type === 'video' && item.videoSrc)) ? '' : item.aspect;

        if (item.type === 'video') {
             visual = item.videoSrc ? 
                `<video src="${item.videoSrc}" class="w-full h-auto block" controls playsinline loop></video>` : 
                `<div class="bg-black/40 w-full h-full flex items-center justify-center"><i class="fas fa-play text-2xl text-white/50"></i></div>`;
        } else {
            visual = item.image ? 
                `<div class="tint-wrapper w-full h-full"><img src="${item.image}" class="w-full h-full object-cover" alt="${item.title}"></div>` : 
                `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br ${item.gradient}"><i class="${item.icon} text-5xl ${item.iconColor} opacity-50"></i></div>`;
        }
        
        content = `
            <div class="relative w-full ${aspectClass} overflow-hidden z-10">${visual}</div>
            <div class="p-5 relative z-10 border-t border-white/5 bg-slate-900/50"><h3 class="font-semibold text-lg text-white mb-1">${item.title}</h3><p class="text-[10px] font-bold uppercase tracking-widest text-emerald-400">${item.category}</p></div>`;
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'masonry-item group animate-enter cursor-pointer';
    wrapper.style.animationDelay = `${index * 150}ms`;
    wrapper.onclick = (e) => openModal(index, e);
    
    wrapper.innerHTML = `
        <div class="card-inner w-full h-full relative glass-card overflow-hidden" onmousemove="handleTilt(event, this)" onmouseleave="resetTilt(this)">
            <div class="card-shine"></div>
            ${content}
        </div>`;
    
    container.appendChild(wrapper);
    observer.observe(wrapper);

    if (item.type === 'quote') fetchRandomFact(wrapper);
});

function openModal(index, event) {
    if (event.target.tagName === 'VIDEO' || event.target.tagName === 'INPUT') return;
    const item = portfolioItems[index];
    if (!item) return;

    document.getElementById('modal-category').innerText = item.category;
    document.getElementById('modal-title').innerText = item.title || "Project Detail";
    document.getElementById('modal-desc').innerText = item.description || "No description available.";
    
    const modalImg = document.getElementById('modal-img');
    const modalBlurBg = document.getElementById('modal-blur-bg');
    let bgUrl = '';

    if(item.image) {
        bgUrl = item.image;
        modalImg.src = bgUrl;
        modalImg.style.display = 'block';
    } else if (item.afterImage) {
        bgUrl = item.afterImage; 
        modalImg.src = bgUrl;
        modalImg.style.display = 'block';
    } else {
        modalImg.style.display = 'none'; 
        bgUrl = ''; 
    }
   
    if(bgUrl) {
        modalBlurBg.style.backgroundImage = `url('${bgUrl}')`;
    } else {
        modalBlurBg.style.backgroundImage = 'none';
    }

    // Tags
    const tagsContainer = document.getElementById('modal-tags');
    tagsContainer.innerHTML = '';
    if(item.tags) {
        item.tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = "px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300";
            span.innerText = tag;
            tagsContainer.appendChild(span);
        });
    }

    modal.classList.remove('project-modal-hidden');
    modal.classList.add('active');
}

function closeModal(event) {
    if (event.target === modal || event.currentTarget.id === 'modal-close-btn') {
        modal.classList.remove('active');
        setTimeout(() => modal.classList.add('project-modal-hidden'), 300); 
    }
}
document.getElementById('modal-close-btn').addEventListener('click', (e) => closeModal(e));

function copyEmail() {
    navigator.clipboard.writeText("hello@johndoe.com");
    const btnText = document.getElementById('email-btn-text');
    const original = btnText.innerText;
    btnText.innerText = "COPIED!";
    setTimeout(() => btnText.innerText = original, 2000);
}

function handleTilt(e, card) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xRot = -((y - rect.height/2) / rect.height) * 4;
    const yRot = ((x - rect.width/2) / rect.width) * 4;
    
    card.style.transform = `perspective(1000px) rotateX(${xRot}deg) rotateY(${yRot}deg) scale(1.01)`;
    
    const shine = card.querySelector('.card-shine');
    if(shine) shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 60%)`;
}

function resetTilt(card) {
    card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
}

// Slider Logic
function trackDrag(input) {
    const container = input.closest('.slider-container');
    container.querySelector('.before-layer').style.clipPath = `inset(0 ${100 - input.value}% 0 0)`;
    container.querySelector('.slider-handle').style.left = input.value + "%";
}

// Quote Fetcher
async function fetchRandomFact(cardWrapper) {
    const textEl = cardWrapper.querySelector('.quote-text');
    const authorEl = cardWrapper.querySelector('.quote-author');
    const safeFacts = ["Honey never spoils.", "Octopuses have three hearts.", "Bananas grow towards the sun."];
    try {
        const res = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en');
        const data = await res.json();
        textEl.innerText = `"${data.text}"`;
        authorEl.innerText = "Daily Fact";
    } catch {
        textEl.innerText = `"${safeFacts[Math.floor(Math.random() * safeFacts.length)]}"`;
        authorEl.innerText = "Fun Fact";
    }
}

let viewCount = 0;
function incrementViewCount() {
    viewCount++;
}

function createParticles(x, y) {
    for(let i=0; i<8; i++) {
        const p = document.createElement('div');
        p.style.position = 'fixed';
        p.style.left = x + 'px';
        p.style.top = y + 'px';
        p.style.width = '4px'; p.style.height = '4px';
        p.style.background = '#10b981';
        p.style.borderRadius = '50%';
        p.style.pointerEvents = 'none';
        p.style.zIndex = '9999';
        document.body.appendChild(p);
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 100 + 50;
        const anim = p.animate([
            { transform: 'translate(0,0) scale(1)', opacity: 1 },
            { transform: `translate(${Math.cos(angle)*velocity}px, ${Math.sin(angle)*velocity}px) scale(0)`, opacity: 0 }
        ], { duration: 600, easing: 'ease-out' });
        anim.onfinish = () => p.remove();
    }
}