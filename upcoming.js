/*==================================================
            CRAFTNEST UPCOMING EVENTS JS
==================================================*/

document.addEventListener("DOMContentLoaded", function () {

    const themeBtn = document.getElementById("themeBtn");
    const themeIcon = document.getElementById("themeIcon");
    const rtlBtn = document.getElementById("rtlBtn");


    /*==================================================
                    DARK MODE
    ==================================================*/

    const savedTheme =
        localStorage.getItem("craftnestTheme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

        themeIcon.className =
            "bi bi-sun-fill";

    }


    themeBtn.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

        const darkMode =
            document.body.classList.contains("dark-mode");

        if (darkMode) {

            themeIcon.className =
                "bi bi-sun-fill";

            localStorage.setItem(
                "craftnestTheme",
                "dark"
            );

        } else {

            themeIcon.className =
                "bi bi-moon-fill";

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

        const rtl =
            document.body.classList.toggle("rtl");

        if (rtl) {

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
                REGISTER BUTTONS
    ==================================================*/

    const eventButtons =
        document.querySelectorAll(".event-btn");

    eventButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const eventName =
                this.getAttribute("data-event");

            const confirmed =
                confirm(
                    "Would you like to register for:\n\n" +
                    eventName + "?"
                );

            if (confirmed) {

                this.innerHTML =
                    '<i class="bi bi-check-circle-fill"></i> Registered';

                this.style.background =
                    "#77C7C2";

                this.disabled = true;

            }

        });

    });


    /*==================================================
                SCROLL REVEAL
    ==================================================*/

    const eventItems =
        document.querySelectorAll(".event-item");

    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "event-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );
                    }

                });

            },
            {
                threshold:0.12
            }
        );


    eventItems.forEach(function (item) {

        item.style.opacity = "0";
        item.style.transform =
            "translateY(25px)";
        item.style.transition =
            "opacity .6s ease, transform .6s ease";

        observer.observe(item);

    });


    /*==================================================
            ADD REVEAL CLASS STYLE
    ==================================================*/

    const revealStyle =
        document.createElement("style");

    revealStyle.textContent = `
        .event-item.event-visible{
            opacity:1 !important;
            transform:translateY(0) !important;
        }
    `;

    document.head.appendChild(revealStyle);

});