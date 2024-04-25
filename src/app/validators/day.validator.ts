import { AbstractControl, ValidationErrors } from "@angular/forms";

export function isDay (control: AbstractControl): ValidationErrors | null {
	const day = Number(control.value);
	return (day > 31 || day < 1) ? {isDay: true} : null
}