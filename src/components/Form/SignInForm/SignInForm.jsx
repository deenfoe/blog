import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { clearErrors, fetchSignIn, selectErrors, selectUser } from '../../../redux/slices/authFormSlice'
import { showErrorToast, showSuccessToast } from '../../../utils/toastify'
import { signInFormSchema } from '../../../validation/yupSchemas'
import InputField from '../../InputField/InputField'

import styles from './SignInForm.module.scss'

function SignInForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const errorsFromServer = useSelector(selectErrors)
  const user = useSelector(selectUser)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({ resolver: yupResolver(signInFormSchema), mode: 'onTouched' })

  const submitForm = async (data) => {
    const { email, password } = data
    try {
      const resultAction = await dispatch(fetchSignIn({ email, password }))
      if (fetchSignIn.fulfilled.match(resultAction)) {
        localStorage.setItem('user', JSON.stringify(resultAction.payload))
      }
    } catch (error) {
      showErrorToast('Ошибка при входе. Пожалуйста, попробуйте снова.')
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
        {/* <label className={styles.signInLabel}>
          Email адрес
          <input
            className={`${styles.signInInput} ${errors.email ? styles.inputError : ''}`}
            type="text"
            placeholder="Email адрес"
            onInput={handleEmailInput}
            {...register('email')}
          />
          <p className={styles.errorText}>{errors.email?.message}</p>
        </label> */}

        <InputField
          label="Email адрес"
          name="email"
          placeholder="Email адрес"
          register={register}
          onInput={handleEmailInput}
          errorMessage={errors.email?.message}
        />

        <InputField
          label="Пароль"
          name="password"
          type="password"
          placeholder="******"
          register={register}
          errorMessage={errors.password?.message}
        />

        {/* <label className={styles.signInLabel}>
          Пароль
          <input
            className={`${styles.signInInput} ${errors.password ? styles.inputError : ''}`}
            type="password"
            placeholder="******"
            {...register('password')}
          />
          <p className={styles.errorText}>{errors.password?.message}</p>
        </label> */}

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
