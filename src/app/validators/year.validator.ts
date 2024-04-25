import { AbstractControl, ValidationErrors } from '@angular/forms';

export function isValidYear(control: AbstractControl): ValidationErrors | null {
  const year = Number(control.value);
	const currentYear = new Date().getFullYear();
  return year > currentYear ? { isValidYear: true } : null;
}
