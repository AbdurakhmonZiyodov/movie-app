import * as yup from 'yup';

export const EMAIL_ERROR = 'Yaroqli elektron pochta manzilini kiriting!';

export const emailFieldSchema = yup
  .string()
  .required('Itlimos elektiron pochta manzilingizni kiriting!')
  .typeError(EMAIL_ERROR)
  .email(EMAIL_ERROR)
  .required(EMAIL_ERROR);

export const passwordFieldSchema = yup
  .string()
  .required('Iltimos parolni kritish')
  .min(6, "parolingiz min 6 ta belgidan iborat bo'lishi shart")
  .max(15, "parolingiz max 15 ta belgidan iborat bo'lishi shart");

export const nameFieldSchema = yup
  .string()
  .required('Isimingizni kiriting!')
  .min(3, "min 3 ta belgi bo'lishi shart")
  .max(20, "max 20 ta belgi bo'lishi shart")
  .matches(/^[a-zA-Z]/, 'Faqat ismingizni kiriting!');
