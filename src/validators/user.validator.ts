import validator from 'validator';

export class UserValidator {
  static validate(body, toValidate: string[]) {
    const errors: string[] = [];

    if (toValidate.includes('name') && validator.isEmpty(body.name)) {
      errors.push('Ім\'я не може бути пустим');
    }

    if (toValidate.includes('email') && !validator.isEmail(body.email)) {
      errors.push('Неправильний формат імейлу');
    }

    if (toValidate.includes('role') && validator.isEmpty(body.role)) {
      errors.push('Не вибрана роль користувача');
    }

    if (
      toValidate.includes('password') &&
      validator.isEmpty(body.password)
    ) {
      errors.push('Пароль не може бути пустим');
    }

    return errors;
  }
}
