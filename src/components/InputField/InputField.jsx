import styled from 'styled-components'

const InputFieldContainer = styled.div`
  margin-bottom: 12px;
`

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
`

const Input = styled.input`
  height: 40px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  box-sizing: border-box;
  padding: 8px 12px;
  transition: border-color 0.3s;
  font-family: 'Roboto';

  &:hover {
    border: 1px solid #484848;
  }

  &:focus {
    border: 1px solid #1890ff; /* Цвет рамки при фокусе */
    outline: none;
  }

  ${({ $hasError }) =>
    $hasError &&
    `
    border: 1px solid red;
  `}
`

const ErrorText = styled.p`
  margin: 0;
  padding: 0;
  color: red;
  font-size: 14px;
  line-height: 22px;
  font-weight: 400;
  font-family: 'Roboto';
`

function InputField({ label, type = 'text', name, placeholder, register, errorMessage, onInput, ...rest }) {
  return (
    <InputFieldContainer>
      <Label>
        {label}
        <Input
          type={type}
          name={name}
          placeholder={placeholder}
          {...register(name)}
          onInput={onInput}
          $hasError={!!errorMessage}
          {...rest}
        />
      </Label>
      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
    </InputFieldContainer>
  )
}

export default InputField

// import styles from './InputField.module.scss'

// function InputField({
//   label, // Метка для поля ввода
//   type = 'text', // Тип поля ввода
//   name, // Имя поля для регистрации
//   placeholder, // Текст для placeholder
//   register, // Метод register из react-hook-form
//   errorMessage, // Сообщение об ошибке для этого поля
//   onInput, // Обработчик ввода (например, для преобразования текста в нижний регистр)
//   ...rest // Остальные пропсы для инпута
// }) {
//   return (
//     <div className={styles.inputField}>
//       <label className={styles.label}>
//         {label}
//         <input
//           className={`${styles.input} ${errorMessage ? styles.inputError : ''}`}
//           type={type}
//           name={name}
//           placeholder={placeholder}
//           {...register(name)}
//           onInput={onInput}
//           {...rest}
//         />
//       </label>
//       {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
//     </div>
//   )
// }

// export default InputField
