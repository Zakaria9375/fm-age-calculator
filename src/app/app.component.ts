import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { isMonth } from './validators/month.validator';
import { Age } from './models/age.interface';
import { isDay } from './validators/day.validator';
import { isValidYear } from './validators/year.validator';
import { isValidDate } from './validators/date.validator';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  age: Age = {
    days: '- -',
    months: '- -',
    years: '- -',
  };

  birthDateForm = this.fb.group(
    {
      day: ['', [Validators.required, Validators.pattern(/^-?[0-9]+$/), isDay]],
      month: [
        '',
        [Validators.required, Validators.pattern(/^-?[0-9]+$/), isMonth],
      ],
      year: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern(/^-?[0-9]+$/),
          isValidYear,
        ],
      ],
    },
    {
      validators: [isValidDate],
    }
  );

  constructor(private fb: FormBuilder) {}
  get birthDay() {
    return this.birthDateForm.controls?.['day'];
  }
  get birthMonth() {
    return this.birthDateForm.controls?.['month'];
  }
  get birthYear() {
    return this.birthDateForm.controls?.['year'];
  }
  onSubmit() {
    if (this.birthDateForm.valid) {
      const year = Number(this.birthDateForm.controls?.['year'].value);
      const month = Number(this.birthDateForm.controls?.['month'].value) - 1;
      const day = Number(this.birthDateForm.controls?.['day'].value);
      this.calculateAge(year, month, day);
    } else {
      console.log('☢️ error occurred');
    }
  }
  calculateAge(year: number, month: number, day: number) {
    const now = new Date();
    let birthDate = new Date(year, month, day);
    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();

    if (days < 0) {
      const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += previousMonth.getDate();
      months--;
    }
    if (months < 0) {
      months += 12;
      years--;
    }
    this.age = {
      days: days,
      months: months,
      years: years,
    };
  }
  getAriaDescribedBy(field: string): string {
    let ids = [];
    const control = this.birthDateForm.get(field);
    if (control?.errors && control.touched) {
      if (control?.hasError('required')) {
        ids.push(`${field}Error1`);
      }
      if (control?.hasError('pattern')) {
        ids.push(`${field}Error2`);
      }
      if (
        control?.hasError('isDay') ||
        control?.hasError('isMonth') ||
        control?.hasError('isValidYear')
      ) {
        ids.push(`${field}Error3`);
      }
      if (control?.hasError('minlength')) {
        ids.push(`${field}Error4`);
      }
    }
    if (
      this.birthDateForm.errors?.['isValidDate'] &&
      this.birthDateForm.dirty
    ) {
      ids.push('generalError');
    }
    return ids.join(' ');
  }
}
