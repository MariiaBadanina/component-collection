import React, { useState } from 'react'
import styles from './styles.module.scss'
import arrow from '../../assets/arrow_down.svg'
import { AnimatePresence, motion } from 'framer-motion'

export default ({ options, visibleSection, itemEls, scrollTo }) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(options?.[0])

  return (
    <div className={styles.container}>
      <div onClick={() => setOpen(!open)} className={styles.valueContainer}>
        <div className={styles.defaultValue}>
          {options?.[visibleSection] || value}
        </div>
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

      <AnimatePresence>
        {open && (
          <motion.ul
            className={styles.dropDownList}
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            transition={{ duration: 0.45 }}
            exit={{ height: 0 }}
          >
            {options?.map((option, idx) => {
              return (
                option && (
                  <li
                    key={idx}
                    className={styles.listItem}
                    onClick={() => {
                      setValue(option)
                      setOpen(false)
                      scrollTo && scrollTo(itemEls?.current?.[idx])
                    }}
                  >
                    {option}
                  </li>
                )
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
