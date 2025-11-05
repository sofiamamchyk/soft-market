import validator from 'validator';

export class ProductValidator {
  static imageWhiteList: string[] = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp',
  ];

  static validate(body, file: Express.Multer.File, toValidate: string[]) {
    const errors: string[] = [];

    if (toValidate.includes('name') && validator.isEmpty(body.name)) {
      errors.push('Назва не може бути пустою');
    }

    if (toValidate.includes('description'))
    {
      if (validator.isEmpty(body.description)) {
        errors.push('Опис не може бути пустим');
      }

      if (body.description.length > 1000) {
        errors.push('Опис не може перевищувати 1000 символів');
      }
    }

    if (toValidate.includes('price')) {
      body.price  = body.price.replace(',', '.');
      if (!validator.isDecimal(body.price, { decimal_digits: '1,2' })) {
        errors.push('Ціна повинна бути в форматі 0.00');
      }
    }

    if (toValidate.includes('imageCreate')) {
      if (file === undefined) {
        errors.push('Відсутнє зображення');
      } else if (!ProductValidator.imageWhiteList.includes(file.mimetype)) {
        errors.push('Неправильний формат зображення');
      }
    }

    if (toValidate.includes('imageUpdate')) {
      if (
        file !== undefined &&
        !ProductValidator.imageWhiteList.includes(file.mimetype)
      ) {
        errors.push('Неправильний формат зображення');
      }
    }

    return errors;
  }
}
