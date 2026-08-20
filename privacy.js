/*==================================================
                PRIVACY PAGE JAVASCRIPT
==================================================*/

document.addEventListener("DOMContentLoaded", function () {


    /*==================================================
                    DARK MODE
    ==================================================*/

    const themeBtn =
        document.getElementById("themeBtn");

    const themeIcon =
        document.getElementById("themeIcon");


    const savedTheme =
        localStorage.getItem("craftnest-theme");


    if(savedTheme === "dark"){

        document.body.classList.add("dark-mode");

        themeIcon.classList.remove(
            "bi-moon-fill"
        );

        themeIcon.classList.add(
            "bi-sun-fill"
        );

    }


    themeBtn.addEventListener("click", function () {

        document.body.classList.toggle(
            "dark-mode"
        );


        const darkMode =
            document.body.classList.contains(
                "dark-mode"
            );


        if(darkMode){

            themeIcon.classList.remove(
                "bi-moon-fill"
            );

            themeIcon.classList.add(
                "bi-sun-fill"
            );

            localStorage.setItem(
                "craftnest-theme",
                "dark"
            );

        }
        else{

            themeIcon.classList.remove(
                "bi-sun-fill"
            );

            themeIcon.classList.add(
                "bi-moon-fill"
            );

            localStorage.setItem(
                "craftnest-theme",
                "light"
            );

        }

    });



    /*==================================================
                        RTL
    ==================================================*/

    const rtlBtn =
        document.getElementById("rtlBtn");


    rtlBtn.addEventListener("click", function () {

        const html =
            document.documentElement;


        if(
            html.getAttribute("dir") === "rtl"
        ){

            html.setAttribute(
                "dir",
                "ltr"
            );

            localStorage.setItem(
                "craftnest-direction",
                "ltr"
            );

        }
        else{

            html.setAttribute(
                "dir",
                "rtl"
            );

            localStorage.setItem(
                "craftnest-direction",
                "rtl"
            );

        }

    });


    /*==================================================
                LOAD SAVED DIRECTION
    ==================================================*/

    const savedDirection =
        localStorage.getItem(
            "craftnest-direction"
        );


    if(savedDirection){

        document.documentElement.setAttribute(
            "dir",
            savedDirection
        );

    }



    /*==================================================
                CURRENT YEAR
    ==================================================*/

    const year =
        document.getElementById(
            "currentYear"
        );


    if(year){

        year.textContent =
            new Date().getFullYear();

    }



    /*==================================================
                SIDEBAR ACTIVE LINK
    ==================================================*/

    const sidebarLinks =
        document.querySelectorAll(
            ".privacy-sidebar-box a"
        );


    sidebarLinks.forEach(function(link){

        link.addEventListener(
            "click",
            function(){

                sidebarLinks.forEach(
                    function(item){

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                link.classList.add(
                    "active"
                );

            }
        );

    });



    /*==================================================
                SCROLL TO SECTION
    ==================================================*/

    const sections =
        document.querySelectorAll(
            ".privacy-section"
        );


    window.addEventListener(
        "scroll",
        function(){

            let currentSection = "";


            sections.forEach(
                function(section){

                    const sectionTop =
                        section.offsetTop - 150;


                    if(
                        window.scrollY >=
                        sectionTop
                    ){

                        currentSection =
                            section.getAttribute(
                                "id"
                            );

                    }

                }
            );


            sidebarLinks.forEach(
                function(link){

                    link.classList.remove(
                        "active"
                    );


                    if(
                        link.getAttribute(
                            "href"
                        ) === "#" + currentSection
                    ){

                        link.classList.add(
                            "active"
                        );

                    }

                }
            );

        }
    );

});