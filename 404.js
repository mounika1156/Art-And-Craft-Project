/*==================================================
                CRAFTNEST 404 JS
==================================================*/

document.addEventListener("DOMContentLoaded", function () {

    const themeBtn =
        document.getElementById("themeBtn");

    const themeIcon =
        document.getElementById("themeIcon");

    const rtlBtn =
        document.getElementById("rtlBtn");


    /*==================================================
                    DARK MODE
    ==================================================*/

    const savedTheme =
        localStorage.getItem("craftnestTheme");

    if(savedTheme === "dark"){

        document.body.classList.add("dark-mode");

        themeIcon.className =
            "bi bi-sun-fill";
    }


    themeBtn.addEventListener("click", function(){

        document.body.classList.toggle("dark-mode");

        const darkMode =
            document.body.classList.contains("dark-mode");

        if(darkMode){

            themeIcon.className =
                "bi bi-sun-fill";

            localStorage.setItem(
                "craftnestTheme",
                "dark"
            );

        }else{

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

    if(savedDirection === "rtl"){

        document.body.classList.add("rtl");

        document.documentElement.setAttribute(
            "dir",
            "rtl"
        );
    }


    rtlBtn.addEventListener("click", function(){

        const rtl =
            document.body.classList.toggle("rtl");

        if(rtl){

            document.documentElement.setAttribute(
                "dir",
                "rtl"
            );

            localStorage.setItem(
                "craftnestDirection",
                "rtl"
            );

        }else{

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
                    HELP SEARCH
    ==================================================*/

    const searchForm =
        document.getElementById("helpSearchForm");

    const searchInput =
        document.getElementById("helpSearch");

    const searchMessage =
        document.getElementById("searchMessage");


    searchForm.addEventListener(
        "submit",
        function(event){

            event.preventDefault();

            const query =
                searchInput.value.trim();


            if(query === ""){

                searchMessage.textContent =
                    "Please enter a question or keyword.";

                searchInput.focus();

                return;
            }


            searchMessage.textContent =
                "Searching for: " + query + "...";


            setTimeout(function(){

                searchMessage.textContent =
                    "We couldn't find an exact result. Please contact our support team.";

            },1000);

        }
    );


    /*==================================================
                SCROLL REVEAL
    ==================================================*/

    const items =
        document.querySelectorAll(
            ".help-item"
        );


    const observer =
        new IntersectionObserver(
            function(entries){

                entries.forEach(function(entry){

                    if(entry.isIntersecting){

                        entry.target.style.opacity = "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        observer.unobserve(
                            entry.target
                        );
                    }

                });

            },
            {
                threshold:.12
            }
        );


    items.forEach(function(item){

        item.style.opacity = "0";

        item.style.transform =
            "translateY(20px)";

        item.style.transition =
            "opacity .5s ease, transform .5s ease";

        observer.observe(item);

    });

});