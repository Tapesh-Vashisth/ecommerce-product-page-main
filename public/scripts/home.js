let minus = document.getElementById("minus");
let plus = document.getElementById("plus");
let itemCount = document.getElementsByClassName("colors")[1];
let next = document.getElementsByClassName("next")[0];
let previous = document.getElementsByClassName("previous")[0];
let nextext = document.getElementsByClassName("next")[1];
let previousext = document.getElementsByClassName("previous")[1];
let mainview = document.getElementsByClassName("show")[0];
let mainviewext = document.getElementsByClassName("show")[1];
let extendtoggler = document.querySelectorAll(".general");
let extendview = document.getElementsByClassName("extendedview")[0];
let closeExtend = document.getElementsByClassName("extend-close")[0];
let updateCard = document.getElementsByClassName("btn")[0].firstElementChild;
let images = document.querySelectorAll(".rest-ext img");
let screenSmoke = document.getElementById("layer");
let title = document.getElementById("item-title").textContent;



// defining states
let curimg = 1;
let totalimages = images.length;

// adding eventlisteners 

minus.addEventListener("click", function(e){
    let curvalue = Number(itemCount.textContent);
    if (curvalue > 0){
        itemCount.textContent = curvalue - 1;
    }
})

plus.addEventListener("click", function(e){
    let curvalue = Number(itemCount.textContent);
    itemCount.textContent = curvalue + 1;
})

next.addEventListener("click", function(e){
    if (curimg === totalimages){
        curimg = 1;
    }else{
        curimg++;
    }

    mainview.setAttribute("src", `media/images/image-product-${curimg}.jpg`);

    let loweropacity = images[curimg - 1].style.opacity = 0.7;
})

previous.addEventListener("click", function(e){
    if (curimg === 1){
        curimg = totalimages;
    }else{
        curimg--;
    }
    
    mainview.setAttribute("src", `media/images/image-product-${curimg}.jpg`);

    let loweropacity = images[curimg - 1].style.opacity = 0.7;
})

nextext.addEventListener("click", function(e){
    if (curimg === totalimages){
        curimg = 1;
    }else{
        curimg++;
    }

    mainviewext.setAttribute("src", `media/images/image-product-${curimg}.jpg`);

    for (let i = 1; i <= totalimages; i++){
        if (i === curimg){
            images[i-1].style.opacity = 0.7;
        }else{
            images[i-1].style.opacity = 1;
        }
    }
    
})

previousext.addEventListener("click", function(e){
    if (curimg === 1){
        curimg = totalimages;
    }else{
        curimg--;
    }
    
    mainviewext.setAttribute("src", `media/images/image-product-${curimg}.jpg`);

    for (let i = 1; i <= totalimages; i++){
        if (i === curimg){
            images[i-1].style.opacity = 0.7;
            images[i-1].style.border = "2px solid orange";
        }else{
            images[i-1].style.opacity = 1;
        }
    }
})


for (let i = 0; i < extendtoggler.length; i++){
    extendtoggler[i].addEventListener("click", function(e){
        if (window.innerWidth > 700){
            extendview.style.display = "block";
            screenSmoke.style.display = "block";
        }
    })
    
}

closeExtend.addEventListener("click", function(e){
    extendview.style.display = "none";
    screenSmoke.style.display = "none";
})


updateCard.addEventListener("click", function(e){
    if (itemCount.textContent > 0){
        let xhr = new XMLHttpRequest();
        xhr.onload = function(){
            itemCount.textContent = 0;
            let data = JSON.parse(xhr.responseText);
            let cartcontent = "";
            for (let i = 0; i < data.length; i++){
                if (data[i].title == title){
                    document.getElementsByClassName("count")[0].textContent = data[i].quantity;
                }
                cartcontent += `<div class="cart-item">
                                    <img src="media/images/image-product-1-thumbnail.jpg" alt="item">
                                    <div>
                                        <p>${data[i].title}</p>
                                        <p>$${data[i].cost} x ${data[i].quantity} <strong>$${data[i].total}</strong></p>
                                    </div>
                                    <img src="media/images/icon-delete.svg" alt="X" class="delete-cart-icon">
                                </div>`;
    
            }
            cartcontent += '<button class="checkout">Checkout</button>';
            let parent = document.getElementsByClassName("cart-content")[0];
            document.getElementsByClassName("empty")[0] && parent.removeChild(document.getElementsByClassName("empty")[0]);
            document.getElementsByClassName("items")[0] && parent.removeChild(document.getElementsByClassName("items")[0]);
            let div = document.createElement("div");
            div.classList.add("items");
            parent.appendChild(div);
            document.getElementsByClassName("items")[0].innerHTML = cartcontent;

            let removeCartItem = document.getElementsByClassName("delete-cart-icon");
            for (let i = 0; i < removeCartItem.length; i++){
                removeCartItem[i].addEventListener("click", function(e){

                    let xhr = new XMLHttpRequest();
                    xhr.onload = function(){
                        let data = JSON.parse(xhr.responseText);
                        document.getElementsByClassName("count")[0].textContent = 0;
                        let toBedeleted = e.target.parentElement;
                        document.getElementsByClassName("items")[0].removeChild(toBedeleted);
                        if (data.length === 0){
                            document.getElementsByClassName("items")[0].removeChild(document.getElementsByClassName("checkout")[0]);
                        }
                        let p = document.createElement("p");
                        let t = document.createTextNode("Your cart is empty");
                        p.appendChild(t);
                        let div = document.createElement("div");
                        div.classList.add("empty");
                        div.appendChild(p);
                        document.getElementsByClassName("cart-content")[0].appendChild(div);
                    }

                    // console.log(e.target.previousSibling.previousSibling.firstChild.nextSibling);

                    let params = `title=${e.target.previousSibling.previousSibling.firstChild.nextSibling.textContent}`;

                    xhr.open('POST', "/cart/remove" ,true);
                    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                    xhr.send(params);
                })
            }
        }
    
    
        let params = `amount=${itemCount.textContent}&title=${title}&cost=${document.getElementById("item-cost").textContent.substring(1)}`;
    
        xhr.open('POST', "/cart/add" ,true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(params);
    }
})
