import React, { useState } from "react";
import { useIntl } from "react-intl";
import { Typography } from "antd";

import { TwoColumn, TwoRow } from "../../../src/core/layouts";
import MultiRowInput from "../../components/MultiRowInput/MultiRowInput";
import useResponsive from "../../core/hooks/useResponsive";
import { initialFieldState } from "./constant";
import styles from "./SetProfile.module.scss";

const SetProfile = () => {
  const [currentFieldStateItSkills, setCurrentFieldStateItSkills] =
    useState(initialFieldState);
  const [currentFieldStateSoftSkills, setCurrentFieldStateSoftSkills] =
    useState(initialFieldState);
  const intl = useIntl();
  const responsive = useResponsive();

  const handleChange = (
    newText,
    currFieldIndex,
    currentFieldState,
    setCurrentFieldState
  ) => {
    const updatedFields = currentFieldState.map((item) => {
      if (currFieldIndex === item?.index) {
        return { ...item, fieldValue: newText };
      } else {
        return item;
      }
    });
    setCurrentFieldState(updatedFields);
  };

  const handleClick = (
    buttonType,
    currFieldIndex,
    currentFieldState,
    setCurrentFieldState
  ) => {
    if (buttonType === "add") {
      handleAdd(currFieldIndex, currentFieldState, setCurrentFieldState);
    } else {
      handleDelete(currFieldIndex, currentFieldState, setCurrentFieldState);
    }
  };

  const handleAdd = (
    currFieldIndex,
    currentFieldState,
    setCurrentFieldState
  ) => {
    const updatedFields = currentFieldState.map((item) => {
      if (item.index === currFieldIndex) {
        return { ...item, buttonType: "delete" };
      } else return item;
    });
    setCurrentFieldState([
      ...updatedFields,
      { fieldValue: "", buttonType: "add", index: currFieldIndex + 1 },
    ]);
  };

  const handleDelete = (
    fieldToBeDeletedIndex,
    currentFieldState,
    setCurrentFieldState
  ) => {
    const filteredFields = currentFieldState.filter(
      (item) => item?.index !== fieldToBeDeletedIndex
    );
    const updatedFields = filteredFields.map((item) => {
      if (item?.index < fieldToBeDeletedIndex) return item;
      else if (item?.index > fieldToBeDeletedIndex)
        return { ...item, index: item?.index - 1 };
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
                  headerText={intl?.formatMessage({
                    id: "label.headerTextItSkills",
                  })}
                  onChange={(newText, fieldIndex) =>
                    handleChange(
                      newText,
                      fieldIndex,
                      currentFieldStateItSkills,
                      setCurrentFieldStateItSkills
                    )
                  }
                  onClick={(buttonType, currFieldIndex) =>
                    handleClick(
                      buttonType,
                      currFieldIndex,
                      currentFieldStateItSkills,
                      setCurrentFieldStateItSkills
                    )
                  }
                  placeholderText={intl?.formatMessage({
                    id: "label.placeholderItSkills",
                  })}
                />
              }
              leftSectionClassName={styles.leftSectionStyling}
              rightSection={
                <MultiRowInput
                  currentFieldState={currentFieldStateSoftSkills}
                  headerText={intl?.formatMessage({
                    id: "label.headerTextSoftSkills",
                  })}
                  onChange={(newText, fieldIndex) =>
                    handleChange(
                      newText,
                      fieldIndex,
                      currentFieldStateSoftSkills,
                      setCurrentFieldStateSoftSkills
                    )
                  }
                  onClick={(buttonType, currFieldIndex) =>
                    handleClick(
                      buttonType,
                      currFieldIndex,
                      currentFieldStateSoftSkills,
                      setCurrentFieldStateSoftSkills
                    )
                  }
                  placeholderText={intl?.formatMessage({
                    id: "label.placeholderSoftSkills",
                  })}
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

export default SetProfile;
