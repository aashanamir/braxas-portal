import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import styles from "./style.module.css"

const Attendence = () => {
  return (
    <div>
      <Navbar/>

      <div className={styles.flex}>
        <Sidebar/>
      </div>
    </div>
  )
}

export default Attendence