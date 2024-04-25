import { AbstractControl, ValidationErrors } from "@angular/forms";
import { number } from "yup";

export function isMonth(control : AbstractControl): ValidationErrors | null {
	const month = Number(control.value);
	return  (month > 12 || month < 1) ? { isMonth: true } : null;
}