
export default class DynamicText {

    private container: Element;
     
    private textList: string[];
  
    private period: number;
  
    private actualText: string;
  
    private isDeleting: boolean;
  
    private loopCount: number; 
  
    constructor(
      container: Element,
      textList: string,
      period: string = ''
    ) {
      // required properties
      this.container = container;
      this.textList = JSON.parse(textList);
      this.period = parseInt(period, 10) || 2000; //default is 2000ms if cannot parse to int
  
      this.actualText = '';
      this.isDeleting = false;
      this.loopCount = 0;
      // start to draw dynamic text
      this.draw();
    }
  
    private draw() {
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