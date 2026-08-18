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








document.addEventListener("DOMContentLoaded", function () {

    /*-----------------------------------------------
        CART STORAGE
    -----------------------------------------------*/

    let cart = JSON.parse(localStorage.getItem("craftnestCart")) || [];


    /*-----------------------------------------------
        PRODUCT DATA
    -----------------------------------------------*/

    const products = [
        {
            id: 1,
            name: "Premium Artist Painting Set",
            category: "Painting Supplies",
            price: 899,
            image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=90"
        },
        {
            id: 2,
            name: "Creative Brush Set",
            category: "Brushes",
            price: 499,
            image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=800&q=90"
        },
        {
            id: 3,
            name: "Professional Watercolors",
            category: "Watercolor",
            price: 699,
            image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=800&q=90"
        },
        {
            id: 4,
            name: "Artist Sketching Pencils",
            category: "Drawing",
            price: 349,
            image: "https://images.unsplash.com/photo-1517842536804-bf6629e2c291?auto=format&fit=crop&w=800&q=90"
        },
        {
            id: 5,
            name: "Handmade Craft Materials",
            category: "Craft",
            price: 599,
            image: "https://images.unsplash.com/photo-1580136579312-94651dfd596d?auto=format&fit=crop&w=800&q=90"
        }
    ];


    /*-----------------------------------------------
        MAIN ADD TO CART BUTTON
    -----------------------------------------------*/

    const mainCartButton = document.querySelector(".arrival-cart");

    if (mainCartButton) {

        mainCartButton.addEventListener("click", function () {

            addToCart(products[0]);

        });

    }


    /*-----------------------------------------------
        SMALL PRODUCT CART BUTTONS
    -----------------------------------------------*/

    const smallCartButtons =
        document.querySelectorAll(".arrival-icon-btn");


    smallCartButtons.forEach(function (button, index) {

        button.addEventListener("click", function () {

            const product = products[index + 1];

            addToCart(product);

        });

    });


    /*-----------------------------------------------
        ADD PRODUCT TO CART
    -----------------------------------------------*/

    function addToCart(product) {

        const existingProduct =
            cart.find(item => item.id === product.id);


        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({

                id: product.id,

                name: product.name,

                category: product.category,

                price: product.price,

                image: product.image,

                quantity: 1

            });

        }


        /* Save cart */

        localStorage.setItem(
            "craftnestCart",
            JSON.stringify(cart)
        );


        /* Update cart counter */

        updateCartCount();


        /* Show notification */

        showCartNotification(product.name);

    }


    /*-----------------------------------------------
        CART COUNTER
    -----------------------------------------------*/

    function updateCartCount() {

        const totalItems = cart.reduce(
            (total, item) => total + item.quantity,
            0
        );


        const cartCounter =
            document.querySelector(".cart-count");


        if (cartCounter) {

            cartCounter.textContent = totalItems;

            cartCounter.classList.add("cart-count-pop");


            setTimeout(function () {

                cartCounter.classList.remove(
                    "cart-count-pop"
                );

            }, 300);

        }

    }


    /*-----------------------------------------------
        CART NOTIFICATION
    -----------------------------------------------*/

    function showCartNotification(productName) {

        let notification =
            document.querySelector(".cart-notification");


        if (!notification) {

            notification =
                document.createElement("div");

            notification.className =
                "cart-notification";


            notification.innerHTML = `
                <i class="bi bi-check-circle-fill"></i>
                <span></span>
            `;


            document.body.appendChild(notification);

        }


        notification.querySelector("span").textContent =
            productName + " added to cart";


        notification.classList.add("show");


        setTimeout(function () {

            notification.classList.remove("show");

        }, 2500);

    }


    /*-----------------------------------------------
        INITIAL CART COUNT
    -----------------------------------------------*/

    updateCartCount();

});









/*==================================================
        POPULAR PRODUCTS JS
==================================================*/

