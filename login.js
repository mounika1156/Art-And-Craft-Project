/*==================================================
            LOGIN PAGE JAVASCRIPT
==================================================*/

document.addEventListener("DOMContentLoaded", function () {

    const body = document.body;

    const loginForm = document.getElementById("loginForm");

    const email = document.getElementById("email");

    const password = document.getElementById("password");

    const emailError = document.getElementById("emailError");

    const passwordError = document.getElementById("passwordError");

    const rememberMe = document.getElementById("rememberMe");

    const passwordToggle =
        document.getElementById("passwordToggle");

    const passwordIcon =
        document.getElementById("passwordIcon");

    const themeBtn =
        document.getElementById("themeBtn");

    const themeIcon =
        document.getElementById("themeIcon");

    const rtlBtn =
        document.getElementById("rtlBtn");


    /*==================================================
                LOAD SAVED SETTINGS
    ==================================================*/

    const savedTheme =
        localStorage.getItem("craftnest-theme");

    const savedDirection =
        localStorage.getItem("craftnest-direction");

    const savedEmail =
        localStorage.getItem("craftnest-email");


    if (savedTheme === "dark") {

        body.classList.add("dark-mode");

        themeIcon.classList.remove("bi-moon-fill");

        themeIcon.classList.add("bi-sun-fill");

    }


    if (savedDirection === "rtl") {

        document.documentElement.dir = "rtl";

    }


    if (savedEmail) {

        email.value = savedEmail;

        rememberMe.checked = true;

    }


    /*==================================================
                PASSWORD SHOW / HIDE
    ==================================================*/

    passwordToggle.addEventListener("click", function () {

        if (password.type === "password") {

            password.type = "text";

            passwordIcon.classList.remove("bi-eye");

            passwordIcon.classList.add("bi-eye-slash");

            passwordToggle.setAttribute(
                "aria-label",
                "Hide password"
            );

        } else {

            password.type = "password";

            passwordIcon.classList.remove("bi-eye-slash");

            passwordIcon.classList.add("bi-eye");

            passwordToggle.setAttribute(
                "aria-label",
                "Show password"
            );

        }

    });


    /*==================================================
                DARK / LIGHT MODE
    ==================================================*/

    themeBtn.addEventListener("click", function () {

        body.classList.toggle("dark-mode");

        if (body.classList.contains("dark-mode")) {

            themeIcon.classList.remove("bi-moon-fill");

            themeIcon.classList.add("bi-sun-fill");

            localStorage.setItem(
                "craftnest-theme",
                "dark"
            );

        } else {

            themeIcon.classList.remove("bi-sun-fill");

            themeIcon.classList.add("bi-moon-fill");

            localStorage.setItem(
                "craftnest-theme",
                "light"
            );

        }

    });


    /*==================================================
                    RTL TOGGLE
    ==================================================*/

    rtlBtn.addEventListener("click", function () {

        const html =
            document.documentElement;

        if (html.dir === "rtl") {

            html.dir = "ltr";

            localStorage.setItem(
                "craftnest-direction",
                "ltr"
            );

        } else {

            html.dir = "rtl";

            localStorage.setItem(
                "craftnest-direction",
                "rtl"
            );

        }

    });


    /*==================================================
                EMAIL VALIDATION
    ==================================================*/

    function validateEmail() {

        const emailValue =
            email.value.trim();

        if (emailValue === "") {

            emailError.textContent =
                "Please enter your email address.";

            return false;

        }


        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(emailValue)) {

            emailError.textContent =
                "Please enter a valid email address.";

            return false;

        }


        emailError.textContent = "";

        return true;

    }


    /*==================================================
                PASSWORD VALIDATION
    ==================================================*/

    function validatePassword() {

        const passwordValue =
            password.value.trim();


        if (passwordValue === "") {

            passwordError.textContent =
                "Please enter your password.";

            return false;

        }


        if (passwordValue.length < 6) {

            passwordError.textContent =
                "Password must contain at least 6 characters.";

            return false;

        }


        passwordError.textContent = "";

        return true;

    }


    /*==================================================
                LIVE VALIDATION
    ==================================================*/

    email.addEventListener("input", function () {

        if (email.value.trim() !== "") {

            validateEmail();

        } else {

            emailError.textContent = "";

        }

    });


    password.addEventListener("input", function () {

        if (password.value.trim() !== "") {

            validatePassword();

        } else {

            passwordError.textContent = "";

        }

    });


    /*==================================================
                LOGIN SUBMIT
    ==================================================*/

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const validEmail =
            validateEmail();

        const validPassword =
            validatePassword();


        if (!validEmail || !validPassword) {

            return;

        }


        /* Remember Email */

        if (rememberMe.checked) {

            localStorage.setItem(
                "craftnest-email",
                email.value.trim()
            );

        } else {

            localStorage.removeItem(
                "craftnest-email"
            );

        }


        /* Success */

        alert(
            "Login successful! Welcome back to CraftNest."
        );


        loginForm.reset();

        password.type = "password";

        passwordIcon.classList.remove(
            "bi-eye-slash"
        );

        passwordIcon.classList.add(
            "bi-eye"
        );

    });


    /*==================================================
                SOCIAL LOGIN
    ==================================================*/

    const socialButtons =
        document.querySelectorAll(".social-btn");


    socialButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const provider =
                button.dataset.provider;

            alert(
                provider +
                " login will open here."
            );

        });

    });


    /*==================================================
                FORGOT PASSWORD
    ==================================================*/

    const forgotPassword =
        document.querySelector(".forgot-password");


    forgotPassword.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            alert(
                "Password recovery page will open here."
            );

        }
    );

});