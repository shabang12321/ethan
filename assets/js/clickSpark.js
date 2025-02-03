function createClickSpark({
    sparkColor = '#fff',
    sparkSize = 10,
    sparkRadius = 15,
    sparkCount = 8,
    duration = 400,
    easing = 'ease-out',
    extraScale = 1.0
} = {}) {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        width: 100%;
        height: 100%;
        display: block;
        user-select: none;
        position: fixed;
        top: 0;
        left: 0;
        pointer-events: none;
        z-index: 9999;
    `;
    document.body.appendChild(canvas);

    let sparks = [];
    let startTime = null;

    function easeFunc(t) {
        switch (easing) {
            case 'linear':
                return t;
            case 'ease-in':
                return t * t;
            case 'ease-in-out':
                return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            default:
                return t * (2 - t);
        }
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const ctx = canvas.getContext('2d');

    function draw(timestamp) {
        if (!startTime) startTime = timestamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        sparks = sparks.filter(spark => {
            const elapsed = timestamp - spark.startTime;
            if (elapsed >= duration) return false;

            const progress = elapsed / duration;
            const eased = easeFunc(progress);

            const distance = eased * sparkRadius * extraScale;
            const lineLength = sparkSize * (1 - eased);

            const x1 = spark.x + distance * Math.cos(spark.angle);
            const y1 = spark.y + distance * Math.sin(spark.angle);
            const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
            const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

            ctx.strokeStyle = sparkColor;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();

            return true;
        });

        requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);

    function handleClick(e) {
        const x = e.clientX;
        const y = e.clientY;

        const now = performance.now();
        const newSparks = Array.from({ length: sparkCount }, (_, i) => ({
            x,
            y,
            angle: (2 * Math.PI * i) / sparkCount,
            startTime: now
        }));

        sparks.push(...newSparks);
    }

    document.addEventListener('click', handleClick);

    // Return cleanup function
    return () => {
        document.removeEventListener('click', handleClick);
        window.removeEventListener('resize', resizeCanvas);
        document.body.removeChild(canvas);
    };
} 