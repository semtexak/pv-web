import {Directive, forwardRef, Host, HostBinding, Inject} from '@angular/core';
import {DropdownDirective} from './dropdown.directive';

@Directive({
  selector: '[pvDropdownMenu]'
})
export class DropdownMenuDirective {

  @HostBinding('class.pv-dropdown--open') isOpen = false;
  private dropdownMenu: DropdownDirective;

  constructor(@Host() @Inject(forwardRef(() => DropdownDirective)) dropdownMenu: DropdownDirective) {
    this.dropdownMenu = dropdownMenu;
    this.dropdownMenu.status.subscribe((status: boolean) => this.isOpen = status);
  }

}
