import {Directive, HostBinding, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

@Directive({
  selector: '[pvDropdown]'
})
export class DropdownDirective implements OnInit {

  @HostBinding('class.show') isOpen;
  public status: Subject<boolean> = new Subject();

  ngOnInit() {
    this.status.subscribe((status: boolean) => this.isOpen = status);
  }

}
