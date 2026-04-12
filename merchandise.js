const imageContainers = document.querySelectorAll('.image-container');
const checkMarks = document.querySelectorAll('.check-mark');
const checkoutButton = document.querySelector('#proceed-to-checkout');

let items = 0;
let windowSize = window.matchMedia("(max-width: 730px)");

document.addEventListener('DOMContentLoaded', function() {
    fetch('navbar.html')
        .then((response => 
            response.text())
        )
        .then(html => {
            AOS.init();
            document.getElementById('navbarContainer').innerHTML = html;
            const homeButton = document.querySelectorAll("#navbarid a");
            const navbar = document.querySelector('.navbar');
            const links = document.querySelectorAll('#navbarid a');
            const moreButton = document.querySelector('button');
            const doorsLogo = document.querySelector('.doors-logo');
            const menuButton = document.querySelector('#menuButton');
            const mobileMenu = document.querySelector(".mobile-menu");
            const exitButton = document.querySelector(".exit-button");
            const shoppingCartContainer = document.querySelector(".shopping-cart-container");
            const shoppingCart = document.querySelector(".fa.fa-shopping-cart");
            const itemInCart = document.querySelector(".view-cart-container");
            const cartDetails = document.querySelector(".shopping-cart-inner-container"); 

            const notification = document.querySelector(".notification");
            const listOfLinks = ['Band', 'Tour', 'Contact', 'More'];
            let clicks = 0;

            for (let x = 0; x < listOfLinks.length; ++x) {
                if (links[x + 1].innerHTML == listOfLinks[x]) {
                    links[x + 1].style.display = 'none';
                }
                if (moreButton.innerText == listOfLinks[x + 1]) {
                    moreButton.style.display = 'none';
                }
            }

            if (navbar) {
                navbar.style.display = 'flex';
                navbar.style.alignItems = 'center';
                links[0].style.padding = '11px 20px';
                doorsLogo.style.marginRight = 'auto';
                shoppingCart.style.position = 'relative';
                shoppingCart.style.color = 'white';
                shoppingCart.style.padding = '10px 20px';
                shoppingCart.style.fontSize = '20px';
                shoppingCart.style.cursor = 'pointer';
                
                shoppingCartContainer.addEventListener("click", function() {
                    if (clicks == 2) {
                        clicks = 0;
                    }
                    clicks++;
                    if (clicks == 1) {
                        displayShoppingCart(cartDetails)
                        windowSize.addListener(reduceScreen);
                        reduceScreen(windowSize, doorsLogo)
                    }
                    else if (clicks == 2) {
                        hideShoppingCart(cartDetails)
                        displayDoorsLogo(doorsLogo);
                    }
                })

                homeButton[0].addEventListener('click', function() {
                    window.location.href = 'http://127.0.0.1:5500/The%20Doors%20Website/index.html';
                });

                incrementCart(notification);
                getElements(notification);
            }
        })
        .catch(error => {
            console.error('Error fetching navbar: ', error)});
});

document.addEventListener('DOMContentLoaded', function() {
    for (let i = 0; i < checkMarks.length; ++i) {
        checkMarks[i].style.opacity = '0'; // Hide all check marks initially
        checkMarks[i].style.transition = '0.8s ease'
    }
});

function reduceScreen(e, doorsLogo) {
    if (e.matches) {
        doorsLogo.style.display = 'none';
    } 
}

function displayDoorsLogo(doorsLogo) {
    doorsLogo.style.display = 'flex';
}

function displayShoppingCart(cartDetails) {
    cartDetails.style.display = 'flex';
    cartDetails.style.width = '400px';
    cartDetails.style.height = '44px';
    cartDetails.style.backgroundColor = 'gray';
    cartDetails.style.transition = 'opacity 0.8s';
    cartDetails.style.opacity = '1';
}

function hideShoppingCart(cartDetails) {
    cartDetails.style.width = '0';
    cartDetails.style.transition = 'opacity 0.8s';
    cartDetails.style.opacity = '0';
}

function displayCheckMark(addToCartContainer) {
    const checkMark = addToCartContainer.querySelector('.check-mark');
    checkMark.style.opacity = '1';
    setInterval(function() {
        checkMark.style.opacity = '0'
    }, 2000);
}

