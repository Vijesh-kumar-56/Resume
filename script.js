
(function () {
    "use strict";

    // ----- DARK MODE TOGGLE -----
    const themeToggle = document.getElementById('themeToggle');
    const printResume = document.getElementById('printResume');
    const body = document.body;

    // ----- PRINT RESUME -----
    printResume.addEventListener('click', function () {
        window.print();
    });
    const icon = themeToggle.querySelector('i');

    // load preference from localStorage
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        // default light
        body.classList.remove('dark');
        icon.classList.add('fa-moon');
        icon.classList.remove('fa-sun');
    }

    themeToggle.addEventListener('click', function () {
        body.classList.toggle('dark');
        const isDark = body.classList.contains('dark');
        // toggle icon
        if (isDark) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // ----- CONTACT FORM (interactive) -----
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const sendBtn = document.getElementById('sendBtn');
    const feedback = document.getElementById('formFeedback');

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showFeedback(message, isError = false) {
        feedback.textContent = message;
        feedback.classList.remove('error-feedback');
        if (isError) {
            feedback.classList.add('error-feedback');
        } else {
            feedback.classList.remove('error-feedback');
        }
        // auto clear after 5s
        if (window.feedbackTimeout) clearTimeout(window.feedbackTimeout);
        window.feedbackTimeout = setTimeout(() => {
            feedback.textContent = '';
            feedback.classList.remove('error-feedback');
        }, 5000);
    }

    function handleSend() {
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();

        if (!name) {
            showFeedback('✏️ Please enter your name.', true);
            nameInput.focus();
            return;
        }
        if (!email) {
            showFeedback('📧 Please enter your email address.', true);
            emailInput.focus();
            return;
        }
        if (!validateEmail(email)) {
            showFeedback('⚠️ Please enter a valid email address.', true);
            emailInput.focus();
            return;
        }

        // success simulation
        showFeedback(`✅ Thanks ${name}! Your message was sent (demo).`, false);
        // clear inputs (optional)
        nameInput.value = '';
        emailInput.value = '';
    }

    sendBtn.addEventListener('click', handleSend);

    // press Enter in any input triggers send
    nameInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleSend(); });
    emailInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleSend(); });

    // small extra: focus effect on theme toggle accessible
    console.log('Resume with interactive theme & contact form ready.');
})();

