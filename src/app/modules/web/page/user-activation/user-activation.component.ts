import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'pv-user-activation',
  templateUrl: './user-activation.component.html'
})
export class UserActivationComponent implements OnInit {

  private activationKey: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['activationKey']) {
        this.activationKey = params['activationKey'];
      }
    });
  }

}
