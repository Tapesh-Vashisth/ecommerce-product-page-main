let mobileMenuToggler = document.getElementsByClassName("menu")[0];
let cancelToggler = document.getElementsByClassName("close")[0].firstElementChild;
let mobileMenuItems = document.getElementsByClassName("mobile-menu-items")[0];
let cartView = document.getElementsByClassName("cart-content")[0];
let cartToggler = document.getElementsByClassName("cart-icon")[0].lastElementChild;
let smokescreen = document.getElementById("layer");

// toggle states
let menustate = false;
let cartstate = false;

// adding eventlisteners

mobileMenuToggler.addEventListener("click", function(e){
    if (menustate === false){
        menustate = true;
        mobileMenuItems.style.display = "flex";
        smokescreen.style.display = "block";
    }
})

cancelToggler.addEventListener("click", function(e){
    if (menustate === true){
        menustate = false;
        mobileMenuItems.style.display = "none";
        smokescreen.style.display = "none";
    }
})

cartToggler.addEventListener("click", function(e){
    if (cartstate === true){
        cartstate = false;
        cartView.style.display = "none";
    }else{
        cartstate = true;
        cartView.style.display = "flex";
    }
})