document.addEventListener("DOMContentLoaded", function(){

    /*==============================================
            WISHLIST
    ==============================================*/

    const wishlistButtons =
        document.querySelectorAll(".wishlist-button");

    wishlistButtons.forEach(function(button){

        button.addEventListener("click", function(){

            this.classList.toggle("active");

            const icon =
                this.querySelector("i");

            if(this.classList.contains("active")){

                icon.classList.remove("bi-heart");

                icon.classList.add("bi-heart-fill");

            }else{

                icon.classList.remove("bi-heart-fill");

                icon.classList.add("bi-heart");

            }

        });

    });


    /*==============================================
            ADD TO CART
    ==============================================*/

    const cartButtons =
        document.querySelectorAll(".add-cart-button");

    cartButtons.forEach(function(button){

        button.addEventListener("click", function(){

            const productName =
                this.getAttribute("data-product");

            const originalText =
                this.innerHTML;

            this.classList.add("added");

            this.innerHTML =
                '<i class="bi bi-check-circle-fill"></i> Added';

            setTimeout(() => {

                this.classList.remove("added");

                this.innerHTML =
                    originalText;

            }, 1800);

            console.log(
                "Added to cart:",
                productName
            );

        });

    });


    /*==============================================
            CARD REVEAL ANIMATION
    ==============================================*/

    const cards =
        document.querySelectorAll(
            ".popular-product-card"
        );

    const observer =
        new IntersectionObserver(
            function(entries){

                entries.forEach(function(entry){

                    if(entry.isIntersecting){

                        entry.target.classList.add(
                            "product-visible"
                        );

                    }

                });

            },
            {
                threshold:0.15
            }
        );

    cards.forEach(function(card){

        observer.observe(card);

    });

});






/*==================================================
        NEWSLETTER SECTION JAVASCRIPT
==================================================*/

document.addEventListener("DOMContentLoaded", function () {

    const newsletterForm =
        document.getElementById("newsletterForm");

    const newsletterEmail =
        document.getElementById("newsletterEmail");

    const newsletterMessage =
        document.getElementById("newsletterMessage");

    if (!newsletterForm) return;


    /*==================================================
            FORM SUBMIT
    ==================================================*/

    newsletterForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email =
            newsletterEmail.value.trim();

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        /*==================================================
                EMPTY EMAIL
        ==================================================*/

        if (email === "") {

            newsletterMessage.textContent =
                "Please enter your email address.";

            newsletterMessage.className =
                "newsletter-message error";

            newsletterEmail.focus();

            return;
        }


        /*==================================================
                INVALID EMAIL
        ==================================================*/

        if (!emailPattern.test(email)) {

            newsletterMessage.textContent =
                "Please enter a valid email address.";

            newsletterMessage.className =
                "newsletter-message error";

            newsletterEmail.focus();

            return;
        }


        /*==================================================
                SUCCESS MESSAGE
        ==================================================*/

        newsletterMessage.textContent =
            "Thank you! You are successfully subscribed.";

        newsletterMessage.className =
            "newsletter-message success";


        /*==================================================
                BUTTON
        ==================================================*/

        const subscribeButton =
            newsletterForm.querySelector(
                ".newsletter-button"
            );

        const originalButton =
            subscribeButton.innerHTML;


        subscribeButton.innerHTML =
            '<i class="bi bi-check-circle-fill"></i> Subscribed';

        subscribeButton.disabled = true;


        /*==================================================
                CLEAR INPUT
        ==================================================*/

        newsletterEmail.value = "";


        /*==================================================
                RESET AFTER 3 SECONDS
        ==================================================*/

        setTimeout(function () {

            newsletterMessage.textContent = "";

            newsletterMessage.className =
                "newsletter-message";

            subscribeButton.innerHTML =
                originalButton;

            subscribeButton.disabled = false;

        }, 3000);

    });


    /*==================================================
            REMOVE ERROR WHILE TYPING
    ==================================================*/

    newsletterEmail.addEventListener(
        "input",
        function () {

            newsletterMessage.textContent = "";

            newsletterMessage.className =
                "newsletter-message";

        }
    );

});