import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'pv-social-media',
  templateUrl: './social-media.component.html'
})
export class SocialMediaComponent {

  @Input() type: string;
  @Input() linked = false;
  @Input() email: string;
  @Output('onStatusChange') onStatusChange = new EventEmitter<SocialLinkStatus>();

  constructor() { }

  changeStatus() {
    this.linked = !this.linked;
    this.onStatusChange.emit({
      status: this.linked,
      type: this.type
    });
  }
}

export interface SocialLinkStatus {
  status: boolean;
  type: string;
}
