import {AbstractControl} from '@angular/forms';

export class MatchPasswordValidation {

  static MatchPassword(AC: AbstractControl) {
    const password = AC.get('password').value; // to get value in input tag
    const confirmPassword = AC.get('passwordConfirm').value; // to get value in input tag
    if (password !== confirmPassword) {
      AC.get('passwordConfirm').setErrors({matchPassword: true});
    } else {
      return null;
    }
  }
}
