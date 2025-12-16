import * as React from "react";
import styles from "./styles.module.scss";
import MaxWidth from "../../components/MaxWidth";
import AccordionElement from "../../components/AccordionElement";

export default function AccordionCollection(props) {
  const { title, subtitle, detail, elements } = props;
  return (
    <div className={styles.container}>
      <MaxWidth extraClass={styles.maxWidth}>
        <div className={`${styles.accordionBox}`}>
          {elements?.map((item, idx) => (
            <AccordionElement {...item} key={idx} />
          ))}
        </div>

        <div className={styles.content}>
          {title && (
            <div className={`${styles.title} heading-xl`}> {title}</div>
          )}
          {subtitle && (
            <div className={`${styles.subtitle} heading-m`}>{subtitle}</div>
          )}
          {detail && (
            <div className={`${styles.detail} body-default`}>{detail}</div>
          )}
        </div>
      </MaxWidth>
    </div>
  );
}
