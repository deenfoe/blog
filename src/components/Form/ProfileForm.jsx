import React from 'react'
import styles from './ProfileForm.module.scss'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


function ProfileForm() {
   return (
    <div>
      <h2 className={styles.profileTitle}>Edit Profile</h2>
      <form className={styles.editProfileForm} >
        <label className={styles.profileLabel}>
          Username
          <input className={styles.profileInput} type="text" placeholder="Username" />
        </label>
        <label className={styles.profileLabel}>
          Email address
          <input className={styles.profileInput} type="text" placeholder="Email address" />
        </label>
        <label className={styles.profileLabel}>
          New password
          <input className={styles.profileInput} type="password" placeholder="New password" />
        </label>

        <label className={styles.profileLabel}>
          Avatar image(url)
          <input
            className={styles.profileInput}
                   
            placeholder="Avatar image"
          />
        </label>

        <button type="submit" className={styles.profileButton}>
          Save
        </button>
      </form>
    </div>
  )
}

export default ProfileForm
