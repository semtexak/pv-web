import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[pvTabToggle]'
})
export class TabToggleDirective {

  constructor() {
    console.log('TEST');
  }
}
