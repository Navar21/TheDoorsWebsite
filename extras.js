const wallpaper = document.querySelector('.wallpaper');
const newsContainer = document.querySelector('.news-container');
const doorsHeadlineImage = document.querySelector('.doors-headline');
const readMore = document.querySelector('.read-more a');
const arrowDown = document.querySelector('.read-more i');
const middleContainer = document.querySelector('.middle-container');
const eventContainer = document.querySelector('.event-container');

document.addEventListener('DOMContentLoaded', function() {
    fetch('navbar.html')
        .then((response => 
            response.text())
        )
        .then(html => {
            AOS.init({        
                // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
                offset: 120, // offset (in px) from the original trigger point
                delay: 0, // values from 0 to 3000, with step 50ms
                duration: 800, // values from 0 to 3000, with step 50ms
                easing: 'ease', // default easing for AOS animations
                once: false, // whether animation should happen only once - while scrolling down
                mirror: false, // whether elements should animate out while scrolling past them
                anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation        
            });

            document.getElementById('navbarContainer').innerHTML = html;
            const homeButton = document.querySelectorAll("#navbarid a");
            const navbar = document.querySelector('.navbar');
            const links = document.querySelectorAll('#navbarid a');
            const moreButton = document.querySelector('button');
            const doorsLogo = document.querySelector('.doors-logo');
            const menuButton = document.querySelector('#menuButton');
            const mobileMenu = document.querySelector(".mobile-menu");
            const exitButton = document.querySelector(".exit-button"); 
            const listOfLinks = ['Band', 'Tour', 'Contact', 'More'];

            document.querySelector('.shopping-cart-container').style.display = 'none';

            for(let x = 0; x < listOfLinks.length; ++x) {
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
                // Move Logo to the right
                doorsLogo.style.marginRight = 0;
                menuButton.style.display = 'none';
            }

            homeButton[0].addEventListener('click', function() {
                window.location.href = 'http://127.0.0.1:5500/The%20Doors%20Website/index.html';
            })

            readMore.addEventListener('mousemove', function() {
                readMore.style.color = 'red';
                arrowDown.style.color = 'red';
            })
            
            readMore.addEventListener('mouseleave', function() {
                readMore.style.color = 'black';
                arrowDown.style.color = 'black';
            })

            window.addEventListener('resize', updateMiddleContainerHeight);
            updateMiddleContainerHeight();
        })
        .catch(error => {
            console.error('Error fetching navbar: ', error)});
});

// Function to calculate and update middleContainer height
function updateMiddleContainerHeight() {
    const newsContainerHeight = newsContainer ? newsContainer.clientHeight : 0;
    // Get the computed margin-top of the news container
    const newsContainerTop = parseInt(window.getComputedStyle(newsContainer).top);
    const middleContainerTopPosition = newsContainerHeight + newsContainerTop;
    
    middleContainer.style.top = `calc(${middleContainerTopPosition}px)`;
    updateEventContainerHeight(middleContainerTopPosition)
}

function updateEventContainerHeight(height) {
    const middleContainerHeight = middleContainer ? middleContainer.clientHeight : 0;
    const eventContainerTopPosition = height + middleContainerHeight;

    eventContainer.style.top = `calc(${eventContainerTopPosition}px)`;
}