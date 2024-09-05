import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import styles from './ProfileForm.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearErrors,
  fetchUserUpdate,
  selectErrors,
  selectState,
  selectUser,
} from '../../../redux/slices/authFormSlice'
import { useNavigate } from 'react-router-dom'
import { showSuccessToast } from '../../../utils/toastify'
import { profileFormSchema } from '../../../validation/yupSchemas'

// const schema = yup.object().shape({
//   username: yup
//     .string()
//     .required('Имя пользователя обязательно')
//     .matches(/^[a-zA-Z0-9]+$/, 'мя пользователя может содержать только латинские буквы и цифры'),
//   email: yup.string().email('Неверный email').required('Email обязателен'),
//   password: yup
//     .string()
//     .transform((value) => (value ? value : undefined)) // Преобразует пустую строку в undefined
//     .notRequired() // Делаем поле не обязательным
//     .min(6, 'Пароль должен быть минимум 6 символов')
//     .max(40, 'Пароль должен быть максимум 40 символов')
//     .matches(/\S/, 'Пароль не может быть пустым или состоять только из пробелов')
//     // .required('Password is required')
//     .optional(),
//   image: yup
//     .string()
//     .url('неверный URL') // Проверка, что значение является корректным URL
//     .optional(), // Поле image не обязательно для заполнения (опционально)
// })

function ProfileForm() {
  const errorsFromServer = useSelector(selectErrors)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [updateError, setUpdateError] = useState(false)
  const user = useSelector(selectUser)
  console.log(user)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileFormSchema),
    mode: 'onTouched', // Включает валидацию в реальном времени
    defaultValues: {
      username: user?.username,
      email: user?.email,
      image: user?.image,
    },
  })

  const submitForm = async (userData) => {
    setUpdateError(false) // сбрасываем ошибку перед отправкой формы

    if (!userData.password) {
      delete userData.password
    }

    try {
      const resultAction = await dispatch(fetchUserUpdate(userData))
      if (fetchUserUpdate.fulfilled.match(resultAction)) {
        localStorage.setItem('user', JSON.stringify(resultAction.payload))
        // dispatch(clearErrors()) // Очищаем ошибки при успешном обновлении
        setFormSubmitted(true)
      } else {
        setUpdateError(true) // Устанавливаем ошибку если запрос не был успешным
      }
    } catch (error) {
      setUpdateError(true) // Устанавливаем ошибку в случае исключения
    }
  }

  useEffect(() => {
    if (formSubmitted && !updateError) {
      showSuccessToast('🦄 Вы успешно обновили данные!')
      dispatch(clearErrors())
      navigate('/')
    }
    // Очистка ошибок при размонтировании компонента
    // return () => {
    //   dispatch(clearErrors())
    // }
  }, [formSubmitted, updateError, navigate, dispatch])

  const handleEmailInput = (e) => {
    const lowerCaseEmail = e.target.value.toLowerCase()
    setValue('email', lowerCaseEmail, { shouldValidate: true }) // обновляем значение и запускаем валидацию
  }

  return (
    <div>
      <h2 className={styles.profileTitle}>Редактирование профиля</h2>

      <form className={styles.editProfileForm} onSubmit={handleSubmit(submitForm)}>
        <label className={styles.profileLabel}>
          Имя пользователя
          <input
            className={`${styles.profileInput} ${errors.username ? styles.inputError : ''}`}
            type="text"
            placeholder="Имя пользователя"
            {...register('username')}
          />
          <p className={styles.errorText}>{errors.username?.message}</p>
        </label>

        <label className={styles.profileLabel}>
          Email адрес
          <input
            className={`${styles.profileInput} ${errors.email ? styles.inputError : ''}`}
            type="text"
            placeholder="Email адрес"
            onInput={handleEmailInput}
            {...register('email')}
          />
          <p className={styles.errorText}>{errors.email?.message}</p>
        </label>
        <label className={styles.profileLabel}>
          Новый пароль
          <input
            className={`${styles.profileInput} ${errors.password ? styles.inputError : ''}`}
            type="password"
            placeholder="Новый пароль"
            {...register('password')}
          />
          <p className={styles.errorText}>{errors.password?.message}</p>
        </label>

        <label className={styles.profileLabel}>
          Изображение аватара (URL)
          <input
            className={`${styles.profileInput} ${errors.image ? styles.inputError : ''}`}
            placeholder="ссылка"
            {...register('image')}
          />
          <p className={styles.errorText}>{errors.image?.message}</p>
        </label>

        {errorsFromServer && (
          <>
            {errorsFromServer.email && <p className={styles.errorText}>Email {errorsFromServer.email}</p>}
            {errorsFromServer.username && <p className={styles.errorText}>Username {errorsFromServer.username}</p>}
          </>
        )}

        <button type="submit" className={`${styles.profileButton}`}>
          Сохранить
        </button>
      </form>
    </div>
  )
}

export default ProfileForm
