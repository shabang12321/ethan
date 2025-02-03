function initMagnetLines() {
    const container = document.createElement('div');
    container.className = 'magnetLines-container';
    
    // Create grid of lines
    const rows = 12;  // Increased number of rows
    const columns = 12;  // Increased number of columns
    const total = rows * columns;
    
    for (let i = 0; i < total; i++) {
        const span = document.createElement('span');
        span.style.setProperty('--rotate', '0deg');
        container.appendChild(span);
    }
    
    container.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    
    // Add to header background
    const headerBackground = document.getElementById('header-background');
    headerBackground.appendChild(container);
    
    // Handle pointer movement
    const items = container.querySelectorAll('span');
    
    const onPointerMove = (event) => {
        const rect = container.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        items.forEach((item) => {
            const itemRect = item.getBoundingClientRect();
            const centerX = itemRect.x + itemRect.width / 2 - rect.left;
            const centerY = itemRect.y + itemRect.height / 2 - rect.top;
            
            const deltaX = x - centerX;
            const deltaY = y - centerY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            
            const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
            const intensity = Math.min(1, 100 / distance);
            
            item.style.setProperty('--rotate', `${angle}deg`);
            item.style.opacity = 0.3 + (intensity * 0.7);
        });
    };
    
    window.addEventListener('pointermove', onPointerMove);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initMagnetLines); 