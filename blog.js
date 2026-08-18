document.addEventListener("DOMContentLoaded", () => {
  applySavedPreferences();
  lucide.createIcons();
  initializeNavbar();
  initializeBackToTop();
});

function getStoredItem(key) {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
}

function setStoredItem(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {}
}

function applySavedPreferences() {
  const savedTheme = getStoredItem("theme");
  const savedDir = getStoredItem("dir");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }

  document.documentElement.dir = savedDir === "rtl" ? "rtl" : "ltr";

  updateToggleIcons();
}

function updateToggleIcons() {
  const darkToggle = document.getElementById("darkToggle");

  if (darkToggle) {
    darkToggle.innerHTML = document.body.classList.contains("dark-mode")
      ? '<i data-lucide="sun"></i>'
      : '<i data-lucide="moon"></i>';
  }

  lucide.createIcons();
}

function initializeNavbar() {
  const darkToggle = document.getElementById("darkToggle");
  const rtlToggle = document.getElementById("rtlToggle");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.querySelector(".nav-links");
  const mobileLogin = document.querySelector(".mobile-login");
  const dropdowns = document.querySelectorAll(".dropdown");

  setActiveNavLink();

  if (!darkToggle || !rtlToggle || !menuToggle || !navLinks) return;

  setupDarkMode(darkToggle);
  setupRTL(rtlToggle);
  setupMobileMenu(menuToggle, navLinks, mobileLogin, dropdowns);
  setupMobileDropdowns(dropdowns);
}

function setActiveNavLink() {
  const currentPath = window.location.pathname.replace(/\/$/, "");

  document.querySelectorAll(".nav-links > li > a").forEach((link) => {
    const linkPath = new URL(
      link.href,
      window.location.origin,
    ).pathname.replace(/\/$/, "");

    if (currentPath === linkPath) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    }
  });
}

function setupDarkMode(darkToggle) {
  darkToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    setStoredItem("theme", isDark ? "dark" : "light");
    updateToggleIcons();
  });
}

function setupRTL(rtlToggle) {
  rtlToggle.addEventListener("click", () => {
    const newDir = document.documentElement.dir === "rtl" ? "ltr" : "rtl";
    document.documentElement.dir = newDir;
    setStoredItem("dir", newDir);
  });
}

function setupMobileMenu(menuToggle, navLinks, mobileLogin, dropdowns) {
  menuToggle.addEventListener("click", () => {
    const isActive = navLinks.classList.toggle("active");

    if (mobileLogin) {
      mobileLogin.classList.toggle("active", isActive);
    }

    menuToggle.innerHTML = isActive
      ? '<i data-lucide="x"></i>'
      : '<i data-lucide="menu"></i>';

    lucide.createIcons();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) {
      navLinks.classList.remove("active");

      if (mobileLogin) {
        mobileLogin.classList.remove("active");
      }

      dropdowns.forEach((dropdown) => {
        dropdown.classList.remove("active");
      });

      menuToggle.innerHTML = '<i data-lucide="menu"></i>';
      lucide.createIcons();
    }
  });
}

function setupMobileDropdowns(dropdowns) {
  dropdowns.forEach((dropdown) => {
    const topLink = dropdown.querySelector(":scope > a");

    if (!topLink) return;

    topLink.addEventListener("click", (e) => {
      if (window.innerWidth <= 1024) {
        e.preventDefault();

        dropdowns.forEach((item) => {
          if (item !== dropdown) {
            item.classList.remove("active");
          }
        });

        dropdown.classList.toggle("active");
      }
    });
  });
}

function initializeBackToTop() {
  const topBtn = document.querySelector(".top-btn");

  if (!topBtn) return;

  topBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}










/*==================================================
        JOURNAL NEWSLETTER JAVASCRIPT
==================================================*/

document.addEventListener("DOMContentLoaded", function () {

    const newsletterForm =
        document.getElementById("journalNewsletterForm");

    const newsletterEmail =
        document.getElementById("journalEmail");

    const newsletterMessage =
        document.getElementById("newsletterMessage");


    /*==================================================
            NEWSLETTER FORM
    ==================================================*/

    if (newsletterForm) {

        newsletterForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const email =
                newsletterEmail.value.trim();


            /* EMPTY EMAIL */

            if (email === "") {

                newsletterMessage.textContent =
                    "Please enter your email address.";

                newsletterMessage.style.color =
                    "#6b1c48";

                newsletterEmail.focus();

                return;
            }


            /* EMAIL VALIDATION */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                newsletterMessage.textContent =
                    "Please enter a valid email address.";

                newsletterMessage.style.color =
                    "#6b1c48";

                newsletterEmail.focus();

                return;
            }


            /* SUCCESS */

            newsletterMessage.textContent =
                "✓ Thank you! You are successfully subscribed.";

            newsletterMessage.style.color =
                "#77C7C2";


            /* CLEAR INPUT */

            newsletterEmail.value = "";


            /* SUCCESS ANIMATION */

            newsletterMessage.classList.remove(
                "newsletter-success"
            );

            void newsletterMessage.offsetWidth;

            newsletterMessage.classList.add(
                "newsletter-success"
            );

        });

    }


    /*==================================================
            EMAIL INPUT - REMOVE ERROR
    ==================================================*/

    if (newsletterEmail) {

        newsletterEmail.addEventListener(
            "input",
            function () {

                if (newsletterMessage) {

                    newsletterMessage.textContent = "";

                    newsletterMessage.classList.remove(
                        "newsletter-success"
                    );

                }

            }
        );

    }

});