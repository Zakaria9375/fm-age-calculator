import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormBuilder,
} from '@angular/forms';
import { Age } from 'src/models/age.interface';
import { ageSchema } from 'src/utils/schemaYup';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ageForm: FormGroup;
  age: Age = {
    days: '- -',
    months: '- -',
    years: '- -',
  };
  constructor(private ageForm: FormBuilder) {}
  yupValidator(control: FormControl) {
  try {
    ageSchema.validateSync(control.value);
    return null;
  } catch (error) {
    return { yupError: error.errors };
  }
}

  ngOnInit(): void {
    this.ageForm = new FormGroup({
      birthDay: new FormControl(null, [this.yupValidator]),
      birthMonth: new FormControl(null, [this.yupValidator]),
      birthYear: new FormControl(null, [this.yupValidator]),
    });
  }
  getErrors(controlName: string): string[] {
    const controlErrors = this.ageForm.get(controlName)?.errors;
    if (!controlErrors) {
      return [];
    }

    return Object.keys(controlErrors)
      .map(
        (key) =>
          this.errorMessages[controlName][key as keyof FormControlError] ||
          'An unknown error occurred'
      )
      .filter((message) => message !== undefined);
  }

  onSubmit() {
    console.log(this.ageForm);
  }
}
