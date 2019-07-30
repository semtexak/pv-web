import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClientService} from '../../../../shared/service/client.service';
import {ApplicationService} from '../../../../shared/service/application.service';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {AlertService} from '../../../../shared/service/alert.service';

@Component({
  selector: 'pv-application-registration',
  templateUrl: './application-registration.component.html'
})
export class ApplicationRegistrationComponent implements OnInit {

  form: FormGroup;
  appImg: string;
  file: File = null;

  constructor(private formBuilder: FormBuilder,
              private alertService: AlertService,
              private applicationService: ApplicationService,
              private router: Router) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      'name': [null, Validators.compose([Validators.required])],
      'appImg': [null, Validators.compose([Validators.required])],
      'appImgStr': [null, Validators.compose([])],
      'domain': [null, Validators.compose([Validators.required])],
      'agreement': [false, Validators.requiredTrue],
    });
  }

  onSelectFile(_event) { // called each time file input changes
    if (_event.target.files && _event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(_event.target.files[0]); // read file as data url
      reader.onload = (_eventInner) => { // called once readAsDataURL is completed
        _eventInner = _eventInner as ProgressEvent;
        this.appImg = _eventInner.target['result'];
        this.form.controls['appImgStr'].setValue((reader.result as string).split(',')[1]);
      };
    }
    this.file = <File> _event.target.files[0];
  }

  removeImage() {
    this.appImg = null;
    this.form.controls['appImg'].setValue(null);
  }

  onSubmit(values) {
    console.log(values);
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key).markAsDirty();
      });
    } else {

      const formdata: FormData = new FormData();

      formdata.append('file', this.file);
      formdata.append('name', values.name);
      formdata.append('domain', values.domain);

      console.log(formdata);

      values.test = this.file;
      this.applicationService.createApplication(formdata).subscribe((response: HttpResponse<any>) => {
        console.log(response);
        console.log(response.headers.keys());
        let location = response.headers.get('Location');
        console.log(location);
        if (location) {
          const appId = location.split('/').pop();
          this.router.navigate([`/klient/stranka/${appId}/nastaveni`]).then(() => this.alertService.success('Registrace nové stránky proběhla úspěšně. Nastavte si požadované služby a začněte vydělávat.</>'));
        }
      });
    }
  }
}
