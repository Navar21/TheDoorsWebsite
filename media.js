import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'

const playButton = document.querySelector('.music-player-container .fa-play');
const pauseButton = document.querySelector('.music-player-container .fa-pause');
var backImage = document.querySelector('.album-back');
var backCardContainers = document.querySelectorAll('.back-card-container');
const playButtons = document.querySelectorAll('.song-container .fa-play');

let song = new Audio('media/Break on Through (To the Other Side).mp3');
let volumeSlider = document.querySelector('#volume-slider');
let windowSize = window.matchMedia("(max-width: 730px)");

document.addEventListener('DOMContentLoaded', function() {
    fetch('navbar.html')
        .then((response => 
            response.text())
        )
        .then(html => {
            document.getElementById('navbarContainer').innerHTML = html;
            const homeButton = document.querySelectorAll("#navbarid a");
            const navbar = document.querySelector('.navbar');
            const links = document.querySelectorAll('#navbarid a');
            const moreButton = document.querySelector('#button');
            const doorsLogo = document.querySelector('.doors-logo');
            const menuButton = document.querySelector('#menuButton');
            const mobileMenu = document.querySelector(".mobile-menu");
            const exitButton = document.querySelector(".exit-button"); 
            const shoppingCartContainer = document.querySelector('.shopping-cart-container');
            const listOfLinks = ['Band', 'Tour', 'Contact', 'More'];

            for (let x = 0; x < listOfLinks.length; ++x) {
                if (links[x + 1].innerHTML == listOfLinks[x]) {
                    links[x + 1].style.display = 'none';
                }
            }

            if (navbar) {
                navbar.style.display = 'flex';
                navbar.style.alignItems = 'center';
                navbar.style.position = 'fixed';
                navbar.style.zIndex = 999;
                links[0].style.padding = '11px 20px';
                // Move Logo to the right
                doorsLogo.style.marginRight = 0;
                menuButton.style.display = 'none';
                moreButton.style.display = 'none';
                shoppingCartContainer.style.display = 'none';
            }

            homeButton[0].addEventListener('click', function() {
                window.location.href = 'http://127.0.0.1:5500/The%20Doors%20Website/index.html';
            });

            pauseButton.style.display = 'none';
            playSong();
            
            if (playButton) {
                playButton.addEventListener('click', function() {
                    toggleOff();
                    song.play();
                })
            }

            if (pauseButton) {
                pauseButton.addEventListener('click', function() {
                    toggleOn();
                    song.pause();
                })
            }     

            // Set initial volume based on the range slider value
            song.volume = volumeSlider.value / 100;

            // Listen for input event on the volume slider
            volumeSlider.addEventListener('input', function() {
                // Update the volume of the audio based on the range slider value
                song.volume = this.value / 100;
            });

            var backImageHeight = backImage.offsetHeight;
            backCardContainers.forEach(container => {
                container.style.height = backImageHeight + 'px';
            })

            windowSize.addListener(reduceSlidesPerView);
            reduceSlidesPerView(windowSize);
        })
        .catch(error => {
            console.error('Error fetching navbar: ', error)});
});

const swiper = new Swiper('.swiper', {
    slidesPerView: 3,
    loop: false,
    speed: 500,
    spaceBetween: 30,
    allowTouchMove: true,
    centeredSlides: true,
    effect: 'coverflow',
    coverflowEffect: {
      rotate: 30,
      stretch: 0,
      depth: 200,
      modifier: 1,
    },
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
});

function toggleOff() {
    playButton.style.display = 'none';
    pauseButton.style.display = 'flex';
}

function toggleOn() {
    playButton.style.display = 'flex';
    pauseButton.style.display = 'none';
}

function playSong() {
    playButtons.forEach(albumplayButton => {
        albumplayButton.addEventListener('click', function() {
            albumplayButton.style.display = 'none';
            song.play();
            toggleOff();

            pauseButton.addEventListener('click', function() {
                song.pause();
                toggleOn();
            })
        })
    })
}

function reduceSlidesPerView(e) {
    if (e.matches) {
        swiper.params.slidesPerView = 2;
        swiper.update();
    }
    else {
        swiper.params.slidesPerView = 3;
        swiper.update();
    }
}