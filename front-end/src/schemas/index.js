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

export const applicationSchema = yup.object({
  about: yup.string().max(1000, 'No more than 1000 symbols').required('About is required.'),
});

export const organizationSchema = yup.object({
  name: yup.string().required('Organization name is required'),
  address: yup.object({
    street: yup.string().required('Street is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    zip_code: yup
      .string()
      .required('Zip Code is required')
      .matches(/^[0-9]{5}$/, 'Zip Code must be exactly 5 digits'),
  }),
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits'),
  website: yup
    .string()
    .required('Website is required')
    .matches(/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/, 'Enter a valid URL'),
  service_ids: yup.array().of(yup.number()).min(1, 'Select at least one service').required('Services are required'),
  mission: yup.string().required('Mission statement is required').max(500),
  description: yup.string().required('Organization description is required').max(500),
});

export const volunteerSchema = yup.object().shape({
  first_name: yup.string().trim().required('First Name is required'),
  last_name: yup.string().trim().required('Last Name is required'),
  phone: yup
    .string()
    .matches(/^\+?\d{10,15}$/, 'Phone must be a valid number')
    .required('Phone is required'),
  about: yup.string().trim().required('About is required'),
  address: yup.object().shape({
    street: yup.string().trim().required('Street is required'),
    city: yup.string().trim().required('City is required'),
    state: yup.string().trim().required('State is required'),
    zip_code: yup.string().trim().required('Zip Code is required'),
  }),
});
