// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }


// Header scroll effect with hide/show functionality - Optimized
const header = document.querySelector('.header');
let lastScrollTop = 0;
let ticking = false;
let scrollTimeout;

function updateHeader() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
    
    // Only hide header when scrolling down and past 100px
    if (scrollDirection === 'down' && scrollTop > 100) {
        header.style.transform = 'translateY(-100%)';
        header.style.transition = 'transform 0.3s ease-in-out';
    } 
    // Show header when scrolling up or at the top
    else if (scrollDirection === 'up' || scrollTop <= 100) {
        header.style.transform = 'translateY(0)';
        header.style.transition = 'transform 0.3s ease-in-out';
    }
    
    // Update background opacity based on scroll position
    if (scrollTop > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.15)';
        header.style.border = '1px solid rgba(255, 255, 255, 0.3)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.8)';
        header.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
        header.style.border = '1px solid rgba(255, 255, 255, 0.2)';
    }
    
    lastScrollTop = scrollTop;
    ticking = false;
}

// Optimized scroll handler with throttling
window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
    }
}, { passive: true });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .testimonial-card, .pricing-card, .stat-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    function animateCounter(element) {
        const target = parseInt(element.textContent.replace(/[^\d]/g, ''));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            const suffix = element.textContent.replace(/[\d]/g, '');
            element.textContent = Math.floor(current) + suffix;
        }, 16);
    }
});

// FAQ Accordion functionality
function toggleFAQ(element) {
    const faqItem = element.closest('.faq-item');
    if (!faqItem) return;
    
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items first
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}


// Project Filtering Functionality
function filterProjects(category) {
    const projectCards = document.querySelectorAll('.project-card');
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    // Update active button
    categoryBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter projects
    projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            card.classList.remove('hidden');
            setTimeout(() => {
                card.style.display = 'block';
            }, 100);
        } else {
            card.classList.add('hidden');
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
    
    // Track filter usage
    trackConversion('project_filter_used', { category: category });
}

