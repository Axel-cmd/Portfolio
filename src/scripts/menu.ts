/**
 * Mobile menu functionality.
 * Handles opening/closing the mobile navigation menu and managing body scroll.
 */

/**
 * Closes the mobile menu and restores body scroll.
 * 
 * @param navMenuTel - The mobile navigation menu element
 * @param globalStyle - The style element used to control body overflow
 */
function closeMobileMenu(navMenuTel: HTMLElement, globalStyle: HTMLStyleElement): void {
  navMenuTel.style.right = "-100%";
  globalStyle.innerHTML = `
      body {
          overflow: auto;
      }
  `;
}

/**
 * Opens the mobile menu and prevents body scroll.
 * 
 * @param navMenuTel - The mobile navigation menu element
 * @param globalStyle - The style element used to control body overflow
 */
function openMobileMenu(navMenuTel: HTMLElement, globalStyle: HTMLStyleElement): void {
  navMenuTel.style.right = "0";
  globalStyle.innerHTML = `
      body {
          overflow: hidden;
      }
  `;
}

/**
 * Initializes the mobile menu functionality.
 * Sets up event listeners for hamburger menu, close button, and menu items.
 */
export function initMobileMenu(): void {
  const hambMenu = document.getElementById("hamb-menu");
  const navMenuTel = document.getElementById("navMenuTel");
  const itemMenu = document.getElementsByClassName("item-menu");
  const closeNavMenuTel = document.getElementById('close-wrapper');

  if (!navMenuTel) return;

  const globalStyle = document.createElement('style');
  document.head.appendChild(globalStyle);

  const closeHandler = () => closeMobileMenu(navMenuTel, globalStyle);
  const openHandler = () => openMobileMenu(navMenuTel, globalStyle);

  // Close menu when clicking on menu items
  for (const item of itemMenu) {
    item.addEventListener('click', closeHandler);
  }

  // Open menu when clicking hamburger icon
  hambMenu?.addEventListener('click', openHandler);

  // Close menu when clicking close button
  closeNavMenuTel?.addEventListener('click', closeHandler);
}

