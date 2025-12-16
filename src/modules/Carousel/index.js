import React, { useEffect, useState, useRef } from 'react'
import styles from './styles.module.scss'
import BasicCard from '../../components/BasicCard'
import { useWindowResize } from '../../hooks/useWindowResize'
import arrow from '../../assets/arrow.svg'

export default ({ elements, data, line }) => {
  const distributorData = elements
  const count = distributorData?.length

  const ref = useRef()

  const windowWidth = useWindowResize()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [jump, setJump] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [animation, setAnimation] = useState(true)

  function handleTouchEnd() {
    if (touchStart - touchEnd > 75) {
      currentSlide < count && setCurrentSlide(currentSlide + 1)
    }

    if (touchStart - touchEnd < -75) {
      currentSlide > -1 && setCurrentSlide(currentSlide - 1)
    }
  }

  if (jump) {
    setTimeout(() => {
      setJump(false)
    }, 1)
  }

  const elementsForRender =
    distributorData?.length > 1
      ? [].concat(distributorData, distributorData, distributorData)
      : distributorData

  const onTransitionEnd = () => {
    if (currentSlide >= count) {
      setCurrentSlide(0)
      setJump(true)
    }

    if (currentSlide <= -1) {
      setCurrentSlide(count - 1)
      setJump(true)
    }
  }

  useEffect(() => {
    const interval = animation
      ? setInterval(() => {
          currentSlide < count && setCurrentSlide(currentSlide + 1)
        }, 4000)
      : null

    ref?.current?.addEventListener('transitionend', onTransitionEnd)

    return () => {
      clearInterval(interval)
      ref?.current?.removeEventListener('transitionend', onTransitionEnd)
    }
  }, [currentSlide, animation])

  const viewportWidth =
    windowWidth < 768
      ? 330
      : windowWidth < 1024
      ? 648
      : windowWidth < 1200
      ? 840
      : 790

  return (
    <div className={styles.outerContainer}>
      <div className={styles.controls}>
        {distributorData?.length > 1 &&
          distributorData.map((el, idx) => {
            return (
              <div
                className={styles.controlElement}
                key={idx}
                style={{
                  background:
                    currentSlide === idx ? 'var(--ui05)' : 'transparent',
                }}
                onClick={() => setCurrentSlide(idx)}
              />
            )
          })}
      </div>
      <div
        className={styles.innerContainter}
        style={{
          '--viewportWidth': `${viewportWidth}px`,
        }}
      >
        {distributorData?.length > 1 && (
          <>
            <div
              className={`${styles.controlButton} ${styles.buttonLeft}`}
              onClick={() =>
                currentSlide > -1 && setCurrentSlide(currentSlide - 1)
              }
            >
              <img src={arrow} alt="arrow-left" />
            </div>
            <div
              className={`${styles.controlButton} ${styles.buttonRight}`}
              onClick={() =>
                currentSlide < count && setCurrentSlide(currentSlide + 1)
              }
            >
              <img src={arrow} alt="arrow-right" />
            </div>
          </>
        )}
        <div
          className={styles.viewport}
          style={{ '--viewportWidth': `${viewportWidth}px` }}
          onTouchStart={(e) => setTouchStart(e.targetTouches[0].clientX)}
          onTouchMove={(e) => setTouchEnd(e.targetTouches[0].clientX)}
          onTouchEnd={handleTouchEnd}
        >
          <div
            style={
              distributorData?.length > 1
                ? {
                    display: 'flex',
                    transition: jump ? 'none' : 'all 500ms ease',
                    transform: `translateX(-${
                      (count + currentSlide) * viewportWidth
                    }px)`,
                  }
                : {
                    display: 'flex',
                  }
            }
            ref={ref}
          >
            {elementsForRender?.map((element, idx) => {
              return (
                <div
                  key={idx}
                  style={{
                    width: `${viewportWidth}px`,
                    padding: '0 20px',
                  }}
                  onMouseEnter={() => setAnimation(false)}
                  onMouseLeave={() => setAnimation(true)}
                >
                  <BasicCard {...element?.content} key={idx} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
