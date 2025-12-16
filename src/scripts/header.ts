/**
 * Header scroll functionality.
 * Manages the transparent header effect based on scroll position.
 */

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
  } else {
    header.classList.remove("partially-transparent");
  }
}

/**
 * Initializes the scroll header effect.
 * Sets up the scroll event listener to apply transparency effect.
 */
export function initScrollHeader(): void {
  const header = document.getElementById("header-container");
  if (header) {
    window.onscroll = () => onScrollTransparentHeader(header);
  }
}

