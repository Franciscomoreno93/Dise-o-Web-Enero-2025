document.addEventListener('DOMContentLoaded', function() {
    let container = document.getElementById("container");
    let carrouselr = document.getElementById("carrouselr");
    let carrousels = document.getElementsByClassName("carrousel").length;
    let buttons = document.getElementsByClassName("btn");

    let currentPosition = 0;
    let currentMargin = 0;
    let carrouselPerPage = 0;
    let carrouselCount = carrousels;
    let containerWidth = container.offsetWidth;
    let prevScreenSize = false;
    let nextScreenSize = false;

    window.addEventListener("resize", checkWidth);

    function checkWidth() {
        containerWidth = container.offsetWidth;
        setParams(containerWidth);
    }

    function setParams(w) {
        if (w < 551) {
            carrouselPerPage = 1;
        } else if (w < 901) {
            carrouselPerPage = 2;
        } else if (w < 1101) {
            carrouselPerPage = 3;
        } else {
            carrouselPerPage = 4;
        }
        
        carrouselCount = carrousels - carrouselPerPage;
        
        if (currentPosition > carrouselCount) {
            currentPosition = carrouselCount;
        }
        
        currentMargin = -currentPosition * (100 / carrouselPerPage);
        carrouselr.style.marginLeft = currentMargin + "%";
        
        if (currentPosition > 0) {
            buttons[0].classList.remove("inactive");
        } else {
            buttons[0].classList.add("inactive");
        }
        
        if (currentPosition < carrouselCount) {
            buttons[1].classList.remove("inactive");
        }
        
        if (currentPosition >= carrouselCount) {
            buttons[1].classList.add("inactive");
        }
    }

    setParams(containerWidth);

    window.carrouselLeft = function() {
        if (currentPosition > 0) {
            carrouselr.style.marginLeft = currentMargin + (100 / carrouselPerPage) + "%";
            currentMargin += (100 / carrouselPerPage);
            currentPosition--;
        }
        
        if (currentPosition === 0) {
            buttons[0].classList.add("inactive");
        }
        
        if (currentPosition < carrouselCount) {
            buttons[1].classList.remove("inactive");
        }
    };

    window.carrouselRight = function() {
        if (currentPosition < carrouselCount) {
            carrouselr.style.marginLeft = currentMargin - (100 / carrouselPerPage) + "%";
            currentMargin -= (100 / carrouselPerPage);
            currentPosition++;
        }
        
        if (currentPosition === carrouselCount) {
            buttons[1].classList.add("inactive");
        }
        
        if (currentPosition > 0) {
            buttons[0].classList.remove("inactive");
        }
    };
});