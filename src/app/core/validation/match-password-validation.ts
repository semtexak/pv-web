import {AbstractControl} from '@angular/forms';

export class MatchPasswordValidation {

  static match(firstControlName, secondControlName) {
    return (AC: AbstractControl) => {
      const firstControlValue = AC.get(firstControlName).value; // to get value in input tag
      const secondControlValue = AC.get(secondControlName).value; // to get value in input tag
      if (firstControlValue !== secondControlValue) {
        AC.get(secondControlName).setErrors({matchFields: true});
      } else {
        return null;
      }
    };
  }

  static different(firstControlName, secondControlName) {
    return (AC: AbstractControl) => {
      const firstControlValue = AC.get(firstControlName).value; // to get value in input tag
      const secondControlValue = AC.get(secondControlName).value; // to get value in input tag
      if (firstControlValue === secondControlValue) {
        AC.get(secondControlName).setErrors({differentFields: true});
      } else {
        return null;
      }
    };
  }
}
