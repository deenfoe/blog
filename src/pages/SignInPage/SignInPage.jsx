import React from 'react'

import SignInForm from '../../components/Form/SignInForm/SignInForm'

import styles from './SignInPage.module.scss'

function SignInPage() {
  return (
    <div className={styles.signInPage}>
      <SignInForm />
    </div>
  )
}

export default SignInPage
