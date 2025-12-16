import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import DropDownComponent from "../../components/DropDownComponent";
import MaxWidth from "../../components/MaxWidth";
import styles from "./styles.module.scss";

export default (props) => {
  const { studyMenuOptions, title, itemEls, children } = props;
  const wrapperRef = useRef(null);
  const [headerLocation, setHeaderLocation] = useState(1);
  const [visibleSection, setVisibleSection] = useState(0);
  const getDimensions = (element) => {
    const { height } = element?.getBoundingClientRect();
    const offsetTop = element?.offsetTop;
    const offsetBottom = offsetTop + height;

    return {
      height,
      offsetTop,
      offsetBottom,
    };
  };

  // Scroll to an element on click
  const scrollTo = (selector) => {
    const { height: headerHeight } = getDimensions(wrapperRef?.current);
    const y = selector?.offsetTop - headerHeight;

    typeof window !== "undefined" &&
      window.scrollTo({ top: y + 1, behavior: "smooth" });
  };

  // Set active menu item on scroll
  const handleScroll = () => {
    const { height: headerHeight } = getDimensions(wrapperRef?.current);

    const scrollPosition =
      typeof window !== "undefined" && window.scrollY + headerHeight;

    const selected = itemEls?.current?.find((element) => {
      if (element) {
        const { offsetBottom, offsetTop } = getDimensions(element);
        return scrollPosition > offsetTop && scrollPosition < offsetBottom;
      }
    });

    if (selected && selected.id !== visibleSection) {
      setVisibleSection(selected.id);
    } else if (!selected && visibleSection) {
      setVisibleSection(undefined);
    }
  };
  const [windowWidth, setWindowWidth] = useState(0);

  const updateWindowWidth = () => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);

      window.onscroll = () =>
        setHeaderLocation(wrapperRef?.current?.getBoundingClientRect()?.top);

      window.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", updateWindowWidth);
    }

    return () => {
      typeof window !== "undefined" &&
        window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

  return (
    <div>
      <div ref={wrapperRef} className={styles.sticky}>
        <AnimatePresence>
          {headerLocation <= 0 && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: windowWidth > 1920 ? 110 : 75 }}
              exit={{ height: 0 }}
              transition={{ duration: 0.45 }}
              className={styles.motionDiv}
            >
              <MaxWidth extraClass={`${styles.maxWidth} heading-s`}>
                {title}
              </MaxWidth>
            </motion.div>
          )}
        </AnimatePresence>
        <div className={styles.dropDownContainer}>
          <MaxWidth extraClass={styles.maxWidth}>
            {studyMenuOptions?.map((item, idx) => {
              return (
                <div
                  key={idx}
                  style={{
                    display: windowWidth < 768 ? "none" : "block",
                    color:
                      visibleSection == idx
                        ? "var(--textAccent)"
                        : "var(--textRegular)",
                    transition: "0.1s",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    scrollTo(itemEls.current[idx]);
                  }}
                  className="m-caption-button"
                >
                  {item.label}
                </div>
              );
            })}
            {studyMenuOptions && (
              <div
                style={{
                  display: windowWidth < 768 ? "block" : "none",
                  width: "100%",
                }}
              >
                <DropDownComponent
                  options={studyMenuOptions?.map((item) => item.label)}
                  scrollTo={scrollTo}
                  itemEls={itemEls}
                  visibleSection={visibleSection}
                />
              </div>
            )}
          </MaxWidth>
        </div>
      </div>
      {children}
    </div>
  );
};
