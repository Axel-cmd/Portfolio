/**
 * Accordion functionality.
 * Manages expand/collapse behavior for accordion items.
 */

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

  if (!content) return;
  content.style.height = `${accordion.classList.contains('accordion__item--expanded') ? content.scrollHeight : 0}px`;
}

/**
 * Adds click event listeners to all accordion items.
 * When an accordion is clicked, it expands/collapses and closes any other open accordions.
 * 
 * @param accordionItems - NodeList of all accordion item elements
 */
function addEventOnAccordions(accordionItems: NodeListOf<Element>): void {
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion__header');
    const content = item.querySelector('.accordion__content') as HTMLElement | null;

    header?.addEventListener('click', () => {
      accordionItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('accordion__item--expanded')) {
          changeAccordionState(otherItem, content);
        }
      });
      changeAccordionState(item, content);
    });
  });
}

/**
 * Initializes accordion functionality.
 * Sets up event listeners for all accordion items on the page.
 */
export function initAccordion(): void {
  const accordionItems = document.querySelectorAll(".accordion__item");
  addEventOnAccordions(accordionItems);
}

