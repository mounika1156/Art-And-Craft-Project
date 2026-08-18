
document.addEventListener("DOMContentLoaded", function () {


    const themeBtn = document.getElementById("themeBtn");
    const themeIcon = document.getElementById("themeIcon");

    const savedTheme = localStorage.getItem("craftnest-theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

        themeIcon.classList.remove("bi-moon-fill");
        themeIcon.classList.add("bi-sun-fill");

    }


    themeBtn.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

        const darkMode =
            document.body.classList.contains("dark-mode");


        if (darkMode) {

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



    const rtlBtn = document.getElementById("rtlBtn");

    rtlBtn.addEventListener("click", function () {

        const html = document.documentElement;

        if (html.getAttribute("dir") === "rtl") {

            html.setAttribute("dir", "ltr");

        } else {

            html.setAttribute("dir", "rtl");

        }

    });


    const password =
        document.getElementById("signinPassword");

    const passwordToggle =
        document.getElementById("signinPasswordToggle");

    const passwordIcon =
        document.getElementById("signinPasswordIcon");


    passwordToggle.addEventListener("click", function () {

        if (password.type === "password") {

            password.type = "text";

            passwordIcon.classList.remove(
                "bi-eye"
            );

            passwordIcon.classList.add(
                "bi-eye-slash"
            );

            passwordToggle.setAttribute(
                "aria-label",
                "Hide password"
            );

        } else {

            password.type = "password";

            passwordIcon.classList.remove(
                "bi-eye-slash"
            );

            passwordIcon.classList.add(
                "bi-eye"
            );

            passwordToggle.setAttribute(
                "aria-label",
                "Show password"
            );

        }

    });



    const form =
        document.getElementById("signinForm");

    const email =
        document.getElementById("signinEmail");

    const emailError =
        document.getElementById("signinEmailError");

    const passwordError =
        document.getElementById("signinPasswordError");


    form.addEventListener("submit", function (event) {

        event.preventDefault();

        let valid = true;


        /* EMAIL */

        const emailValue =
            email.value.trim();


        if (emailValue === "") {

            emailError.textContent =
                "Please enter your email address.";

            valid = false;

        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)
        ) {

            emailError.textContent =
                "Please enter a valid email address.";

            valid = false;

        } else {

            emailError.textContent = "";

        }


      

        const passwordValue =
            password.value.trim();


        if (passwordValue === "") {

            passwordError.textContent =
                "Please enter your password.";

            valid = false;

        } else if (passwordValue.length < 6) {

            passwordError.textContent =
                "Password must contain at least 6 characters.";

            valid = false;

        } else {

            passwordError.textContent = "";

        }


        /* SUCCESS */

        if (valid) {

            alert("Sign in successful!");

            form.reset();

        }

    });


    const socialButtons =
        document.querySelectorAll(
            ".signin-social-btn"
        );


    socialButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const provider =
                button.getAttribute("data-provider");

            alert(
                "Continue with " +
                provider
            );

        });

    });


    const forgotPassword =
        document.getElementById("forgotPassword");


    forgotPassword.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            alert(
                "Password recovery will be available here."
            );

        }
    );

});