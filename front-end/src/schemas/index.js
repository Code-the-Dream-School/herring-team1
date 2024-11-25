import * as yup from 'yup';

const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

export const loginSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Required'),
  password: yup.string().required('Required'),
});

export const registerSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(passwordRules, { message: 'Please create a stronger password' })
    .required('Required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match')
    .required('Required'),
  isOrganization: yup
    .boolean()
    .required('Please, choose organization or volunteer account')
    .typeError('Please, choose organization or volunteer account'),
});
