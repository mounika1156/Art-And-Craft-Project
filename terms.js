/*==================================================
            CRAFTNEST TERMS PAGE JS
==================================================*/

document.addEventListener("DOMContentLoaded", function () {

    const themeBtn = document.getElementById("themeBtn");
    const themeIcon = document.getElementById("themeIcon");
    const rtlBtn = document.getElementById("rtlBtn");


    /*==================================================
                    DARK MODE
    ==================================================*/

    const savedTheme = localStorage.getItem("craftnestTheme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        themeIcon.className = "bi bi-sun-fill";
    }


    themeBtn.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

        const isDark =
            document.body.classList.contains("dark-mode");

        if (isDark) {

            themeIcon.className = "bi bi-sun-fill";

            localStorage.setItem(
                "craftnestTheme",
                "dark"
            );

        } else {

            themeIcon.className = "bi bi-moon-fill";

            localStorage.setItem(
                "craftnestTheme",
                "light"
            );

        }

    });


    /*==================================================
                        RTL
    ==================================================*/

    const savedDirection =
        localStorage.getItem("craftnestDirection");

    if (savedDirection === "rtl") {

        document.body.classList.add("rtl");

        document.documentElement.setAttribute(
            "dir",
            "rtl"
        );

    }


    rtlBtn.addEventListener("click", function () {

        const isRTL =
            document.body.classList.toggle("rtl");

        if (isRTL) {

            document.documentElement.setAttribute(
                "dir",
                "rtl"
            );

            localStorage.setItem(
                "craftnestDirection",
                "rtl"
            );

        } else {

            document.documentElement.setAttribute(
                "dir",
                "ltr"
            );

            localStorage.setItem(
                "craftnestDirection",
                "ltr"
            );

        }

    });


    /*==================================================
                SCROLL ANIMATION
    ==================================================*/

    const sections =
        document.querySelectorAll(".terms-section");

    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";
                        entry.target.style.transform =
                            "translateY(0)";

                    }

                });

            },
            {
                threshold:0.08
            }
        );


    sections.forEach(function (section) {

        section.style.opacity = "0";
        section.style.transform =
            "translateY(15px)";

        section.style.transition =
            "opacity .5s ease, transform .5s ease";

        observer.observe(section);

    });

});