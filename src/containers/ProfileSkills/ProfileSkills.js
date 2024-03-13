import React, { useState } from "react";
import { useIntl } from "react-intl";
import { Typography } from "antd";

import { TwoColumn, TwoRow } from "../../core/layouts";
import MultiRowInput from "../../components/MultiRowInput/MultiRowInput";
import useResponsive from "../../core/hooks/useResponsive";
import styles from "./ProfileSkills.module.scss";

const ProfileSkills = ({
  currentFieldStateItSkills,
  currentFieldStateSoftSkills,
  setCurrentFieldStateItSkills,
  setCurrentFieldStateSoftSkills,
}) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const intl = useIntl();
  const responsive = useResponsive();

  const handleChange = (
    newText,
    currentFieldState,
    field,
    setCurrentFieldState
  ) => {
    const updatedFields = currentFieldState.map((item) => {
      if (field?.id === item?.id) {
        return { ...item, fieldValue: newText };
      } else {
        return item;
      }
    });
    setCurrentFieldState(updatedFields);
  };

  const handleClick = (
    buttonType,
    currentFieldState,
    field,
    setCurrentFieldState
  ) => {
    if (buttonType === "add") {
      handleAdd(field, currentFieldState, setCurrentFieldState);
    } else {
      handleDelete(field, currentFieldState, setCurrentFieldState);
    }
  };

  const handleAdd = (field, currentFieldState, setCurrentFieldState) => {
    if (field?.fieldValue.length === 0) {
      setErrorMsg("The field can't be empty!");
      setIsError(true);
      return;
    }
    setErrorMsg("");
    setIsError(false);
    const updatedFields = currentFieldState.map((item) => {
      if (item.id === field?.id) {
        return { ...item, buttonType: "delete" };
      } else return item;
    });
    setCurrentFieldState([
      ...updatedFields,
      { fieldValue: "", buttonType: "add", id: field?.id + 1 },
    ]);
  };

  const handleDelete = (
    fieldToBeDeleted,
    currentFieldState,
    setCurrentFieldState
  ) => {
    const filteredFields = currentFieldState.filter(
      (item) => item?.id !== fieldToBeDeleted?.id
    );
    const updatedFields = filteredFields.map((item) => {
      if (item?.id < fieldToBeDeleted?.id) return item;
      else if (item?.id > fieldToBeDeleted?.id)
        return { ...item, id: item?.id - 1 };
      else return item;
    });
    setCurrentFieldState(updatedFields);
  };

  return (
    <div className={styles.outerContainer}>
      <TwoRow
        bottomSection={
          <div className={styles.twoColumnWrapper}>
            <TwoColumn
              className={`${styles.twoColumnStyling} ${
                responsive.isMd
                  ? styles.flexDirectionRow
                  : styles.flexDirectionCol
              }`}
              leftSection={
                <MultiRowInput
                  currentFieldState={currentFieldStateItSkills}
                  errorMessage={errorMsg}
                  headerText={intl?.formatMessage({
                    id: "label.headerTextItSkills",
                  })}
                  isError={isError}
                  onChange={(newText, field) =>
                    handleChange(
                      newText,
                      currentFieldStateItSkills,
                      field,
                      setCurrentFieldStateItSkills
                    )
                  }
                  onClick={(buttonType, field) =>
                    handleClick(
                      buttonType,
                      currentFieldStateItSkills,
                      field,
                      setCurrentFieldStateItSkills
                    )
                  }
                  placeholderText={intl?.formatMessage({
                    id: "label.placeholderItSkills",
                  })}
                  valueKeyName="fieldValue"
                />
              }
              leftSectionClassName={styles.leftSectionStyling}
              rightSection={
                <MultiRowInput
                  currentFieldState={currentFieldStateSoftSkills}
                  errorMessage={errorMsg}
                  headerText={intl?.formatMessage({
                    id: "label.headerTextSoftSkills",
                  })}
                  isError={isError}
                  onChange={(newText, field) =>
                    handleChange(
                      newText,
                      currentFieldStateSoftSkills,
                      field,
                      setCurrentFieldStateSoftSkills
                    )
                  }
                  onClick={(buttonType, field) =>
                    handleClick(
                      buttonType,
                      currentFieldStateSoftSkills,
                      field,
                      setCurrentFieldStateSoftSkills
                    )
                  }
                  placeholderText={intl?.formatMessage({
                    id: "label.placeholderSoftSkills",
                  })}
                  valueKeyName="fieldValue"
                />
              }
              rightSectionClassName={styles.rightSectionStyling}
            />
          </div>
        }
        topSection={
          <Typography className={styles.topSectionHeader}>
            Set Profile Skills
          </Typography>
        }
      />
    </div>
  );
};

export default ProfileSkills;
