document.addEventListener('DOMContentLoaded', function() {
    const autoScrollToggle = document.getElementById('autoscroll-toggle');
    let isAutoScrolling = false;
    let scrollInterval;
    const scrollSpeed = 4; // Increased speed
    
    function startAutoScroll() {
        if (!isAutoScrolling) {
            isAutoScrolling = true;
            autoScrollToggle.classList.add('active');
            
            let lastTime = performance.now();
            scrollInterval = setInterval(() => {
                const currentTime = performance.now();
                const deltaTime = currentTime - lastTime;
                lastTime = currentTime;

                window.scrollBy({
                    top: scrollSpeed * deltaTime / 16, // Smooth speed based on frame time
                    behavior: 'smooth'
                });

                // Check if we've reached the bottom
                if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight) {
                    stopAutoScroll();
                }
            }, 16); // 60fps timing
        }
    }

    function stopAutoScroll() {
        if (isAutoScrolling) {
            isAutoScrolling = false;
            autoScrollToggle.classList.remove('active');
            clearInterval(scrollInterval);
        }
    }

    // Toggle auto-scroll on button click
    if (autoScrollToggle) {
        autoScrollToggle.addEventListener('click', () => {
            console.log('Auto-scroll button clicked');
            if (isAutoScrolling) {
                stopAutoScroll();
            } else {
                startAutoScroll();
            }
        });
    } else {
        console.error('Auto-scroll button not found!');
    }

    // Stop on user interaction
    const stopOnInteraction = () => {
        if (isAutoScrolling) {
            stopAutoScroll();
        }
    };

    document.addEventListener('wheel', stopOnInteraction);
    document.addEventListener('touchstart', stopOnInteraction);
    document.addEventListener('keydown', stopOnInteraction);
});
