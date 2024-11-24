const navbar = document.querySelector(".navbar");
const mainContainer = document.querySelector(".image-text-container img");
const bandContainer = document.getElementById('band'); 
const tourContainer = document.getElementById("tour");
const ticketButtons = document.querySelectorAll("#ticket-button1, #ticket-button2, #ticket-button3"); // Get the ticket-button element
const buyTicketContainer = document.querySelector('.buy-ticket-container');
const backgroundContainer = document.querySelector('.ticket-background-container');
const closeButton = document.getElementsByClassName('close-button');

const bandButton = document.querySelector('a[href = "#band"]'); 
const tourButton = document.querySelector('a[href = "#tour"]');
const contactButton = document.querySelector('a[href = "#contact"]');

const mainContainerHeight = mainContainer ? mainContainer.clientHeight : 0; // Get the height of the main container
const bandContainerHeight = bandContainer ? bandContainer.clientHeight : 0 + mainContainerHeight; // Calculate the height of the mainContainer and bandContainer
const tourContainerHeight = tourContainer ? tourContainer.clientHeight : 0 + bandContainerHeight; // Calculate the height of the tourContainer and bandContainer and mainContainer

let index = 0; // Global var for images
let toggle = 'OFF';

document.addEventListener('DOMContentLoaded', function() {
    fetch('navbar.html')
        .then((response => 
            response.text())
        )
        .then(html => {
            AOS.init();
            document.getElementById('navbarContainer').innerHTML = html;
            const logo = document.querySelector(".doors-logo");
            const menuButton = document.querySelector('#menuButton');
            const mobileMenu = document.querySelector(".mobile-menu");
            const mobileMenuButtons = document.querySelectorAll(".mobile-menu a");
            const exitButton = document.querySelector(".exit-button");
            const shoppingCart = document.querySelector(".fa.fa-shopping-cart");
            const notification = document.querySelector('.notification');
            const bars = document.querySelectorAll('.bar-container .bar');

            if (shoppingCart) {
                shoppingCart.style.display = 'none';
                notification.style.display = 'none';
            }

            if (menuButton) {
                menuButton.addEventListener("click", function () {
                    toggleExitButton(mobileMenu, bars);
                })
            }

            if (mobileMenuButtons) {
                mobileMenuButtons.forEach(buttons => {
                    buttons.style.display = 'flex';
                });
            }

            if (exitButton) {
                exitButton.addEventListener("click", function () {
                    mobileMenu.style.display = "none";
                })
            }

            // Adjusts the mobileMenu when the screen exceeds 768px 
            // and reverts it back when it equals or is less than 768px
            window.addEventListener('resize', function() {
                const windowWidth = window.innerWidth;
                console.log('Current window width:', windowWidth);
                
                if (windowWidth <= 768) {
                    mobileMenu.style.display = 'flex';
                    toggle = 'ON';
                } 
                else {
                    mobileMenu.style.display = 'none';
                    toggle = 'OFF';
                }
            });
        })
        .catch(error => {
            console.error('Error fetching navbar: ', error)});
});

function toggleExitButton(mobileMenu, bars) {
    if (toggle == 'OFF') {
        mobileMenu.style.display = "flex";
        mobileMenu.style.flexDirection = 'column';
        mobileMenu.style.position = 'absolute';
        mobileMenu.style.top = '100%';

        bars[0].style.transform = 'translateY(5px) rotate(45deg)';
        bars[1].style.display = 'none';
        bars[2].style.transform = 'translateY(-5px) rotate(-45deg)';
        bars[0].style.transition = '0.8s ease';
        bars[1].style.transition = '0.8s ease';
        bars[2].style.transition = '0.8s ease';

        menuButton.style.backgroundColor = 'red';
        // Remove any hover effect when it's toggled on (to keep it red)
        menuButton.removeEventListener("mouseover", hoverEffectGray);
        menuButton.removeEventListener("mouseleave", hoverEffectDefault);
        toggle = 'ON';
        return;
    }
    else if (toggle == 'ON') {
        mobileMenu.style.display = "none";

        bars[0].style.transform = 'translateY(0px) rotate(0deg)';
        bars[1].style.display = 'flex';
        bars[2].style.transform = 'translateY(0px) rotate(0deg)';
        bars[0].style.transition = '0.8s ease';
        bars[1].style.transition = '0.8s ease';
        bars[2].style.transition = '0.8s ease';

        menuButton.style.backgroundColor = 'gray';
        // Add hover effect back when it's toggled off
        menuButton.addEventListener("mouseover", hoverEffectGray);
        menuButton.addEventListener("mouseleave", hoverEffectDefault);
        toggle = 'OFF';
        return;
    }
}

