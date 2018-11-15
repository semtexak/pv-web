import {Directive, HostBinding, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

@Directive({
  selector: '[pvDropdown]'
})
export class DropdownDirective implements OnInit {

  @HostBinding('class.show') isOpen;
  @HostBinding('class.dropdown') isDropdown = true;
  public status: Subject<boolean> = new Subject();

  ngOnInit() {
    this.status.subscribe((status: boolean) => this.isOpen = status);
  }

}
