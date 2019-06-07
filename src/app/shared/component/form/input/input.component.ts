import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'pv-input',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit, OnChanges {

  @Input() control: FormControl = undefined;
  @Input() label: string = 'Label';
  @Input() id: string = undefined;
  @Input() placeholder: string = undefined;
  @Input() showRequired: boolean = true;

  @Input() type: string = 'text';
  required: boolean = false;
  @Input() tooltip: string = undefined;
  @Input() iconOptions: InputIconOptions = {
    enabled: false,
    class: 'fa-question',
    alignmentToLeft: false
  };
  @Input() hideLabel: boolean = false;
  @Input() items: Array<any> = [];

  constructor() { }

  ngOnInit() {
    if (this.control && this.control.errors) {
      if (this.control.errors.required) {
        this.required = true;
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.disabled) {

    }
  }
}


export interface InputIconOptions {
  enabled: boolean;
  class: string;
  alignmentToLeft?: boolean;
}