// Enhanced project carousel (keeping for backward compatibility)
let currentProject = 0;
const projects = [
    {
        title: "Mobile App UI Design",
        description: "Moderne mobile Anwendung mit intuitiver Benutzeroberfläche und nahtloser Benutzererfahrung.",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80"
    },
    {
        title: "E-Commerce Website",
        description: "Komplette E-Commerce-Lösung mit Zahlungsintegration und Bestandsverwaltung.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    },
    {
        title: "Corporate Website",
        description: "Professionelle Unternehmenswebsite mit modernem Design und responsivem Layout.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80"
    },
    {
        title: "SaaS Dashboard",
        description: "Umfassendes Dashboard für SaaS-Anwendungen mit Analytics und Berichterstattung.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    }
];

function changeProject(direction) {
    currentProject += direction;
    
    if (currentProject >= projects.length) {
        currentProject = 0;
    } else if (currentProject < 0) {
        currentProject = projects.length - 1;
    }
    
    updateProjectDisplay();
}

function updateProjectDisplay() {
    const projectCard = document.querySelector('.project-card');
    const project = projects[currentProject];
    
    if (projectCard) {
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            </div>
        `;
    }
}

// Auto-rotate projects every 5 seconds
setInterval(() => {
    changeProject(1);
}, 5000);

// Form handling (if forms are added later)
function handleFormSubmit(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Show success message
        showNotification('Vielen Dank für Ihre Nachricht! Wir werden uns bald bei Ihnen melden.', 'success');
        
        // Reset form
        form.reset();
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }
    
    .notification-content button {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-content button:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);

// Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Performance optimization: Debounce scroll events - Optimized
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler for parallax effects
const optimizedScrollHandler = debounce(() => {
    // Scroll-based animations and effects
    const scrolled = window.pageYOffset;
    const parallax = document.querySelectorAll('.parallax');
    
    parallax.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}, 16); // Reduced from 10ms to 16ms for better performance

// Only add this scroll listener if there are parallax elements
if (document.querySelectorAll('.parallax').length > 0) {
    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
}



function submitBooking() {
    const form = document.querySelector('.booking-form');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate required fields
    if (!data.name || !data.email) {
        showNotification('Bitte füllen Sie alle Pflichtfelder aus.', 'error');
        return;
    }
    
    // Simulate booking submission
    showNotification('Termin erfolgreich gebucht! Wir melden uns innerhalb von 24h bei Ihnen.', 'success');
    closeBookingModal();
    
    // Track successful booking
    trackConversion('booking_completed');
    
    // Reset form
    form.reset();
}


// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Conversion tracking
function trackConversion(event) {
    console.log('Conversion Event:', event);
    // Here you would integrate with Google Analytics, Facebook Pixel, etc.
    // Example: gtag('event', event, { 'event_category': 'conversion' });
}


// Floating CTA Button
function createFloatingCTA() {
    const floatingCTA = document.createElement('button');
    floatingCTA.className = 'floating-cta';
    floatingCTA.innerHTML = '<i class="fas fa-calendar-check"></i> Termin buchen';
    floatingCTA.onclick = openBookingModal;
    
    document.body.appendChild(floatingCTA);
    
    // Show after 3 seconds
    setTimeout(() => {
        floatingCTA.style.display = 'flex';
    }, 3000);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Digitale Lösungen Website erfolgreich geladen!');
    
    // Create floating CTA
    createFloatingCTA();
    
});

// Client Logos Animation - Continuous running (no pause functionality)

// Calendar Booking System
let currentDate = new Date();
let selectedDate = null;
let selectedTime = null;

const monthNames = [
    "Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember"
];

const dayNames = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];

const timeSlots = [
    "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"
];

function generateCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    const currentMonthElement = document.getElementById('currentMonth');
    
    if (!calendarGrid || !currentMonthElement) return;
    
    // Update month display
    currentMonthElement.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    
    // Clear calendar
    calendarGrid.innerHTML = '';
    
    // Add day headers
    dayNames.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-header';
        dayHeader.textContent = day;
        calendarGrid.appendChild(dayHeader);
    });
    
    // Get first day of month and number of days
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day disabled';
        calendarGrid.appendChild(emptyDay);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        
        const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const today = new Date();
        
        // Check if it's today
        if (dayDate.toDateString() === today.toDateString()) {
            dayElement.classList.add('today');
        }
        
        // Check if it's in the past
        if (dayDate < today.setHours(0, 0, 0, 0)) {
            dayElement.classList.add('disabled');
        } else {
            // Add click event for selectable days
            dayElement.addEventListener('click', () => selectDate(dayDate));
        }
        
        // Check if it's selected
        if (selectedDate && dayDate.toDateString() === selectedDate.toDateString()) {
            dayElement.classList.add('selected');
        }
        
        calendarGrid.appendChild(dayElement);
    }
}

function selectDate(date) {
    selectedDate = date;
    selectedTime = null;
    
    // Update UI
    const selectedDateText = document.getElementById('selectedDateText');
    const timeSelection = document.getElementById('timeSelection');
    const bookingForm = document.getElementById('bookingForm');
    
    if (selectedDateText) {
        selectedDateText.textContent = `${date.getDate()}. ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    }
    
    // Show time selection
    if (timeSelection) {
        timeSelection.style.display = 'block';
        generateTimeSlots();
    }
    
    // Hide booking form until time is selected
    if (bookingForm) {
        bookingForm.style.display = 'none';
    }
    
    // Regenerate calendar to update selected state
    generateCalendar();
}

function generateTimeSlots() {
    const timeSlotsContainer = document.getElementById('timeSlots');
    if (!timeSlotsContainer) return;
    
    timeSlotsContainer.innerHTML = '';
    
    timeSlots.forEach(time => {
        const timeSlot = document.createElement('div');
        timeSlot.className = 'time-slot';
        timeSlot.textContent = time;
        
        // Randomly disable some slots to simulate availability
        if (Math.random() < 0.3) {
            timeSlot.classList.add('disabled');
        } else {
            timeSlot.addEventListener('click', () => selectTime(time));
        }
        
        timeSlotsContainer.appendChild(timeSlot);
    });
}

function selectTime(time) {
    selectedTime = time;
    
    // Update UI
    const timeSlots = document.querySelectorAll('.time-slot');
    timeSlots.forEach(slot => {
        slot.classList.remove('selected');
        if (slot.textContent === time) {
            slot.classList.add('selected');
        }
    });
    
    // Show booking form
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.style.display = 'block';
    }
}

function changeMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    generateCalendar();
}

// Booking Modal Functions
function openBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Track conversion event
        trackConversion('booking_modal_opened');
        
        // Auto-select today's date
        const today = new Date();
        selectedDate = today;
        selectedTime = null;
        
        // Generate calendar
        generateCalendar();
        
        // Auto-show time selection for today
        const timeSelection = document.getElementById('timeSelection');
        const bookingForm = document.getElementById('bookingForm');
        const selectedDateText = document.getElementById('selectedDateText');
        
        if (selectedDateText) {
            selectedDateText.textContent = `${today.getDate()}. ${monthNames[today.getMonth()]} ${today.getFullYear()}`;
        }
        
        if (timeSelection) {
            timeSelection.style.display = 'block';
            generateTimeSlots();
        }
        
        // Hide booking form initially
        if (bookingForm) {
            bookingForm.style.display = 'none';
        }
    }
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Scroll to Top Button - Optimized
const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
    let scrollTimeout;
    
    // Throttled scroll handler for better performance
    function handleScroll() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(() => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        }, 10);
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Cookie Consent Management
let cookieConsent = localStorage.getItem('cookieConsent');

