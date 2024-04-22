import * as yup from 'yup';

function checkDayMonth(value: string, day: string, year: string) {
  if (value && day && year) {
    const theDay = Number(day);
    const theMonth = Number(value) - 1;
    const theYear = Number(year);
    const date = new Date(theYear, theMonth, theDay);
    return (
      date.getFullYear() === theYear &&
      date.getMonth() === theMonth &&
      date.getDate() === theDay
    );
  }
  return true;
}

function isPastDate(year: string, day: string, month: string): boolean {
  if (year && day && month) {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const theDay = Number(day);
    const theMonth = Number(month) - 1;
    const theYear = Number(year);
    const testDate = new Date(theYear, theMonth, theDay);

    return testDate < currentDate;
  }
  return true;
}

export const ageSchema = yup.object({
  birthDay: yup
    .string()
    .required('This field is required.')
    .matches(/^[0-9]+$/, 'Wrong format, Numbers only')
    .test('is-valid-day', 'Must be a valid day', function (value) {
      if (value !== undefined) {
        return Number(value) > 0 && Number(value) <= 31;
      }
      return true;
    }),
  birthMonth: yup
    .string()
    .required('This field is required.')
    .matches(/^[0-9]+$/, 'Wrong format, Numbers only')
    .test('is-valid-month', 'Must be a valid month', function (value) {
      if (value !== undefined) {
        return Number(value) > 0 && Number(value) <= 12;
      }
      return true;
    })
    .test('is-valid-date', 'Invalid date', function (value) {
      if (value !== undefined) {
        return checkDayMonth(
          value,
          this.parent.birthDay,
          this.parent.birthYear
        );
      }
      return true;
    }),
  birthYear: yup
    .string()
    .required('This field is required.')
    .matches(/^[0-9]+$/, 'Wrong format, Numbers only')
    .test('is-valid-year', 'Must be in the past', function (value) {
      if (value !== undefined) {
        const currentYear = new Date().getFullYear();
        return Number(value) <= currentYear;
      }
      return true;
    })
    .test('is-date-passed', 'Must be in the past', function (value) {
      return isPastDate(value, this.parent.birthDay, this.parent.birthMonth);
    }),
});
