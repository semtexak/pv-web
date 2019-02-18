import { Directive } from '@angular/core';

@Directive({
  selector: '[pvTabContent]'
})
export class TabContentDirective {

  constructor() {
    console.log('TEST');
  }

}
