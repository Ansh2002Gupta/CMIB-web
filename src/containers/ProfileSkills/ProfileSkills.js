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
  const intl = useIntl();
  const responsive = useResponsive();

  const handleChange = (
    newText,
    currFieldid,
    currentFieldState,
    setCurrentFieldState
  ) => {
    const updatedFields = currentFieldState.map((item) => {
      if (currFieldid === item?.id) {
        return { ...item, fieldValue: newText };
      } else {
        return item;
      }
    });
    setCurrentFieldState(updatedFields);
  };

  const handleClick = (
    buttonType,
    currFieldid,
    currentFieldState,
    setCurrentFieldState
  ) => {
    if (buttonType === "add") {
      handleAdd(currFieldid, currentFieldState, setCurrentFieldState);
    } else {
      handleDelete(currFieldid, currentFieldState, setCurrentFieldState);
    }
  };

  const handleAdd = (currFieldid, currentFieldState, setCurrentFieldState) => {
    const updatedFields = currentFieldState.map((item) => {
      if (item.id === currFieldid) {
        return { ...item, buttonType: "delete" };
      } else return item;
    });
    setCurrentFieldState([
      ...updatedFields,
      { fieldValue: "", buttonType: "add", id: currFieldid + 1 },
    ]);
  };

  const handleDelete = (
    fieldToBeDeletedid,
    currentFieldState,
    setCurrentFieldState
  ) => {
    const filteredFields = currentFieldState.filter(
      (item) => item?.id !== fieldToBeDeletedid
    );
    const updatedFields = filteredFields.map((item) => {
      if (item?.id < fieldToBeDeletedid) return item;
      else if (item?.id > fieldToBeDeletedid)
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
                  headerText={intl?.formatMessage({
                    id: "label.headerTextItSkills",
                  })}
                  onChange={(newText, fieldid) =>
                    handleChange(
                      newText,
                      fieldid,
                      currentFieldStateItSkills,
                      setCurrentFieldStateItSkills
                    )
                  }
                  onClick={(buttonType, currFieldid) =>
                    handleClick(
                      buttonType,
                      currFieldid,
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
                  onChange={(newText, fieldid) =>
                    handleChange(
                      newText,
                      fieldid,
                      currentFieldStateSoftSkills,
                      setCurrentFieldStateSoftSkills
                    )
                  }
                  onClick={(buttonType, currFieldid) =>
                    handleClick(
                      buttonType,
                      currFieldid,
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

export default ProfileSkills;
