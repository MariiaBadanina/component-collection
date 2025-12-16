import React, { useEffect, useRef, useState } from 'react'
import arrow from '../../assets/arrow_down.svg'
import { useWindowResize } from '../../hooks/useWindowResize'
import styles from './styles.module.scss'

export default ({ title, description }) => {
  const [open, setOpen] = useState(0)
  const [contentHeight, setContentHeight] = useState(null)
  const contentRef = useRef(null)
  const windowWidth = useWindowResize()

  useEffect(() => {
    setContentHeight(contentRef?.current?.clientHeight)
  }, [windowWidth])

  return (
    <div className={styles.container}>
      <div onClick={() => setOpen(!open)} className={styles.titleContainer}>
        <div className={styles.titleText}>
          {title && <p className="heading-xs">{title}</p>}
        </div>
        <div style={{ paddingTop: '5px' }}>
          <img
            src={arrow}
            alt="arrow"
            style={{
              transform: open ? 'rotate(-180deg)' : 'rotate(0deg)',
              transition: '.3s ease',
              width: '15px',
              display: 'block',
            }}
          />
        </div>
      </div>
      <div
        className={open ? styles.textBox : ''}
        style={{
          height: open ? `${contentHeight}px` : 0,
          overflow: 'hidden',
          transition: `0.7s ease`,
        }}
      >
        <div
          ref={contentRef}
          className={`${styles.contentContainer} body-default`}
        >
          {description}
        </div>
      </div>
    </div>
  )
}
