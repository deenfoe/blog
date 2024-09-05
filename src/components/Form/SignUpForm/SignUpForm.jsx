import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useDispatch, useSelector } from 'react-redux'
import { fetchSignUp, selectErrors, selectState, selectUser } from '../../../redux/slices/authFormSlice'

import styles from './SignUpForm.module.scss'
import { showSuccessToast } from '../../../utils/toastify'
import { signUpFormSchema } from '../../../validation/yupSchemas'

// const schema = yup.object().shape({
//   username: yup
//     .string()
//     .required('Имя пользователя обязательно')
//     .matches(/^[a-zA-Z0-9]+$/, 'Имя пользователя может содержать только латинские буквы и цифры'),
//   email: yup.string().email('Неверный email').required('Email обязателен'),
//   // .matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, 'Email must be in lowercase letters only'),
//   password: yup
//     .string()
//     .min(6, 'Пароль должен быть минимум 6 символов')
//     .max(40, 'Пароль должен быть максимум 40 символов')
//     .matches(/\S/, 'Пароль не может быть пустым или состоять только из пробелов')
//     .required('Пароль обязателен'),
//   repeatPassword: yup
//     .string()
//     .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
//     .required('Повтор пароля обязателен'),
//   agreeCheckbox: yup.boolean().oneOf([true], 'Вы должны согласиться с условиями'),
// })

function SignUpForm() {
  const errorsFromServer = useSelector(selectErrors)
  console.log(errorsFromServer)
  const user = useSelector(selectUser)
  // const { user } = useSelector(selectState)
  const navigate = useNavigate()
  // console.log(test)
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(signUpFormSchema),
    mode: 'onTouched', // Включает валидацию в реальном времени
  })

  const submitForm = (data) => {
    const { username, email, password } = data
    // console.log(data)
    console.log({ username, email, password })
    dispatch(fetchSignUp({ username, email, password }))
  }

  useEffect(() => {
    if (user) {
      showSuccessToast('🦄 Вы успешно создали  аккаунт!')

      navigate('/')
    }
  }, [user, navigate])

  const handleEmailInput = (e) => {
    const lowerCaseEmail = e.target.value.toLowerCase()
    setValue('email', lowerCaseEmail, { shouldValidate: true }) // обновляем значение и запускаем валидацию
  }

  return (
    <div>
      <h2 className={styles.signUpTitle}>Создать аккаунт</h2>
      <form className={styles.signUpForm} onSubmit={handleSubmit(submitForm)}>
        <label className={styles.signUpLabel}>
          Имя пользователя
          <input
            className={`${styles.signUpInput} ${errors.username ? styles.inputError : ''}`}
            name="username"
            type="text"
            placeholder="Имя пользователя"
            {...register('username')}
          />
          <p className={styles.errorText}>{errors.username?.message}</p>
        </label>

        <label className={styles.signUpLabel}>
          Email адрес
          <input
            className={`${styles.signUpInput} ${errors.email ? styles.inputError : ''}`}
            name="email"
            type="text"
            placeholder="Email адрес"
            onInput={handleEmailInput}
            {...register('email')}
          />
          <p className={styles.errorText}>{errors.email?.message}</p>
        </label>

        <label className={styles.signUpLabel}>
          Пароль
          <input
            className={`${styles.signUpInput} ${errors.password ? styles.inputError : ''}`}
            name="password"
            type="password"
            placeholder="******"
            {...register('password')}
          />
          <p className={styles.errorText}>{errors.password?.message}</p>
        </label>

        <label className={styles.signUpLabel}>
          Повтор пароля
          <input
            className={`${styles.signUpInput} ${errors.repeatPassword ? styles.inputError : ''}`}
            name="repeatPassword"
            type="password"
            placeholder="******"
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
          Я согласен на обработку моих персональных данных
        </label>
        <p className={styles.errorText}>{errors.agreeCheckbox?.message}</p>

        {errorsFromServer && (
          <>
            {errorsFromServer.email && <p className={styles.errorText}>Email {errorsFromServer.email}</p>}
            {errorsFromServer.username && <p className={styles.errorText}>Username {errorsFromServer.username}</p>}
          </>
        )}

        <button className={styles.signUpButton} type="submit" disabled={!isValid}>
          Создать
        </button>

        <div className={styles.signInInfo}>
          Уже есть аккаунт?{' '}
          <NavLink to="/sign-in" className={styles.navLink}>
            Войти.
          </NavLink>
        </div>
      </form>
    </div>
  )
}

export default SignUpForm
