/* =============== SHOW MENU =============== */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/* Remove menu mobile when link is clicked */
const navLink = document.querySelectorAll('.nav-link')

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/* =============== CHANGE BACKGROUND HEADER =============== */
const scrollHeader = () => {
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class
    this.scrollY >= 50 ? header.classList.add('scroll-header') 
                       : header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/* =============== SHADOW/GLOW CURSOR =============== */
const cursorGlow = document.querySelector('.cursor-glow');

if(cursorGlow) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.top = e.clientY + 'px';
        cursorGlow.style.left = e.clientX + 'px';
    });
}

/* =============== SCROLL SECTIONS ACTIVE LINK =============== */
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav-menu a[href*=' + sectionId + ']')

        if(sectionsClass) {
            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
                sectionsClass.classList.add('active-link')
            }else{
                sectionsClass.classList.remove('active-link')
            }
        }
    })
}
window.addEventListener('scroll', scrollActive)

/* =============== SHOW SCROLL UP =============== */ 
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                        : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/* =============== SCROLL REVEAL ANIMATION =============== */
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

const fadeElements = document.querySelectorAll('.fade-in, .fade-in-up');
fadeElements.forEach(el => {
    observer.observe(el);
});

/* =============== DYNAMIC YEAR =============== */
const yearEl = document.getElementById('current-year');
if(yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

/* =============== CONTACT FORM HANDLING =============== */
const contactForm = document.getElementById('contact-form'),
      formStatus = document.getElementById('form-status')

if(contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
        btn.disabled = true;
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                btn.innerHTML = 'Message Sent <i class="fa-solid fa-check"></i>';
                contactForm.reset();
                
                formStatus.textContent = 'Message sent successfully! I will get back to you soon.';
                formStatus.className = 'form-status success-msg';
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error:', error);
            formStatus.textContent = 'Something went wrong. Please try again later.';
            formStatus.className = 'form-status error-msg';
            btn.innerHTML = originalText;
            btn.disabled = false;
        } finally {
            // Ensure button is re-enabled regardless of error/success
            setTimeout(() => {
                formStatus.textContent = '';
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 5000);
        }
    });
}
