import React from "react";
import { Typography } from "antd";

import { TwoColumn } from "../../core/layouts";

import CustomCheckBox from "../CustomCheckBox/CustomCheckBox";
import CustomGrid from "../CustomGrid";
import { classes } from "./CheckBoxListComponent.styles";
import styles from "./CheckBoxListComponent.module.scss";

const CheckBoxListComponent = ({
  customContainerStyles,
  options,
  selectedBox,
  handleSelectBox,
}) => {
  const handleSelect = (val) => {
    if (selectedBox.includes(val)) {
      const updatedData = selectedBox.filter((item) => item !== val);
      handleSelectBox(updatedData);
    } else {
      handleSelectBox([...selectedBox, val]);
    }
  };
  return (
    <div
      className={[styles.customContainerStyles, customContainerStyles].join(
        " "
      )}
    >
      <CustomGrid customStyle={styles.gridContainer}>
        {options.map((item, index) => {
          return (
            <TwoColumn
              style={classes.mainStyles}
              key={index}
              leftSection={
                <CustomCheckBox
                  checked={selectedBox && selectedBox.includes(item)}
                  onChange={() => handleSelect(item)}
                />
              }
              rightSection={
                <Typography className={styles.checkBoxText}>{item}</Typography>
              }
              rightSectionStyle={classes.rightSectionStyle}
            />
          );
        })}
      </CustomGrid>
    </div>
  );
};

export default CheckBoxListComponent;