if (!cookieConsent) {
    setTimeout(() => {
        const cookieConsentElement = document.getElementById('cookieConsent');
        if (cookieConsentElement) {
            cookieConsentElement.classList.add('show');
        }
    }, 2000);
}

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    const cookieConsentElement = document.getElementById('cookieConsent');
    if (cookieConsentElement) {
        cookieConsentElement.classList.remove('show');
    }
    // Enable analytics and marketing cookies
    console.log('Cookies accepted - Analytics and marketing enabled');
}

function declineCookies() {
    localStorage.setItem('cookieConsent', 'declined');
    const cookieConsentElement = document.getElementById('cookieConsent');
    if (cookieConsentElement) {
        cookieConsentElement.classList.remove('show');
    }
    // Only enable necessary cookies
    console.log('Cookies declined - Only necessary cookies enabled');
}

function showCookieSettings() {
    const cookieSettingsModal = document.getElementById('cookieSettingsModal');
    if (cookieSettingsModal) {
        cookieSettingsModal.classList.add('active');
    }
}

function closeCookieSettings() {
    const cookieSettingsModal = document.getElementById('cookieSettingsModal');
    if (cookieSettingsModal) {
        cookieSettingsModal.classList.remove('active');
    }
}

function saveCookieSettings() {
    const analyticsCookies = document.getElementById('analyticsCookies');
    const marketingCookies = document.getElementById('marketingCookies');
    
    if (analyticsCookies && marketingCookies) {
        localStorage.setItem('cookieConsent', 'custom');
        localStorage.setItem('analyticsCookies', analyticsCookies.checked);
        localStorage.setItem('marketingCookies', marketingCookies.checked);
        
        const cookieSettingsModal = document.getElementById('cookieSettingsModal');
        const cookieConsentElement = document.getElementById('cookieConsent');
        
        if (cookieSettingsModal) {
            cookieSettingsModal.classList.remove('active');
        }
        if (cookieConsentElement) {
            cookieConsentElement.classList.remove('show');
        }
        
        console.log('Cookie settings saved:', { 
            analyticsCookies: analyticsCookies.checked, 
            marketingCookies: marketingCookies.checked 
        });
    }
}


// Interactive Timeline Animation
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach((item) => {
        observer.observe(item);
    });
}

// Interactive Project Showcase
function initProjectShowcase() {
    const colorBtns = document.querySelectorAll('.color-btn');
    const layoutBtns = document.querySelectorAll('.layout-btn');
    const animationsToggle = document.getElementById('animationsToggle');
    const contentBlocks = document.querySelectorAll('.content-block');
    
    // Color picker functionality
    colorBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            colorBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const color = this.dataset.color;
            contentBlocks.forEach((block, index) => {
                if (index === 0) {
                    block.style.background = color;
                    block.style.opacity = '0.8';
                } else if (index === 1) {
                    block.style.background = color;
                    block.style.opacity = '0.6';
                } else if (index === 2) {
                    block.style.background = color;
                    block.style.opacity = '0.4';
                }
            });
        });
    });
    
    // Layout functionality
    layoutBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            layoutBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const layout = this.dataset.layout;
            const screenBody = document.querySelector('.screen-body');
            
            switch(layout) {
                case 'grid':
                    screenBody.style.display = 'grid';
                    screenBody.style.gridTemplateColumns = '1fr 1fr';
                    screenBody.style.gridTemplateRows = '1fr 1fr';
                    break;
                case 'list':
                    screenBody.style.display = 'flex';
                    screenBody.style.flexDirection = 'column';
                    break;
                case 'card':
                    screenBody.style.display = 'flex';
                    screenBody.style.flexDirection = 'row';
                    screenBody.style.gap = '10px';
                    break;
            }
        });
    });
    
    // Animation toggle
    if (animationsToggle) {
        animationsToggle.addEventListener('change', function() {
            contentBlocks.forEach(block => {
                if (this.checked) {
                    block.style.animation = 'pulse 2s ease-in-out infinite';
                } else {
                    block.style.animation = 'none';
                }
            });
        });
    }
}

// Initialize all new features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    animateTimeline();
    initProjectShowcase();
    
});

