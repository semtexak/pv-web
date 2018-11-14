import {Directive, ElementRef, forwardRef, Host, HostListener, Inject, Input, OnInit, Renderer2} from '@angular/core';
import {DropdownDirective} from './dropdown.directive';

@Directive({
  selector: '[pvDropdownToggle]'
})
export class DropdownToggleDirective implements OnInit {

  @Input() outerClick = true;
  private isOpen = false;
  private dropdownMenu: DropdownDirective;

  @HostListener('click', ['$event']) toggleOpen(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.isOpen = !this.isOpen;
    this.dropdownMenu.status.next(this.isOpen);
  }

  @HostListener('document:click') mouseClickDismiss() {
    if (this.isOpen && this.outerClick) {
      this.isOpen = false;
      this.dropdownMenu.status.next(this.isOpen);
    }
  }

  constructor(@Host() @Inject(forwardRef(() => DropdownDirective)) dropdownMenu: DropdownDirective,
              private elRef: ElementRef,
              private renderer: Renderer2) {
    this.dropdownMenu = dropdownMenu;
    this.dropdownMenu.status.subscribe((status: boolean) => {
      this.isOpen = status;
      this.renderer.setAttribute(this.elRef.nativeElement, 'aria-expanded', status.toString());
    });
  }

  ngOnInit(): void {
    this.renderer.setAttribute(this.elRef.nativeElement, 'aria-haspopup', 'true');
    this.renderer.setAttribute(this.elRef.nativeElement, 'aria-expanded', this.isOpen.toString());
  }

}
