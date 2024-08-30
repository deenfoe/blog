import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import styles from './SignInForm.module.scss'

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 3 characters')
    .max(40, 'Password must be at most 20 characters')
    .matches(/\S/, 'Password cannot be empty or only spaces')
    .required('Password is required'),
})

function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(schema), mode: 'onTouched' })

  const submitForm = (data) => {
    console.log(data)
  }

  return (
    <div>
      <h2 className={styles.signInTitle}>Sign In</h2>

      <form className={styles.signInForm} onSubmit={handleSubmit(submitForm)}>
        <label className={styles.signInLabel}>
          Email address
          <input
            className={`${styles.signInInput} ${errors.email ? styles.inputError : ''}`}
            type="text"
            placeholder="Email address"
            {...register('email')}
          />
          <p className={styles.errorText}>{errors.email?.message}</p>
        </label>

        <label className={styles.signInLabel}>
          Password
          <input
            className={`${styles.signInInput} ${errors.password ? styles.inputError : ''}`}
            type="password"
            placeholder="Password"
            {...register('password')}
          />
          <p className={styles.errorText}>{errors.password?.message}</p>
        </label>

        <button
          className={`${styles.signInButton} ${!isValid ? styles.signInButtonDisabled : ''}`}
          type="submit"
          disabled={!isValid}
        >
          Login
        </button>

        <div className={styles.signUpInfo}>
          Don't have an account?{' '}
          <NavLink to="/sign-up" className={styles.navLink}>
            Sign Up.
          </NavLink>
        </div>
      </form>
    </div>
  )
}

export default SignInForm
