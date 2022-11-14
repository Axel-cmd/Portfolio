
class DynamicText {
    constructor(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    }
    tick() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="dynamic-text" id=dynamic-text>' + this.txt + '</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(function () {
            that.tick();
        }, delta);
    }
}



window.addEventListener("DOMContentLoaded", () => {

    const hambMenu = document.getElementById("hamb-menu");
    const navMenuTel = document.getElementById("navMenuTel");
    const dynamicContent = document.getElementById("container-dynamic");
    const header = document.getElementById("header-container");

    /****   MENU  ****/
    
    hambMenu.addEventListener('click', () => {
        // header.classList.remove("partially-transparent")
        navMenuTel.style.right = 0;

    })

    const closeNavMenuTel = document.getElementById('close-wrapper');

    closeNavMenuTel.addEventListener('click', () => {
        navMenuTel.style.right = "-100%";
        // header.classList.add("partially-transparent");

    })

    /****** TEXTE DYNAMIQUE ******/

    const toRotate = dynamicContent.getAttribute('data-type');
    const period= dynamicContent.getAttribute('data-period');

    if(toRotate) {
        new DynamicText(dynamicContent, JSON.parse(toRotate), period);
    }


    window.onscroll = function name(e) {
        const posY = window.scrollY;
        if(posY > 0 ) {
            header.classList.add("partially-transparent");
        } else 
        {
            header.classList.remove("partially-transparent")
        }
    }

    
})

