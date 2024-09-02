import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import styles from './SignInForm.module.scss'
import { clearErrors, fetchSignIn, selectErrors, selectState, selectUser } from '../../redux/slices/authFormSlice'
import { useEffect } from 'react'

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
  const errorsFromServer = useSelector(selectErrors)
  // console.log(errorsFromServer)

  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  // const { user } = useSelector(selectState)

  const navigate = useNavigate()
  // console.log(test)
  console.log(localStorage.getItem('user'))
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(schema), mode: 'onTouched' })

  const submitForm = async (data) => {
    const { email, password } = data
    console.log(data)
    try {
      const resultAction = await dispatch(fetchSignIn({ email, password }))
      if (fetchSignIn.fulfilled.match(resultAction)) {
        localStorage.setItem('user', JSON.stringify(resultAction.payload))
      }
    } catch (error) {
      console.error('Error during sign in:', error)
    }
  }

  useEffect(() => {
    if (user) {
      navigate('/')
      dispatch(clearErrors())
    }
  }, [user, navigate, dispatch])

  const handleEmailInput = (e) => {
    const lowerCaseEmail = e.target.value.toLowerCase()
    setValue('email', lowerCaseEmail, { shouldValidate: true }) // обновляем значение и запускаем валидацию
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
            onInput={handleEmailInput}
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

        {errorsFromServer && (
          <p className={styles.errorText}> Email or password {errorsFromServer['email or password']}</p>
        )}

        <button className={styles.signInButton} type="submit" disabled={!isValid}>
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
