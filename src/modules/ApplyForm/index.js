import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/Button/index.js";
import ConfirmationMessage from "../../components/ConfirmationMessage/index.js";
import MaxWidth from "../../components/MaxWidth/index.js";
import { useWindowResize } from "../../hooks/useWindowResize.js";
import FirstStep from "./FirstStep/index.js";
import SecondStep from "./SecondStep/index.js";
import styles from "./styles.module.scss";

export default (props) => {
  const { title, subtitle, detail, stepOneButton, stepTwoButton } = props;

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
    reset,
  } = useForm({
    mode: "onChange",
  });
  const [sent, setSent] = useState(false);

  const [firstStep, setFirstStep] = useState(true);
  const [firstStepHeight, setFirstStepHeight] = useState(null);
  const [secondStepHeight, setSecondStepHeight] = useState(null);
  const [formHeight, setFormHeight] = useState(null);
  const [disabledOne, setDisabledOne] = useState(true);

  // Province select or text input
  const [countryValue, setCountryValue] = useState(null);
  const [provinceSelect, setProvinceSelect] = useState(true);

  const windowWidth = useWindowResize();
  const firstStepRef = useRef(null);
  const secondStepRef = useRef(null);

  const firstStepList = [
    "name",
    "email",
    "countryISO",
    "phone",
    "prefix",
    "age",
    "study_level",
    ...(provinceSelect === true ? ["provinceISO"] : ["province"]),
  ];

  useEffect(() => {
    setFirstStepHeight(firstStepRef?.current?.clientHeight);
    setSecondStepHeight(secondStepRef?.current?.clientHeight);
    setFormHeight(firstStep ? firstStepHeight : secondStepHeight);
    setDisabledOne(
      watch().name &&
        watch().email &&
        watch().countryISO &&
        (provinceSelect ? watch().provinceISO : watch().province) &&
        watch().phone &&
        watch().age &&
        watch().study_level &&
        Object.keys(errors).filter((element) => firstStepList.includes(element))
          .length === 0
        ? false
        : true
    );
    setProvinceSelect(countryValue === "ES" || countryValue === "FR");
  }, [windowWidth, firstStep, watch(), errors, countryValue]);

  const onSubmit = (data) => {
    setSent(true);
    alert(JSON.stringify(data));
  };

  return (
    <div className={styles.container}>
      <div className={styles.backgroundImage}></div>
      <div className={styles.progressBarContainer}>
        <div className={styles.progressBar}></div>
        <div className={styles.progressBarButtonWrapper}>
          <div
            className={`${styles.progressBarButton} m-caption-button`}
            onClick={() => setFirstStep(true)}
            style={{
              "--bg": firstStep ? "var(--ui05)" : "var(--ui01)",
              "--color": firstStep ? "var(--textInverse)" : "var(--textLight)",
            }}
          >
            1
          </div>
          <div
            className={`${styles.progressBarButton} m-caption-button`}
            onClick={() => setFirstStep(disabledOne)}
            style={{
              "--bg": firstStep ? "var(--ui01)" : "var(--ui05)",
              "--color": firstStep ? "var(--textLight)" : "var(--textInverse)",
              cursor: disabledOne ? "not-allowed" : "pointer",
            }}
          >
            2
          </div>
        </div>
      </div>
      <MaxWidth extraClass={styles.maxWidthContent}>
        <div className={styles.innerContent}>
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
        {sent ? (
          <AnimatePresence>
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ConfirmationMessage reset={reset} setSent={setSent} />
            </motion.div>
          </AnimatePresence>
        ) : (
          <form
            className={styles.innerContent}
            onSubmit={handleSubmit(onSubmit)}
            style={{
              height: `${formHeight}px`,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: firstStep ? "0" : "-100%",
                transition: "0.3s ease",
                opacity: firstStep ? 1 : 0,
              }}
              ref={firstStepRef}
            >
              <FirstStep
                register={register}
                error={errors}
                subtitle={subtitle}
                detail={detail}
                setValue={setValue}
                countryValue={countryValue}
                setCountryValue={setCountryValue}
                provinceSelect={provinceSelect}
              />
              <div
                className={styles.button}
                style={{ zIndex: firstStep ? 1 : -1 }}
              >
                {stepOneButton && disabledOne ? (
                  <Button
                    appearance="secondary"
                    onClick={async () => {
                      await trigger(firstStepList);
                    }}
                  >
                    {stepOneButton}
                  </Button>
                ) : (
                  <Button
                    appearance="secondary"
                    onClick={() => setFirstStep(false)}
                  >
                    {stepOneButton}
                  </Button>
                )}
              </div>
            </div>

            <div
              style={{
                position: "absolute",
                left: firstStep ? "100%" : "0",
                transition: "0.3s ease",
                opacity: firstStep ? 0 : 1,
              }}
              ref={secondStepRef}
            >
              <SecondStep register={register} error={errors} />
              <div
                className={styles.button}
                style={{ zIndex: firstStep ? -1 : 1 }}
              >
                {stepTwoButton && (
                  <Button appearance="secondary" type="submit" button={true}>
                    {stepTwoButton}
                  </Button>
                )}
              </div>
            </div>
          </form>
        )}
      </MaxWidth>
    </div>
  );
};
