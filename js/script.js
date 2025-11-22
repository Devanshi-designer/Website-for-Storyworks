// js/script.js
document.addEventListener("DOMContentLoaded", () => {

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // Optional: CTA button click effect
    const ctaButton = document.querySelector("#cta button");
    if (ctaButton) {
        ctaButton.addEventListener("click", () => {
            ctaButton.textContent = "Thank You!";
            setTimeout(() => {
                ctaButton.textContent = "Sign Up";
            }, 1500);
        });
    }

});
