/**
 * Custom cursor functionality.
 * Tracks mouse movement and updates custom cursor position.
 */

/**
 * Initializes the custom cursor tracking.
 * Sets up the mousemove event listener to update cursor position.
 */
export function initCustomCursor(): void {
  const cursor = document.getElementById("cursor");
  if (!cursor) return;

  document.body.addEventListener("mousemove", (event: MouseEvent) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  });
}

