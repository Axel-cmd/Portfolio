
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


function onScrollTransparentHeader(header) {
    const posY = window.scrollY;
    if (posY > 0) {
        header.classList.add("partially-transparent");
    }
    else {
        header.classList.remove("partially-transparent");
    }
}

function navHighlighter(sections){
    let scrollY = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;

        const sectionTop = (current.getBoundingClientRect().top + window.screenY) -1;
        const sectionId = current.getAttribute("id");

        if(scrollY > sectionTop && scrollY <= sectionTop+sectionHeight){
            // console.log(`active ${sectionId}`)
            const el = document.querySelector("a[href*=" + sectionId + "]")
            console.log(el)
            el.classList.add("active");
        } else 
        {
            // document.querySelector("a[href*=" + sectionId + "]").classList.remove("active");
        }
    });
}

window.addEventListener("DOMContentLoaded", () => {

    const hambMenu = document.getElementById("hamb-menu");
    const navMenuTel = document.getElementById("navMenuTel");
    const itemMenu = document.getElementsByClassName("item-menu");
    const dynamicContent = document.getElementById("container-dynamic");
    const header = document.getElementById("header-container");
    const sections = document.querySelectorAll("section[id]");

    /****   MENU  ****/
    
    for (const item of itemMenu) {
        item.addEventListener('click', () => {
            navMenuTel.style.right = "-100%";
        })
    }
   

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
        onScrollTransparentHeader(header);
        // navHighlighter(sections);
    }

    var cursor = document.getElementById("cursor");
    document.body.addEventListener("mousemove", function(e) {
        cursor.style.left = e.clientX + "px",
        cursor.style.top = e.clientY + "px";
    });

})

