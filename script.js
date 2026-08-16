document.addEventListener("DOMContentLoaded", () => {
    // ----------------------------------------------------
    // 1. COUNTDOWN TIMER (Preserving and fixing potential usages)
    // ----------------------------------------------------
    const countdownElement = document.getElementById("countdown");
    if (countdownElement) {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 30);

        function updateCountdown() {
            const now = new Date();
            const difference = targetDate - now;

            if (difference <= 0) {
                countdownElement.textContent = "We are live!";
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // ----------------------------------------------------
    // 2. HERO / ENTRANCE ANIMATIONS (Page Load)
    // ----------------------------------------------------
    
    // Apply styling to logo wrapper
    const bannerLogo = document.querySelector(".banner-logo");
    if (bannerLogo) {
        bannerLogo.style.opacity = "0";
        bannerLogo.style.transform = "translate(-50%, -30px)";
        bannerLogo.style.transition = "opacity 1.2s cubic-bezier(0.25, 1, 0.5, 1), transform 1.2s cubic-bezier(0.25, 1, 0.5, 1)";
        
        setTimeout(() => {
            bannerLogo.style.opacity = "1";
            bannerLogo.style.transform = "translate(-50%, 0)";
        }, 100);
    }

    // Apply styling to banner image (Subtle zoom-out scale effect)
    const bannerImg = document.querySelector(".banner-img");
    if (bannerImg) {
        bannerImg.style.transform = "scale(1.08)";
        bannerImg.style.transition = "transform 2.5s cubic-bezier(0.25, 1, 0.5, 1)";
        setTimeout(() => {
            bannerImg.style.transform = "scale(1)";
        }, 100);
    }

    // Apply styling to banner overlay text elements
    const bannerOverlay = document.querySelector(".banner-overlay");
    if (bannerOverlay) {
        bannerOverlay.style.opacity = "0";
        bannerOverlay.style.transform = "translate(-50%, calc(-50% + 45px))";
        bannerOverlay.style.transition = "opacity 1.5s cubic-bezier(0.25, 1, 0.5, 1), transform 1.5s cubic-bezier(0.25, 1, 0.5, 1)";
        
        setTimeout(() => {
            bannerOverlay.style.opacity = "1";
            bannerOverlay.style.transform = "translate(-50%, -50%)";
        }, 300);
    }

    // ----------------------------------------------------
    // 3. SCROLL REVEAL ANIMATIONS (Intersection Observer)
    // ----------------------------------------------------
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Register elements for scroll reveal
    const animatedElements = [];
    
    // Service title
    const serviceTitle = document.querySelector(".services-section .section-title");
    if (serviceTitle) animatedElements.push(serviceTitle);

    // Leadership box
    const leadershipBox = document.querySelector(".leadership-box");
    if (leadershipBox) animatedElements.push(leadershipBox);

    // Commitment container
    const commitmentContainer = document.querySelector(".commitment-container");
    if (commitmentContainer) animatedElements.push(commitmentContainer);

    // Footer contact and logo
    const contactInfo = document.querySelector(".contact-info");
    const footerLogo = document.querySelector(".footer-logo");
    if (contactInfo) animatedElements.push(contactInfo);
    if (footerLogo) animatedElements.push(footerLogo);

    // Apply base styles and start observing
    animatedElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 1s cubic-bezier(0.25, 1, 0.5, 1), transform 1s cubic-bezier(0.25, 1, 0.5, 1)";
        revealObserver.observe(el);
    });

    // Stagger reveal for Service Cards
    const serviceCards = document.querySelectorAll(".service-card");
    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const index = card.getAttribute("data-index") || 0;
                setTimeout(() => {
                    card.style.opacity = "1";
                    card.style.transform = "translateY(0)";
                }, index * 80); // Stagger timing
                observer.unobserve(card);
            }
        });
    }, revealOptions);

    serviceCards.forEach((card, idx) => {
        card.setAttribute("data-index", idx);
        card.style.opacity = "0";
        card.style.transform = "translateY(40px)";
        card.style.transition = "opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease, background-color 0.3s ease, border-color 0.3s ease";
        cardObserver.observe(card);
    });

    // ----------------------------------------------------
    // 4. MICRO-INTERACTIONS (JS Hover Effects)
    // ----------------------------------------------------

    // Service Cards Hover Effects
    serviceCards.forEach(card => {
        const icon = card.querySelector(".icon");
        if (icon) {
            icon.style.transition = "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), color 0.3s ease";
        }
        
        card.addEventListener("mouseenter", () => {
            card.style.transform = "translateY(-8px) scale(1.03)";
            card.style.boxShadow = "0 12px 24px rgba(75, 155, 52, 0.15)";
            card.style.borderColor = "rgba(75, 155, 52, 0.4)";
            if (icon) {
                icon.style.transform = "scale(1.2) rotate(10deg)";
                icon.style.color = "#4b9b34";
            }
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "translateY(0) scale(1)";
            card.style.boxShadow = "";
            card.style.borderColor = "";
            if (icon) {
                icon.style.transform = "scale(1) rotate(0deg)";
                icon.style.color = "";
            }
        });
    });

    // Leader Profiles Hover
    const leaderProfiles = document.querySelectorAll(".leader-profile");
    leaderProfiles.forEach(profile => {
        const avatar = profile.querySelector(".leader-avatar");
        profile.style.transition = "transform 0.4s ease, box-shadow 0.4s ease, background-color 0.4s ease";
        profile.style.borderRadius = "8px";
        if (avatar) {
            avatar.style.transition = "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0.4s ease";
        }

        profile.addEventListener("mouseenter", () => {
            profile.style.transform = "scale(1.02)";
            profile.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
            if (avatar) {
                avatar.style.transform = "scale(1.1) rotate(-5deg)";
                avatar.style.backgroundColor = "#4b9b34";
            }
        });

        profile.addEventListener("mouseleave", () => {
            profile.style.transform = "scale(1)";
            profile.style.backgroundColor = "";
            if (avatar) {
                avatar.style.transform = "scale(1) rotate(0deg)";
                avatar.style.backgroundColor = "";
            }
        });
    });

    // Commitment Icons hover micro-animations
    const shieldIcon = document.querySelector(".shield-icon");
    const handshakeIcon = document.querySelector(".handshake-icon");

    [shieldIcon, handshakeIcon].forEach(iconBox => {
        if (iconBox) {
            const icon = iconBox.querySelector("i");
            if (icon) {
                icon.style.transition = "transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
                iconBox.addEventListener("mouseenter", () => {
                    icon.style.transform = "scale(1.3) rotate(15deg)";
                });
                iconBox.addEventListener("mouseleave", () => {
                    icon.style.transform = "scale(1) rotate(0deg)";
                });
            }
        }
    });

    // ----------------------------------------------------
    // 5. GEOMETRIC BACKGROUND PARTICLES (Canvas)
    // ----------------------------------------------------
    const servicesSection = document.querySelector(".services-section");
    if (servicesSection) {
        servicesSection.style.position = "relative";
        
        // Ensure child contents are layered above canvas
        const children = servicesSection.children;
        for (let child of children) {
            if (window.getComputedStyle(child).position === "static") {
                child.style.position = "relative";
                child.style.zIndex = "2";
            }
        }

        // Create Canvas
        const canvas = document.createElement("canvas");
        canvas.style.position = "absolute";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.pointerEvents = "none";
        canvas.style.zIndex = "1";
        canvas.style.opacity = "0.5";
        servicesSection.appendChild(canvas);

        const ctx = canvas.getContext("2d");
        let particles = [];
        const particleCount = 25;

        function resizeCanvas() {
            canvas.width = servicesSection.clientWidth;
            canvas.height = servicesSection.clientHeight;
        }
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        class BlueprintParticle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 8 + 4; // Square/grid sizes
                this.speedX = (Math.random() - 0.5) * 0.4;
                this.speedY = (Math.random() - 0.5) * 0.4;
                this.opacity = Math.random() * 0.3 + 0.1;
                this.rotation = Math.random() * Math.PI;
                this.rotationSpeed = (Math.random() - 0.5) * 0.01;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.rotation += this.rotationSpeed;

                // Wrap around edges
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                ctx.strokeStyle = `rgba(75, 155, 52, ${this.opacity})`;
                ctx.lineWidth = 1;
                // Draw blueprint construction outline (squares/crosses)
                ctx.strokeRect(-this.size/2, -this.size/2, this.size, this.size);
                
                // Add construction corner marks
                ctx.beginPath();
                ctx.moveTo(-this.size, 0);
                ctx.lineTo(this.size, 0);
                ctx.moveTo(0, -this.size);
                ctx.lineTo(0, this.size);
                ctx.strokeStyle = `rgba(75, 155, 52, ${this.opacity * 0.4})`;
                ctx.stroke();

                ctx.restore();
            }
        }

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new BlueprintParticle());
        }

        // Animation Loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        }
        animate();
    }
});
