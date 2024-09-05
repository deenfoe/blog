import React from 'react'
import ProfileForm from '../../components/Form/ProfileForm/ProfileForm'
import styles from './ProfilePage.module.scss'

function ProfilePage() {
  return (
    <div className={styles.ProfilePage}>
      <ProfileForm />
    </div>
  )
}

export default ProfilePage
