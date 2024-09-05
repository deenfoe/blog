import * as yup from 'yup'

export const signInSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(40, 'Password must be at most 40 characters')
    .matches(/\S/, 'Password cannot be empty or only spaces')
    .required('Password is required'),
})

export const signUpSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .matches(/^[a-zA-Z0-9]+$/, 'Username can only contain Latin letters and numbers'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(40, 'Password must be at most 40 characters')
    .matches(/\S/, 'Password cannot be empty or only spaces')
    .required('Password is required'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Repeat Password is required'),
  agreeCheckbox: yup.boolean().oneOf([true], 'You must accept the terms'),
})

export const profileSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .matches(/^[a-zA-Z0-9]+$/, 'Username can only contain Latin letters and numbers'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .transform((value) => (value ? value : undefined))
    .min(6, 'Password must be at least 6 characters')
    .max(40, 'Password must be at most 40 characters')
    .matches(/\S/, 'Password cannot be empty or only spaces'),
  image: yup.string().url('Invalid URL'),
})
