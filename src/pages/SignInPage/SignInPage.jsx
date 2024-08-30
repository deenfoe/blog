import React from 'react'
import SignInForm from '../../components/Form/SignInForm'
import styles from './SignInPage.module.scss'

function SingInPage() {
  return (
    <div className={styles.signInPage}>
      <SignInForm />
    </div>
  )
}

export default SingInPage
