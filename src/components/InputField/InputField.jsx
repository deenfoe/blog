import styles from './InputField.module.scss'

function InputField({
  label, // Метка для поля ввода
  type = 'text', // Тип поля ввода
  name, // Имя поля для регистрации
  placeholder, // Текст для placeholder
  register, // Метод register из react-hook-form
  errorMessage, // Сообщение об ошибке для этого поля
  onInput, // Обработчик ввода (например, для преобразования текста в нижний регистр)
  ...rest // Остальные пропсы для инпута
}) {
  return (
    <div className={styles.inputField}>
      <label className={styles.label}>
        {label}
        <input
          className={`${styles.input} ${errorMessage ? styles.inputError : ''}`}
          type={type}
          name={name}
          placeholder={placeholder}
          {...register(name)}
          onInput={onInput}
          {...rest}
        />
      </label>
      {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
    </div>
  )
}

export default InputField
