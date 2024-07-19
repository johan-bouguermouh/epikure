import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

//Création d'un décorateur class-validator capable de s'assurer que la date récupérer est supeieur à la date du jour
export function IsFuturDate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    //On modifiy la valeur string en date

    registerDecorator({
      name: 'isFuturDate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return value > new Date();
        },
      },
    });
  };
}
