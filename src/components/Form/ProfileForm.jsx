import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import styles from './ProfileForm.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, fetchUserUpdate, selectErrors, selectState, selectUser } from '../../redux/slices/authFormSlice'
import { useNavigate } from 'react-router-dom'

const schema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .matches(/^[a-zA-Z0-9]+$/, 'Username can only contain Latin letters and numbers'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .transform((value) => (value ? value : undefined)) // Преобразует пустую строку в undefined
    .notRequired() // Делаем поле не обязательным
    .min(6, 'Password must be at least 6 characters')
    .max(40, 'Password must be at most 40 characters')
    .matches(/\S/, 'Password cannot be empty or only spaces')
    // .required('Password is required')
    .optional(),
  image: yup
    .string()
    .url('Invalid URL') // Проверка, что значение является корректным URL
    .optional(), // Поле image не обязательно для заполнения (опционально)
})

function ProfileForm() {
  const errorsFromServer = useSelector(selectErrors)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [updateError, setUpdateError] = useState(false)
  const user = useSelector(selectUser)
  console.log(user)
  // const { user } = useSelector(selectState)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched', // Включает валидацию в реальном времени
    defaultValues: {
      username: user?.username,
      email: user?.email,
      image: user?.image,
    },
  })

  // const submitForm = (userData) => {
  //   dispatch(fetchUserUpdate(userData)).then(() => {
  //     setFormSubmitted(true)
  //   })
  // }

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

  // useEffect(() => {
  //   if (formSubmitted && user) {
  //     navigate('/')
  //   }
  // }, [formSubmitted, user, navigate])

  useEffect(() => {
    if (formSubmitted && !updateError) {
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
      <h2 className={styles.profileTitle}>Edit Profile</h2>

      <form className={styles.editProfileForm} onSubmit={handleSubmit(submitForm)}>
        <label className={styles.profileLabel}>
          Username
          <input
            className={`${styles.profileInput} ${errors.username ? styles.inputError : ''}`}
            type="text"
            placeholder="Username"
            {...register('username')}
          />
          <p className={styles.errorText}>{errors.username?.message}</p>
        </label>

        <label className={styles.profileLabel}>
          Email address
          <input
            className={`${styles.profileInput} ${errors.email ? styles.inputError : ''}`}
            type="text"
            placeholder="Email address"
            onInput={handleEmailInput}
            {...register('email')}
          />
          <p className={styles.errorText}>{errors.email?.message}</p>
        </label>
        <label className={styles.profileLabel}>
          New password
          <input
            className={`${styles.profileInput} ${errors.password ? styles.inputError : ''}`}
            type="password"
            placeholder="New password"
            {...register('password')}
          />
          <p className={styles.errorText}>{errors.password?.message}</p>
        </label>

        <label className={styles.profileLabel}>
          Avatar image(url)
          <input
            className={`${styles.profileInput} ${errors.image ? styles.inputError : ''}`}
            placeholder="Avatar image"
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
          Save
        </button>
      </form>
    </div>
  )
}

export default ProfileForm
