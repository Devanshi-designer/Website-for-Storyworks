/* ---------------------------
   Contact Form Validation
--------------------------- */
const form = document.getElementById("contactForm");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let valid = true;

        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const messageInput = document.getElementById("message");

        const nameError = document.getElementById("nameError");
        const emailError = document.getElementById("emailError");
        const messageError = document.getElementById("messageError");

        nameError.textContent = "";
        emailError.textContent = "";
        messageError.textContent = "";

        if (nameInput.value.trim() === "") {
            nameError.textContent = "Please enter your name.";
            valid = false;
        }

        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
        if (emailInput.value.trim() === "") {
            emailError.textContent = "Please enter your email.";
            valid = false;
        } else if (!emailPattern.test(emailInput.value)) {
            emailError.textContent = "Enter a valid email address.";
            valid = false;
        }

        if (messageInput.value.trim() === "") {
            messageError.textContent = "Please enter a message.";
            valid = false;
        }

        if (valid) {
            alert("Your message has been sent!");
            form.reset();
        }
    });
}

/* ---------------------------
   Read More Toggle (Homepage)
--------------------------- */
const toggleBtn = document.getElementById("toggleText");
const extraText = document.getElementById("extraContent");

if (toggleBtn && extraText) {
    extraText.style.display = "none";

    toggleBtn.addEventListener("click", () => {
        if (extraText.style.display === "none") {
            extraText.style.display = "block";
            toggleBtn.textContent = "Read Less";
        } else {
            extraText.style.display = "none";
            toggleBtn.textContent = "Read More";
        }
    });
}

/* ---------------------------
   Smooth Scroll (All Pages)
--------------------------- */
const links = document.querySelectorAll("a[href^='#']");

links.forEach(link => {
    link.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});
