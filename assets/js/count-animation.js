function animateNumber(element, start, end, duration = 2000, separator = ",") {
    // Ensure we're working with numbers
    start = parseInt(start) || 0;
    end = parseInt(end) || 0;
    
    const startTime = performance.now();
    const range = end - start;
    
    // Easing function (easeOutExpo)
    function easeOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }
    
    function formatNumber(num) {
        return new Intl.NumberFormat('en-US').format(Math.floor(num)).replace(/,/g, separator);
    }
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Apply easing
        const easedProgress = easeOutExpo(progress);
        const currentValue = start + (range * easedProgress);
        
        // Update element with formatted number
        element.textContent = formatNumber(currentValue);
        
        // Continue animation if not complete
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
} 