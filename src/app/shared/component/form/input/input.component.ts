import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'pv-input',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit, OnChanges {

  @Input() protected control: FormControl = undefined;
  @Input() protected label: string = 'Label';
  @Input() protected id: string = undefined;
  @Input() protected placeholder: string = undefined;
  @Input() protected showRequired: boolean = true;

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