function incrementCart(notification) {
    imageContainers.forEach(imageContainer => {
        imageContainer.querySelector('.add-to-cart').addEventListener("click", function() {
            const quantity = imageContainer.querySelector('input[type="number"]');
            const quantityValue = quantity.value.trim(); // Trim to remove whitespace
            const quantityAmount = parseInt(quantityValue, 10); // Convert to integer
            const addToCartContainer = imageContainer.querySelector('.add-to-cart-container');
            if ((quantityAmount >= 1 && quantityAmount <= 3) && (quantityAmount != '' )) {
                notification.innerHTML = ++items;
                checkOutButtonDisplay(items);
                displayCheckMark(addToCartContainer);
                return;
            }
            if (quantityValue == '' || isNaN(quantityValue)) {
                alert('Please select a quantity');
                return;
            }
            else if (quantityAmount < 1 || quantityAmount > 3) {
                alert('Quantity must be between 1 and 3');
                return;
            }
        })
    })
}

function getElements(notification) {
    imageContainers.forEach(imageContainer => {
        imageContainer.querySelector('.add-to-cart').addEventListener("click", function() {
            const image = imageContainer.querySelector('.merch-picture').src;
            const info = imageContainer.querySelector('.info').innerText;
            const cost = imageContainer.querySelector('.cost').innerText;
            const select = imageContainer.querySelector('select');
            const quantity = imageContainer.querySelector('input[type="number"]');
            const quantitySelected = quantity.value;
            // To check for items that don't contain size selection
            if (select) {
                const selectedOption = select.options[select.selectedIndex];
                const selectedSize = selectedOption.textContent; 
                fillCart(image, info, cost, selectedSize, quantitySelected, notification);
                return;
            }
            const selectedSize = '';
            fillCart(image, info, cost, selectedSize, quantitySelected, notification);
            return;
        })
    })
}

function fillCart(image, info, cost, selectedSize, quantitySelected, notification) {
    const shoppingCartContainer = document.querySelector('.shopping-cart-inner-container');

    // Check if viewCartContainer exists, if not create and append new to shoppingCartContainer
    let viewCartContainer = shoppingCartContainer.querySelector('.view-cart-container');
    if (!viewCartContainer) {
        const viewCartContainer = document.createElement('div');
        viewCartContainer.classList.add('view-cart-container');
        shoppingCartContainer.appendChild(viewCartContainer);
    }

    const infoContainer = document.createElement('div');
    infoContainer.classList.add('info-container');

    // Create a new div to hold the item info
    const itemContainer = document.createElement('div');
    itemContainer.classList.add('item-info');

    // Create an image element for the product picture
    const picture = document.createElement('img');
    picture.src = image;
    picture.classList.add('.item-image');
    itemContainer.appendChild(picture);
    infoContainer.appendChild(itemContainer);

    // Create a new div to hold the item info
    const itemContainer2 = document.createElement('div');
    itemContainer2.classList.add('item-info');
    itemContainer2.style.justifyContent = 'space-around';

    // Create a paragraph for the product information
    const itemInfo = document.createElement('p');
    itemInfo.classList.add('info');
    itemInfo.innerHTML = `${info}`;
    itemContainer2.appendChild(itemInfo);

    // Create a paragraph for the size information
    if (selectedSize !== "") {
        const size = document.createElement('p');
        size.classList.add('size');
        size.innerHTML = `Size: <b>${selectedSize}</b>`;
        itemContainer2.appendChild(size);
    }

    // Create a paragraph for the product cost
    const price = document.createElement('p');
    price.classList.add('cost');
    price.innerHTML = `<b>${cost}</b>`;
    itemContainer2.appendChild(price);

    // Create a paragraph for the product quantity
    const quantityParagraph = document.createElement('p');
    quantityParagraph.classList.add('quantity');
    quantityParagraph.textContent = `Quantity: ${quantitySelected}`;
    itemContainer2.appendChild(quantityParagraph);

    // Create a trash icon for removing the item
    const trashIcon = document.createElement('i');
    trashIcon.classList.add('fa', 'fa-trash-o');
    itemContainer2.appendChild(trashIcon);
    infoContainer.appendChild(itemContainer2);

    // Append the item container to the cart container
    viewCartContainer.appendChild(infoContainer);

    trashIcon.addEventListener('click', function() {
        viewCartContainer.removeChild(infoContainer);
        notification.innerHTML = --items;
        checkOutButtonDisplay(items);
    })
}

function checkOutButtonDisplay(itemCount) {
    if (itemCount > 0) {
        checkoutButton.style.display = 'flex';
    }
    else {
        checkoutButton.style.display = 'none';
    }
}