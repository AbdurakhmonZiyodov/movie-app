import * as yup from 'yup';

export const uzbekistanPhoneNumberMask = [
  '+',
  '9',
  '9',
  '8',
  '-', // Country code
  /\d/,
  /\d/,
  '-', // First two digits of the phone number
  /\d/,
  /\d/,
  /\d/,
  '-', // Next three digits of the phone number
  /\d/,
  /\d/,
  '-', // Next two digits of the phone number
  /\d/,
  /\d/, // Last two digits of the phone number
];

const phoneRegExp = /^\+998-[0-9]{2}-[0-9]{3}-[0-9]{2}-[0-9]{2}$/;
const msg = 'Telfon raqam kiritish majburiy';
export const phoneNumberSchema = yup
  .string()
  .matches(phoneRegExp, msg)
  .required(msg);
