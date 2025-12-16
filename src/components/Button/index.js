import React from 'react'
import styles from './styles.module.scss'

const ButtonInnerContent = ({
  onClick,
  children,
  buttonText,
  rel,
  href,
  linkToURL,
  newTab,
  appearance,
}) => {
  const style = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
  return (
    <>
      {href || linkToURL ? (
        <a
          href={href || linkToURL}
          rel={rel}
          target={newTab && '_blank'}
          style={style}
        >
          {buttonText || children}
          {appearance === 'link' ? (
            <div className={styles.icon}>&#8594;</div>
          ) : null}
        </a>
      ) : (
        <span onClick={onClick} style={style}>
          {buttonText || children}
          {appearance === 'link' ? (
            <div className={styles.icon}>&#8594;</div>
          ) : null}
        </span>
      )}
    </>
  )
}

const Button = ({
  href,
  linkToURL,
  newTab,
  noFollow,
  onClick,
  appearance,
  children,
  buttonText,
  disabled,
  marginLeft = 0,
  marginTop = 0,
  marginRight = 0,
  marginBottom = 0,
  extraClass = '',
  button,
}) => {
  const REL = `${newTab ? 'noreferrer' : ''} ${
    noFollow ? 'nofollow' : ''
  }`.trim()

  const buttonAppearance =
    appearance === 'primary01' || appearance === 'primary02'
      ? 's-caption-button'
      : 'common-button'

  const style = {
    '--marginLeft': marginLeft,
    '--marginTop': marginTop,
    '--marginRight': marginRight,
    '--marginBottom': marginBottom,
    '--justifyContent': appearance === 'link' ? 'space-between' : 'center',
  }

  return disabled || button ? (
    <button
      disabled={disabled ? true : false}
      className={`${styles[appearance]} ${styles.container} ${styles.button} ${buttonAppearance} ${extraClass}`}
      style={style}
    >
      <ButtonInnerContent
        onClick={onClick}
        children={children}
        buttonText={buttonText}
      />
      {appearance === 'link' ? (
        <div className={styles.iconDisabled}>&#8594;</div>
      ) : null}
    </button>
  ) : (
    <div
      className={`${styles[appearance]} ${styles.container} ${buttonAppearance} ${extraClass}`}
      style={style}
    >
      <ButtonInnerContent
        children={children}
        buttonText={buttonText}
        rel={REL}
        href={href}
        linkToURL={linkToURL}
        newTab={newTab}
        appearance={appearance}
        onClick={onClick}
      />
    </div>
  )
}

export default Button
