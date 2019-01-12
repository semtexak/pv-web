import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClientService} from '../../../../shared/service/client.service';
import {ApplicationService} from '../../../../shared/service/application.service';

@Component({
  selector: 'pv-application-registration',
  templateUrl: './application-registration.component.html'
})
export class ApplicationRegistrationComponent implements OnInit {

  form: FormGroup;
  appImg: string;
  file: File = null;

  constructor(private formBuilder: FormBuilder,
              private applicationService: ApplicationService) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      'appName': [null, Validators.compose([])],
      'appImg': [null, Validators.compose([])],
      'appImgStr': [null, Validators.compose([])],
      'domain': [null, Validators.compose([])],
      'agreement': [false, Validators.requiredTrue],
    });
  }

  onSelectFile(_event) { // called each time file input changes
    // if (_event.target.files && _event.target.files[0]) {
    //   const reader = new FileReader();
    //
    //   reader.readAsDataURL(_event.target.files[0]); // read file as data url
    //
    //   reader.onload = (_eventInner) => { // called once readAsDataURL is completed
    //     _eventInner = _eventInner as ProgressEvent;
    //     this.appImg = _eventInner.target['result'];
    //     this.form.controls['appImgStr'].setValue(reader.result.split(',')[1]);
    //     console.log(reader.result.split(',')[1]);
    //   };
    // }
    this.file = <File> _event.target.files[0];
    console.log(this.file);
  }

  removeImage() {
    this.appImg = null;
    this.form.controls['appImg'].setValue(null);
  }

  send(values) {
    console.log(values);
    if (this.form.valid) {
    }

    const formdata: FormData = new FormData();

    // formdata.append('name', values.appName);
    // formdata.append('domain', values.domain);
    formdata.append('file', this.file);

    console.log(formdata);

    values.test = this.file;
    this.applicationService.createApplication(formdata).subscribe(status => console.log(status));
  }
}
