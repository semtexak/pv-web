import {AbstractControl} from '@angular/forms';

export class IcoValidation {

  static IsValid(AC: AbstractControl) {
    const ico = AC.get('ico').value;

    if (!ico) {
      return null;
    }

    let a = 0;
    let c = 0;
    for (let i = 0; i < 7; i++) {
      a += ico[i] * (8 - i);
    }

    a = a % 11;
    if (a === 0) {
      c = 1;
    } else if (a === 1) {
      c = 0;
    } else {
      c = 11 - a;
    }

    if (+ico[7] !== c) {
      AC.get('ico').setErrors({notValid: true});
    } else {
      return null;
    }
  }

}