// Hover effect functions
function hoverEffectGray() {
    menuButton.style.backgroundColor = 'gray';
}

function hoverEffectDefault() {
    menuButton.style.backgroundColor = '#333'; // Default background color
}

function carousel() {
    const containers = document.querySelectorAll(".image-text-container");
    const images = document.querySelectorAll(".text-container");
    let x = 0;
    if (index === images.length) {
        index = 0;
    }

    for(x; x < images.length; x++) {
        images[x].style.display = "none";
        containers[x].style.display = "none";
    };

    index++;
    const image = images[index - 1];
    images[index - 1].style.display = 'block';
    containers[index - 1].style.display = 'block';
    setTimeout(carousel, 5000); // Delay func by 5000 ms
};

function formValidation() {
    let name = document.forms['myForm']['name'].value;
    let email = document.forms['myForm']['email'].value;
    const regexName = /^[A-Za-z]+\s[A-Za-z]+$/;
    const regexEmail = /^\S+@\S+\.\S+/;
    if (name.match(regexName) && email.match(regexEmail)) {
        alert('Form was approved');
        return true;
    }
    alert('Form wasn\'t approved');
    return false;
};

for (const button of ticketButtons) {
    button.addEventListener('click', showTicketContainer);
}

for (const button of closeButton) {
    button.addEventListener('click', function () {
        closeTicketContainer(buyTicketContainer);
    });
}

function showTicketContainer() {
    backgroundContainer.style.display = 'flex';
    backgroundContainer.style.position = 'fixed';
    backgroundContainer.style.animationName = 'show-tickets';
    backgroundContainer.style.top = '0%';
    backgroundContainer.style.left = '0%';
    buyTicketContainer.style.display = 'flex';
    buyTicketContainer.style.flexDirection = 'column';
    buyTicketContainer.style.position = 'fixed';
    buyTicketContainer.style.animationName = 'show-tickets';
    buyTicketContainer.style.top = '12.5%'
    buyTicketContainer.style.left = '12.5%';
    //document.body.style.overflow = 'hidden'; /* Prevents window scrolling */
};

function closeTicketContainer() {
    backgroundContainer.animationName = 'hide-tickets';
    backgroundContainer.style.top = '-100%';
    backgroundContainer.style.left = '0%';
    buyTicketContainer.style.animationName = 'hide-tickets';
    buyTicketContainer.style.top = '-75%';
    buyTicketContainer.style.left = '12.5%';
    //document.body.style.overflow = 'visible';
};


/*
homeButton.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default behavior of the anchor link
    window.scrollTo ({
        top: 0,
        behavior: 'smooth',
    });
});

bandButton.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default behavior of the anchor link
    // Set main container height = to scroll position
    window.scrollTo ({
        top: mainContainerHeight,
        behavior: 'smooth',
    });
});

tourButton.addEventListener('click', function(event) {
    event.preventDefault();
    window.scrollTo ({
        top: bandContainerHeight, 
        behavior: 'smooth'
    });
});

contactButton.addEventListener('click', function(event) {
    event.preventDefault();
    window.scrollTo ({
        top: tourContainerHeight,
        behavior: 'smooth'
    });
});
*/

carousel();