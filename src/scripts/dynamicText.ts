/**
 * DynamicText class creates a typewriter effect that cycles through a list of texts.
 * It types out each text character by character, then deletes it before moving to the next one.
 * 
 * @example
 * ```html
 * <div class="dynamic-text-container" data-text-list='["Developer", "Designer", "Creator"]' data-period="2000"></div>
 * ```
 * 
 * @example
 * ```typescript
 * const container = document.querySelector('.dynamic-text-container');
 * const textList = '["Developer", "Designer"]';
 * const period = '2000';
 * new DynamicText(container, textList, period);
 * ```
 */
export default class DynamicText {

    /** Base typing speed in milliseconds (will be randomized) */
    private static readonly BASE_TYPING_SPEED = 200;
    
    /** Random variation range for typing speed in milliseconds */
    private static readonly TYPING_SPEED_VARIATION = 100;
    
    /** Default period to wait before deleting text in milliseconds */
    private static readonly DEFAULT_PERIOD = 2000;
    
    /** Delay before starting next text after deletion completes in milliseconds */
    private static readonly POST_DELETE_DELAY = 500;
    
    /** Speed multiplier for deletion (makes deletion faster than typing) */
    private static readonly DELETION_SPEED_MULTIPLIER = 2;

    /** The DOM element container where the dynamic text will be displayed */
    private container: Element;
     
    /** Array of text strings to cycle through */
    private textList: string[];
  
    /** Time in milliseconds to wait before starting to delete the current text */
    private period: number;
  
    /** The current text being displayed (partial during typing/deleting) */
    private actualText: string;
  
    /** Whether the current operation is deleting characters (true) or typing (false) */
    private isDeleting: boolean;
  
    /** Counter tracking which text in the list is currently being displayed */
    private loopCount: number; 
  
    /**
     * Creates a new DynamicText instance and starts the animation.
     * 
     * @param container - The DOM element where the text will be displayed
     * @param textList - JSON string array of texts to cycle through (e.g., '["Text1", "Text2"]')
     * @param period - Optional string representing milliseconds to wait before deleting (default: 2000ms)
     */
    constructor(
      container: Element,
      textList: string,
      period: string = ''
    ) {
      this.container = container;
      this.textList = JSON.parse(textList);
      this.period = parseInt(period, 10) || DynamicText.DEFAULT_PERIOD;
  
      this.actualText = '';
      this.isDeleting = false;
      this.loopCount = 0;
      this.draw();
    }
  
    /**
     * Recursively draws the dynamic text animation.
     * Updates the DOM with the current text state and schedules the next update.
     * Handles both typing (adding characters) and deleting (removing characters) phases.
     */
    private draw(): void {
      const currentTextId = this.loopCount % this.textList.length;
      const fullText = this.textList[currentTextId];
  
      this.actualText = this.isDeleting ? fullText.substring(0, this.actualText.length - 1) : fullText.substring(0, this.actualText.length + 1);
  
      this.container.innerHTML = `<span class="dynamic-text" id="dynamic-text">${this.actualText}</span>`;

      let delta = DynamicText.BASE_TYPING_SPEED - Math.random() * DynamicText.TYPING_SPEED_VARIATION;
      if(this.isDeleting) delta /= DynamicText.DELETION_SPEED_MULTIPLIER;

      if(!this.isDeleting && this.actualText === fullText){
          delta = this.period;
          this.isDeleting = true;
      } else if (this.isDeleting && this.actualText === ''){
          this.isDeleting = false;
          this.loopCount++;
          delta = DynamicText.POST_DELETE_DELAY;
      }
  
      setTimeout(() => {
          this.draw();
      }, delta);
    }
  
}

/**
 * Initializes dynamic text animations.
 * Finds all elements with the 'dynamic-text-container' class and initializes DynamicText instances.
 */
export function initDynamicText(): void {
  const dynamicTextContainerList = document.querySelectorAll(".dynamic-text-container");

  dynamicTextContainerList.forEach(dynamicTextContainer => {
    const textList = dynamicTextContainer.getAttribute("data-text-list");
    const period = dynamicTextContainer.getAttribute("data-period");

    if (textList) {
      new DynamicText(dynamicTextContainer, textList, period ?? undefined);
    }
  });
}