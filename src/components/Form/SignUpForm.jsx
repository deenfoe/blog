import React from 'react'
import { NavLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import styles from './SignUpForm.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSignUp, selectState } from '../../redux/slices/authFormSlice'

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 3 characters')
    .max(40, 'Password must be at most 20 characters')
    .matches(/\S/, 'Password cannot be empty or only spaces')
    .required('Password is required'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Repeat Password is required'),
  agreeCheckbox: yup.boolean().oneOf([true], 'You must accept the terms'),
})

function SignUpForm() {
  // const test = useSelector(selectState)
  // console.log(test)
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched', // Включает валидацию в реальном времени
  })

  const submitForm = (data) => {
    const { username, email, password } = data
    // console.log(data)
    console.log({ username, email, password })
    dispatch(fetchSignUp({ username, email, password }))
  }

  return (
    <div>
      <h2 className={styles.signUpTitle}>Create new account</h2>
      <form className={styles.signUpForm} onSubmit={handleSubmit(submitForm)}>
        <label className={styles.signUpLabel}>
          Username
          <input
            className={`${styles.signUpInput} ${errors.username ? styles.inputError : ''}`}
            name="username"
            placeholder="Username"
            {...register('username')}
          />
          <p className={styles.errorText}>{errors.username?.message}</p>
        </label>

        <label className={styles.signUpLabel}>
          Email address
          <input
            className={`${styles.signUpInput} ${errors.email ? styles.inputError : ''}`}
            name="email"
            placeholder="Email address"
            {...register('email')}
          />
          <p className={styles.errorText}>{errors.email?.message}</p>
        </label>

        <label className={styles.signUpLabel}>
          Password
          <input
            className={`${styles.signUpInput} ${errors.password ? styles.inputError : ''}`}
            name="password"
            placeholder="Password"
            {...register('password')}
          />
          <p className={styles.errorText}>{errors.password?.message}</p>
        </label>

        <label className={styles.signUpLabel}>
          Repeat Password
          <input
            className={`${styles.signUpInput} ${errors.repeatPassword ? styles.inputError : ''}`}
            name="repeatPassword"
            placeholder="Repeat Password"
            {...register('repeatPassword')}
          />
          <p className={styles.errorText}>{errors.repeatPassword?.message}</p>
        </label>

        <div className={styles.signUpLine}></div>

        <label className={styles.signUpLabelCheckbox}>
          <input
            type="checkbox"
            name="agreeCheckbox"
            className={styles.signUpInputCheckbox}
            {...register('agreeCheckbox')}
          />
          I agree to the processing of my personal information
        </label>
        <p className={styles.errorText}>{errors.agreeCheckbox?.message}</p>

        <button
          className={`${styles.signUpButton} ${!isValid ? styles.signUpButtonDisabled : ''}`}
          type="submit"
          disabled={!isValid}
        >
          Create
        </button>

        <div className={styles.signInInfo}>
          Already have an account?{' '}
          <NavLink to="/sign-in" className={styles.navLink}>
            Sign In.
          </NavLink>
        </div>
      </form>
    </div>
  )
}

export default SignUpForm
