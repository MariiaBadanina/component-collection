import React, { useState } from "react";
import InputComponent from "../../../components/InputComponent";
import RadioButtonGroup from "../../../components/RadioButtonGroup";
import SelectComponent from "../../../components/SelectComponent";
import countriesList from "../../../constants/countriesList";
import styles from "./styles.module.scss";

export default ({ register, error }) => {
  const [countryValue, setCountryValue] = useState(null);

  return (
    <div>
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
          name="nationalityISO"
          required={true}
          defaultOptionLabel="Nationality *"
          errorMessage="This field is required"
          options={countriesList}
          value={countryValue}
          setValue={setCountryValue}
          customStyles={styles.halfWidth}
          label="ISO"
        />
        <InputComponent
          labelText="Passport *"
          name="documentNumber"
          type="text"
          register={register}
          error={error}
          required={{ required: true, minlength: 1 }}
          errorMessage="This field is required"
          customStyles={styles.halfWidth}
        />
      </div>
      <InputComponent
        labelText="Latest completed studies *"
        name="study_otherStudies"
        type="text"
        register={register}
        error={error}
        required={{ required: true, minlength: 1 }}
        errorMessage="This field is required"
        helperText="ej. Grado en Diseño"
      />
      <InputComponent
        labelText="Year of completion *"
        name="study_endYearOfAcademicStudies"
        type="text"
        register={register}
        error={error}
        required={{ required: true, minlength: 4 }}
        errorMessage="This field is required"
      />
      <InputComponent
        labelText="Center/ University *"
        name="study_center"
        type="text"
        register={register}
        error={error}
        required={{ required: true, minlength: 1 }}
        errorMessage="This field is required"
      />
      <InputComponent
        labelText="Motivation for choosing the program *"
        name="contact_comment"
        type="textarea"
        register={register}
        error={error}
        required={{ required: true, minlength: 1 }}
        errorMessage="This field is required"
      />
      <RadioButtonGroup
        register={register}
        error={error}
        label="How would you describe your English level?
 *"
        elements={[
          { label: "Low", value: "low" },
          { label: "Medium", value: "medium" },
          { label: "High", value: "high" },
        ]}
      />
    </div>
  );
};
