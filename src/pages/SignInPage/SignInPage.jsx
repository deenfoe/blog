import React from 'react'

import SignInForm from '../../components/Form/SignInForm/SignInForm'
SignInFormStyled
import styles from './SignInPage.module.scss'
import SignInFormStyled from '../../components/Form/SignInFormStyled/SignInFormStyled'

function SignInPage() {
  return (
    <div className={styles.signInPage}>
      {/* <SignInForm /> */}
      <SignInFormStyled />
    </div>
  )
}

export default SignInPage
