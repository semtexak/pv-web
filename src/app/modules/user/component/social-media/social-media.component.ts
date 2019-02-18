import {Component, Input} from '@angular/core';

@Component({
  selector: 'pv-social-media',
  templateUrl: './social-media.component.html'
})
export class SocialMediaComponent {

  @Input() type: string;
  @Input() linked = false;
  @Input() email: string;

  constructor() { }

}
