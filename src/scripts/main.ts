/**
 * Main entry point for the application.
 * Initializes all functionality modules when the DOM is ready.
 */

import { initMobileMenu } from './menu';
import { initScrollHeader } from './header';
import { initAccordion } from './accordion';
import { initCustomCursor } from './cursor';
import { initDynamicText } from './dynamicText';

window.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initScrollHeader();
  initDynamicText();
  initCustomCursor();
  initAccordion();
});