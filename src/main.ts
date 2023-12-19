import DynamicText from './dynamicText'


window.addEventListener("DOMContentLoaded", () => { 


  //#region MENU

  const hambMenu = document.getElementById("hamb-menu");
  const navMenuTel = document.getElementById("navMenuTel");
  const itemMenu = document.getElementsByClassName("item-menu");

  const globalStyle = document.createElement('style');
  document.head.appendChild(globalStyle);


  for (const item of itemMenu) {
    item.addEventListener('click', () => {
      if(!navMenuTel) return;
      navMenuTel.style.right = "-100%";
      globalStyle.innerHTML = `
          body {
              overflow: auto;
          } 
      `;
    })
  } 

  hambMenu?.addEventListener('click', () => {
      if(!navMenuTel) return;

      navMenuTel.style.right = "0";

      globalStyle.innerHTML = `
      body {
          overflow: hidden;
      }
      `;
      
  })

  const closeNavMenuTel = document.getElementById('close-wrapper');

  closeNavMenuTel?.addEventListener('click', () => {
      if(!navMenuTel) return;

      navMenuTel.style.right = "-100%";
      globalStyle.innerHTML = `
          body {
              overflow: auto;
          }
      `;
  })


  //#endregion


  // blur on the header on scrolling 
  const header = document.getElementById("header-container");
  if(header) window.onscroll = function name() {
     onScrollTransparentHeader(header);
  }



  /********* TEXTE DYNAMIQUE **********/
  const dynamicTextContainerList = document.querySelectorAll(".dynamic-text-container");

  dynamicTextContainerList.forEach(dynamicTextContainer => {
    // get attributes
    const textList = dynamicTextContainer.getAttribute("data-text-list");
    const period = dynamicTextContainer.getAttribute("data-period");

    if(textList) new DynamicText(dynamicTextContainer, textList, period ?? undefined);
  });

  /********************************** */

  var cursor = document.getElementById("cursor");
  document.body.addEventListener("mousemove", function(e) {
    if(cursor) {
      cursor.style.left = e.clientX + "px",
      cursor.style.top = e.clientY + "px";
    }
  });


  const accordionItems = document.querySelectorAll(".accordion__item")
  addEventOnAccordions(accordionItems);


})

//#region SCROLL TRANPARENT HEADER 

function onScrollTransparentHeader(header: HTMLElement) {
  const posY = window.scrollY;
  if (posY > 0) {
      header.classList.add("partially-transparent");
  }
  else {
      header.classList.remove("partially-transparent");
  }
}


//#endregion

//#region ACCORDION


function changeAccordionState(accordion: Element, content: any) {
  accordion.classList.toggle('accordion__item--expanded');
  // accordion.classList.toggle('accordion__item--collapsed');

  const svg = accordion.querySelector('svg');
  svg?.classList.toggle('accordion__toggle-open');

  if(!content) return;
  content.style.height = `${accordion.classList.contains('accordion__item--expanded') ? content.scrollHeight : 0}px`;
}

// détecter la section 
// https://stackoverflow.com/questions/68541873/detect-section-id-as-the-page-scrolled-down-with-vanilla-js


function addEventOnAccordions(accordionItems: NodeListOf<Element>) {
  accordionItems.forEach( item =>  {

    const header = item.querySelector('.accordion__header');
    const content = item.querySelector('.accordion__content');

    header?.addEventListener('click', () => {

        accordionItems.forEach(e => {
            if(e !== item && e.classList.contains('accordion__item--expanded')){
                changeAccordionState(e, content);
            }
        });
        changeAccordionState(item, content);
    })

  })

}


//#endregion