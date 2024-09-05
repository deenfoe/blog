import React from 'react'
import SignInForm from '../../components/Form/SignInForm'
import styles from './SignInPage.module.scss'
import AuthForm from '../../components/Form/AuthForm/AuthForm'

function SignInPage() {
  return (
    <div className={styles.signInPage}>
      {/* <AuthForm mode="signIn" /> */}
      <SignInForm />
    </div>
  )
}

export default SignInPage
