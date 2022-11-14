
class TxtType {
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

    hambMenu.addEventListener('click', () => {
        navMenuTel.style.right = 0;
    })

    const closeNavMenuTel = document.getElementById('close-wrapper');

    closeNavMenuTel.addEventListener('click', () => {
        navMenuTel.style.right = "-100%";
    })


    const toRotate = dynamicContent.getAttribute('data-type');
    const period= dynamicContent.getAttribute('data-period');

    if(toRotate) {
        new TxtType(dynamicContent, JSON.parse(toRotate), period);
    }

    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".container-dynamic > .dynamic-text { border-right: .15em solid #FF7675; color: #FF7675; font-size: 1.75em}";
    document.body.appendChild(css);
    
})