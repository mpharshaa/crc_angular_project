import { AbstractControl } from '@angular/forms';

export function stringValidator(control: AbstractControl): { [key: string]: any } | null {
  const valid = /^[a-zA-Z]+$/.test(control.value);
  return valid ? null : { invalidString: { valid: false, value: control.value } };
}