document.addEventListener('DOMContentLoaded', () => {

    // --- Typewriter Effect Logic (Extreme Interactivity) ---
    const targetElement = document.getElementById('typewriterTarget');
    if (targetElement) {
        // Phrases showing messy file names
        const phrases = [
            "IMG_8842.jpg",
            "final_final_copy.mov",
            "Untitled-3.psd",
            "CLIP_audio_01.wav"
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const typingSpeed = 100; // ms per character
        const deletingSpeed = 50; // ms per character
        const delayBetweenPhrases = 1500; // ms delay

        function type() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                // Deleting phase
                targetElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                // Typing phase
                targetElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            let speed = isDeleting ? deletingSpeed : typingSpeed;

            if (!isDeleting && charIndex === currentPhrase.length) {
                // Done typing, set up for deletion
                isDeleting = true;
                speed = delayBetweenPhrases;
            } else if (isDeleting && charIndex === 0) {
                // Done deleting, move to next phrase
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                speed = 500; // Short delay before starting next phrase
            }

            setTimeout(type, speed);
        }

        // Start the effect
        type();
    }

    // --- Image Carousel Logic ---
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const nextButton = document.getElementById('carousel-next');
    const prevButton = document.getElementById('carousel-prev');
    const slideCount = slides.length;
    let currentIndex = 0;
    let autoSlideInterval; // Variable to hold the interval ID

    if (track && slideCount > 0) {

        // Function to update the carousel position
        const updateCarousel = () => {
            // Calculate percentage offset based on current index
            const offset = -currentIndex * (100 / slideCount);
            track.style.transform = `translateX(${offset}%)`;
        };

        // Function to start the automatic sliding
        const startAutoSlide = () => {
            // Clear any existing interval before starting a new one
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % slideCount;
                updateCarousel();
            }, 5000); // Change slide every 5 seconds
        };

        // Function to handle manual clicks
        const handleManualClick = (direction) => {
            // 1. Clear the current auto-slide timer
            clearInterval(autoSlideInterval);

            // 2. Update the index based on direction
            if (direction === 'next') {
                currentIndex = (currentIndex + 1) % slideCount;
            } else {
                currentIndex = (currentIndex - 1 + slideCount) % slideCount;
            }

            // 3. Update the view
            updateCarousel();

            // 4. Restart the auto-slide timer after a short delay (or immediately)
            startAutoSlide();
        };

        // Next slide function
        nextButton.addEventListener('click', () => handleManualClick('next'));

        // Previous slide function
        prevButton.addEventListener('click', () => handleManualClick('prev'));

        // Start the automatic slide functionality on load
        startAutoSlide();

        // Initial positioning
        updateCarousel();
    }


    // --- Form Validation Logic (Required Feature) ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Clear previous state
            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
            document.querySelectorAll('input, textarea').forEach(el => el.classList.remove('input-error'));

            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            const status = document.getElementById('formStatus');

            // Validate Name
            if (name.value.trim() === '') {
                displayError(name, 'Full Name is required.');
                isValid = false;
            }

            // Validate Email (Regex)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
                displayError(email, 'Please enter a valid work email address.');
                isValid = false;
            }

            // Validate Message
            if (message.value.trim() === '') {
                displayError(message, 'Project details/message is required.');
                isValid = false;
            }

            // Handle Submission
            if (isValid) {
                status.textContent = "✅ Success! Your high-priority consultation request has been sent to the Label team.";
                status.style.color = "var(--primary-color)";
                contactForm.reset();
            } else {
                status.textContent = "❌ Please correct the errors in the highlighted fields to send your inquiry.";
                status.style.color = "var(--error-color)";
            }
        });
    }

    function displayError(input, msg) {
        input.classList.add('input-error');
        const errorSpan = document.getElementById(input.id + 'Error');
        if (errorSpan) errorSpan.textContent = msg;
    }

    // --- Technical Details Toggle for Features Page ---
    const toggleBtn = document.getElementById('toggleDetailsBtn');
    const technicalContent = document.getElementById('technicalContent');

    if (toggleBtn && technicalContent) {
        technicalContent.style.display = 'none'; // Initially hide the content

        toggleBtn.addEventListener('click', () => {
            if (technicalContent.style.display === 'none') {
                technicalContent.style.display = 'block';
                toggleBtn.textContent = 'Hide Technical Details';
            } else {
                technicalContent.style.display = 'none';
                toggleBtn.textContent = 'Read Complete System Specs';
            }
        });
    }

});