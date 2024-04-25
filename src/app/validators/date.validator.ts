import { FormGroup, ValidationErrors } from '@angular/forms';

export function isValidDate(form: FormGroup): ValidationErrors | null {
  const theDay = Number(form.get('day')?.value);
  const theMonth = Number(form.get('month')?.value) - 1;
  const theYear = Number(form.get('year')?.value);
  if (!theDay || !theMonth || !theYear) return null;

  const date: Date = new Date(theYear, theMonth, theDay);
  const isRealDate: boolean =
    date.getFullYear() === theYear &&
    date.getMonth() === theMonth &&
    date.getDate() === theDay;
  return isRealDate ? null : { isValidDate: true };
}
