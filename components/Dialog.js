import styles from '../styles/Dialog.module.css';
import Image from 'next/image';
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { dialogShow } from '../reducers/dialogValue';


function Dialog() {
    const dispatch = useDispatch();
    const dialogValue= useSelector((state) => state.dialogValue.value);


  return (
    <div className={styles.background}>
    <div className={styles.container}>
        <span>you must sign-in for bookmark</span>
        <div className={styles.button} onClick={() =>dispatch(dialogShow(false))}>OK</div>
    </div>
    </div>
  )
}

export default Dialog