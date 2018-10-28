import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[pvDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.dropdown') isDropdown = false;

  @HostListener('click') toggleOpen() {
    console.log(!this.isDropdown);
    this.isDropdown = !this.isDropdown;
  }

}
