import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import styles from './SignInForm.module.scss'
import { clearErrors, fetchSignIn, selectErrors, selectState, selectUser } from '../../../redux/slices/authFormSlice'
import { useEffect } from 'react'
import { showSuccessToast } from '../../../utils/toastify'
import { signInFormSchema } from '../../../validation/yupSchemas'

// const schema = yup.object().shape({
//   email: yup.string().email('Неверный формат Email').required('Email обязателен'),
//   password: yup
//     .string()
//     .min(6, 'Пароль должен быть минимум 6 символов')
//     .max(40, 'Пароль должен быть максимум 40 символов')
//     .matches(/\S/, 'Пароль не может быть пустым и содержать пробелы')
//     .required('Password обязателен'),
// })

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
  } = useForm({ resolver: yupResolver(signInFormSchema), mode: 'onTouched' })

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
      showSuccessToast('🦄 Вы успешно вошли в систему!')

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
      <h2 className={styles.signInTitle}>Войти</h2>
      <form className={styles.signInForm} onSubmit={handleSubmit(submitForm)}>
        <label className={styles.signInLabel}>
          Email адрес
          <input
            className={`${styles.signInInput} ${errors.email ? styles.inputError : ''}`}
            type="text"
            placeholder="Email адрес"
            onInput={handleEmailInput}
            {...register('email')}
          />
          <p className={styles.errorText}>{errors.email?.message}</p>
        </label>

        <label className={styles.signInLabel}>
          Пароль
          <input
            className={`${styles.signInInput} ${errors.password ? styles.inputError : ''}`}
            type="password"
            placeholder="******"
            {...register('password')}
          />
          <p className={styles.errorText}>{errors.password?.message}</p>
        </label>

        {errorsFromServer && (
          <p className={styles.errorText}> Email or password {errorsFromServer['email or password']}</p>
        )}

        <button className={styles.signInButton} type="submit" disabled={!isValid}>
          Войти
        </button>

        <div className={styles.signUpInfo}>
          Нет аккаунта?{' '}
          <NavLink to="/sign-up" className={styles.navLink}>
            Зарегистрироваться.
          </NavLink>
        </div>
      </form>
    </div>
  )
}

export default SignInForm
