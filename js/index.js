class DynamicText {
    constructor(container, textList, period)
    {
        this.container = container;
        this.textList = JSON.parse(textList); // Parse string to have a table
        this.period = parseInt(period, 10) || 2000; //default is 2000ms if cannot parse to int
        this.actualText = '';
        this.isDeleting = false;
        this.loopCount = 0;
        // start to draw dynamic text
        this.draw();
    }

    draw() {
        // get the current id of the element to draw
        const currentTextId = this.loopCount % this.textList.length;
        // get the full text
        const fullText = this.textList[currentTextId];

        // update actual text with the direction
        this.actualText = this.isDeleting ? fullText.substring(0, this.actualText.length - 1) : fullText.substring(0, this.actualText.length + 1);

        // update dom
        this.container.innerHTML = `<span class="dynamic-text" id=dynamic-text>${this.actualText}</span>`;

        let delta = 200 - Math.random() * 100;
        // make deleting faster
        if(this.isDeleting) delta /= 2;

        if(!this.isDeleting && this.actualText === fullText){
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.actualText === ''){
            this.isDeleting = false;
            this.loopCount++;
            delta = 500;
        }

        setTimeout(() => {
            this.draw();
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

function changeAccordionState(accordion) {
    accordion.classList.toggle('accordion__item--expanded');
    accordion.classList.toggle('accordion__item--collapsed');

    const svg = accordion.querySelector('svg');
    svg.classList.toggle('accordion__toggle-open');

}

function addEventOnAccordion(element, allElement) {

    const header = element.querySelector('.accordion__header');

    header.addEventListener('click', () => {
        
        allElement.forEach(e => {
            if(e !== element && e.classList.contains('accordion__item--expanded')){
                changeAccordionState(e)
            }
        });

        changeAccordionState(element);
    })
}


// détecter la section 
// https://stackoverflow.com/questions/68541873/detect-section-id-as-the-page-scrolled-down-with-vanilla-js



window.addEventListener("DOMContentLoaded", () => {

    const hambMenu = document.getElementById("hamb-menu");
    const navMenuTel = document.getElementById("navMenuTel");
    const itemMenu = document.getElementsByClassName("item-menu");
    
    const header = document.getElementById("header-container");

    const accordionItem = document.querySelectorAll(".accordion__item")

    /****   MENU  ****/
    
    for (const item of itemMenu) {
        item.addEventListener('click', () => {
            navMenuTel.style.right = "-100%";
        })
    }
   
    hambMenu.addEventListener('click', () => {
        navMenuTel.style.right = 0;
    })

    const closeNavMenuTel = document.getElementById('close-wrapper');

    closeNavMenuTel.addEventListener('click', () => {
        navMenuTel.style.right = "-100%";
    })

    /****** TEXTE DYNAMIQUE ******/

    const dynamicTextContainerList = document.querySelectorAll(".dynamic-text-container");

    dynamicTextContainerList.forEach(dynamicTextContainer => {
        // get attributes
        const textList = dynamicTextContainer.getAttribute("data-text-list");
        const period = dynamicTextContainer.getAttribute("data-period");
    
        if(textList) new DynamicText(dynamicTextContainer, textList, period);
    });


    window.onscroll = function name(e) {
        onScrollTransparentHeader(header);
        // navHighlighter(sections);
    }

    var cursor = document.getElementById("cursor");
    document.body.addEventListener("mousemove", function(e) {
        cursor.style.left = e.clientX + "px",
        cursor.style.top = e.clientY + "px";
    });

    accordionItem.forEach(element => addEventOnAccordion(element, accordionItem))
})
