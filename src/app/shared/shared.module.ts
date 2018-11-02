import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropdownDirective} from './directive/dropdown.directive';
import {DropdownMenuDirective} from './directive/dropdown-menu.directive';
import {DropdownToggleDirective} from './directive/dropdown-toggle.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DropdownDirective,
    DropdownMenuDirective,
    DropdownToggleDirective
  ],
  exports: [
    DropdownDirective,
    DropdownMenuDirective,
    DropdownToggleDirective
  ]
})
export class SharedModule {
}
