import DynamicText from './dynamicText'


window.addEventListener("DOMContentLoaded", () => { 


  //#region Menu

  const hambMenu = document.getElementById("hamb-menu");
  const navMenuTel = document.getElementById("navMenuTel");
  const itemMenu = document.getElementsByClassName("item-menu");

  const globalStyle = document.createElement('style');
  document.head.appendChild(globalStyle);

  /**
   * Closes the mobile menu and restores body scroll.
   */
  function closeMobileMenu(): void {
    if(!navMenuTel) return;
    navMenuTel.style.right = "-100%";
    globalStyle.innerHTML = `
        body {
            overflow: auto;
        }
    `;
  }

  /**
   * Opens the mobile menu and prevents body scroll.
   */
  function openMobileMenu(): void {
    if(!navMenuTel) return;
    navMenuTel.style.right = "0";
    globalStyle.innerHTML = `
        body {
            overflow: hidden;
        }
    `;
  }

  // Close menu when clicking on menu items
  for (const item of itemMenu) {
    item.addEventListener('click', closeMobileMenu);
  } 

  // Open menu when clicking hamburger icon
  hambMenu?.addEventListener('click', openMobileMenu);

  // Close menu when clicking close button
  const closeNavMenuTel = document.getElementById('close-wrapper');
  closeNavMenuTel?.addEventListener('click', closeMobileMenu);

  //#endregion


  // Apply transparent header effect on scroll
  const header = document.getElementById("header-container");
  if(header) window.onscroll = function() {
     onScrollTransparentHeader(header);
  }

  // Initialize dynamic text animations
  const dynamicTextContainerList = document.querySelectorAll(".dynamic-text-container");

  dynamicTextContainerList.forEach(dynamicTextContainer => {
    const textList = dynamicTextContainer.getAttribute("data-text-list");
    const period = dynamicTextContainer.getAttribute("data-period");

    if(textList) new DynamicText(dynamicTextContainer, textList, period ?? undefined);
  });

  // Custom cursor movement tracking
  const cursor = document.getElementById("cursor");
  document.body.addEventListener("mousemove", function(event) {
    if(cursor) {
      cursor.style.left = event.clientX + "px";
      cursor.style.top = event.clientY + "px";
    }
  });


  const accordionItems = document.querySelectorAll(".accordion__item");
  addEventOnAccordions(accordionItems);


})

//#region Scroll Transparent Header

/**
 * Applies or removes the transparent header effect based on scroll position.
 * Adds the 'partially-transparent' class when scrolled, removes it when at the top.
 * 
 * @param header - The header element to apply the transparency effect to
 */
function onScrollTransparentHeader(header: HTMLElement): void {
  const posY = window.scrollY;
  if (posY > 0) {
      header.classList.add("partially-transparent");
  }
  else {
      header.classList.remove("partially-transparent");
  }
}

//#endregion

//#region Accordion

/**
 * Toggles the expanded/collapsed state of an accordion item.
 * Updates the accordion's class, SVG icon state, and content height.
 * 
 * @param accordion - The accordion item element to toggle
 * @param content - The content element whose height will be adjusted (HTMLElement or null)
 */
function changeAccordionState(accordion: Element, content: HTMLElement | null): void {
  accordion.classList.toggle('accordion__item--expanded');

  const svg = accordion.querySelector('svg');
  svg?.classList.toggle('accordion__toggle-open');

  if(!content) return;
  content.style.height = `${accordion.classList.contains('accordion__item--expanded') ? content.scrollHeight : 0}px`;
}

/**
 * Adds click event listeners to all accordion items.
 * When an accordion is clicked, it expands/collapses and closes any other open accordions.
 * 
 * @param accordionItems - NodeList of all accordion item elements
 */
function addEventOnAccordions(accordionItems: NodeListOf<Element>): void {
  accordionItems.forEach( item =>  {

    const header = item.querySelector('.accordion__header');
    const content = item.querySelector('.accordion__content') as HTMLElement | null;

    header?.addEventListener('click', () => {

        accordionItems.forEach(otherItem => {
            if(otherItem !== item && otherItem.classList.contains('accordion__item--expanded')){
                changeAccordionState(otherItem, content);
            }
        });
        changeAccordionState(item, content);
    })

  })

}

//#endregion