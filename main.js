function createNightSky() {
    const container = document.body;
    
    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'star-bg';
        
        const size = Math.random() * 1.5;
        const opacity = 0.2 + Math.random() * 0.5;
        const duration = 3 + Math.random() * 7;
        
        star.style.cssText = `
            position: absolute;
            top: ${Math.random() * 100}vh;
            left: ${Math.random() * 100}vw;
            width: ${size}px;
            height: ${size}px;
            background: white;
            border-radius: 50%;
            opacity: ${opacity};
            animation: twinkle ${duration}s infinite ${Math.random() * 5}s;
            pointer-events: none;
            z-index: 0;
        `;
        
        container.appendChild(star);
    }
    
    
    const elements = ['❀', '💝', '✦', '✧', '❤️', '💖'];
    for (let i = 0; i < 12; i++) {
        const el = document.createElement('div');
        el.className = 'floating-element';
        el.innerHTML = elements[Math.floor(Math.random() * elements.length)];
        el.style.left = Math.random() * 100 + 'vw';
        el.style.animationDuration = (5 + Math.random() * 10) + 's';
        el.style.animationDelay = Math.random() * 5 + 's';
        el.style.color = `hsl(${160 + Math.random() * 60}, 80%, 70%)`;
        container.appendChild(el);
    }
}

window.addEventListener('load', createNightSky);