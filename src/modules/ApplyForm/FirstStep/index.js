import React, { useEffect, useState } from "react";
import InputComponent from "../../../components/InputComponent";
import PhoneInputComponent from "../../../components/PhoneInputComponent";
import SelectComponent from "../../../components/SelectComponent";
import countriesList from "../../../constants/countriesList";
import prefixesList from "../../../constants/prefixesList";
import regionsList from "../../../constants/regionsList";
import styles from "./styles.module.scss";

const educationLevel = {
  ES_AD: [
    { label: "Completed Studies", code: 0 },
    { label: "Primary education", code: 1 },
    { label: "Secondary Education", code: 2 },
    { label: "Baccalaureate", code: 3 },
    { label: "Superior professional formation", code: 4 },
    { label: "Degree or Bachelor's degree", code: 5 },
    { label: "Other", code: 6 },
  ],
  INT: [
    { label: "Completed Studies", code: 0 },
    { label: "Primary education", code: 2 },
    { label: "Baccalaureate o Secondary Education", code: 3 },
    { label: "Technical or Technological Training", code: 4 },
    { label: "Undergraduate or Bachelor's Degree", code: 5 },
    { label: "Other", code: 6 },
  ],
};

export default (props) => {
  const {
    register,
    error,
    setValue,
    countryValue,
    setCountryValue,
    provinceSelect,
  } = props;

  const [educationValue, setEducationValue] = useState(null);
  const [regionValue, setRegionValue] = useState(null);

  const [regionsOptions, setRegionsOptions] = useState(null);
  const [educationLevelOptions, setEducationLevelOptions] = useState(null);
  const [prefixValue, setPrefixValue] = useState("+0");

  useEffect(() => {
    if (countryValue) {
      setRegionsOptions(
        regionsList.filter((reg) => reg.ISO.slice(0, 2) === countryValue)
      );
      const pr = prefixesList.filter((pref) => pref.ISO === countryValue);
      setPrefixValue(pr?.[0]?.value);
      setValue("prefix", prefixValue);

      if (countryValue === "ES" || countryValue === "AD") {
        setEducationLevelOptions(educationLevel.ES_AD);
      } else {
        setEducationLevelOptions(educationLevel.INT);
      }
    } else {
      setPrefixValue("+0");
      setRegionsOptions(null);
      setEducationLevelOptions(null);
    }
  }, [countryValue, prefixValue]);

  return (
    <div>
      <InputComponent
        labelText="Name *"
        name="name"
        type="text"
        register={register}
        error={error}
        required={{
          required: "This field is required",
          minlength: 1,
          maxlength: 128,
          pattern: {
            value: /^([a-zA-ZÀ-ÿẞ])+(([ ]([a-zA-ZÀ-ÿẞ])+)+)?$/,
            message: "Introduce a valid name",
          },
        }}
      />
      <InputComponent
        labelText="Email *"
        name="email"
        type="email"
        register={register}
        error={error}
        required={{
          required: "This field is required",
          pattern: {
            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$/,
            message: "Introduce a valid email",
          },
        }}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          columnGap: "14px",
        }}
      >
        <SelectComponent
          register={register}
          error={error}
          name="countryISO"
          required={true}
          defaultOptionLabel="Country *"
          errorMessage="Select Country"
          options={countriesList}
          setValue={setCountryValue}
          value={countryValue}
          customStyles={styles.contryRegionSelect}
          label="ISO"
        />
        {provinceSelect ? (
          <SelectComponent
            register={register}
            error={error}
            name="provinceISO"
            required={true}
            defaultOptionLabel="Province *"
            options={regionsOptions}
            setValue={setRegionValue}
            value={regionValue}
            customStyles={styles.contryRegionSelect}
            label="ISO"
          />
        ) : (
          <InputComponent
            labelText="Province *"
            name="province"
            type="text"
            register={register}
            error={error}
            required={{
              required: "This field is required",
              pattern: {
                value: /^([a-zA-ZÀ-ÿẞ])+(([ ]([a-zA-ZÀ-ÿẞ])+)+)?$/,
                message: "Please enter a valid value",
              },
            }}
          />
        )}
      </div>
      <PhoneInputComponent
        labelText="Phone number *"
        name="phone"
        register={register}
        error={error}
        required={true}
        prefixValue={prefixValue}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "65px 1fr",
          columnGap: "var(--spc-xxs)",
        }}
      >
        <InputComponent
          labelText="Age *"
          name="age"
          type="text"
          register={register}
          error={error}
          required={{ required: true, minlength: 1 }}
        />
        <SelectComponent
          register={register}
          error={error}
          required={true}
          name="study_level"
          defaultOptionLabel="Educational level *"
          value={educationValue}
          options={educationLevelOptions}
          setValue={setEducationValue}
          label="code"
          errorMessage="Select educational level"
        />
      </div>
    </div>
  );
};
