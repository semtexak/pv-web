import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'pv-loading-button',
  templateUrl: './loading-button.component.html'
})
export class LoadingButtonComponent implements OnInit {

  @Output() onClick: EventEmitter<void> = new EventEmitter();
  @Input() hidden = false;
  @Input() disabled = false;
  @Input() loading = false;
  @Input() class = '';
  @Input() value = '';

  constructor() {
  }

  ngOnInit() {
  }

  click() {
    if (!this.loading) {
      this.onClick.emit();
    }
  }
}
