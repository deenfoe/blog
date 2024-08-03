import React from 'react'

import Header from '../Header/Header'
import MainContent from '../MainContent/MainContent'

import styles from './App.module.scss'

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <MainContent />
    </div>
  )
}

export default App
