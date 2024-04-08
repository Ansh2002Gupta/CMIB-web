import React from "react";
import { TwoColumn } from "../../core/layouts";

import CustomCheckBox from "../CustomCheckBox/CustomCheckBox";
import CustomGrid from "../CustomGrid";
import { classes } from "./CheckBoxListComponent.styles";
import styles from "./CheckBoxListComponent.module.scss";

const CheckBoxListComponent = ({
  customContainerStyles,
  options,
  slectedBox,
  handleSelectBox,
}) => {
  const handleSelect = (val) => {
    if (slectedBox.includes(val)) {
      const updatedData = slectedBox.filter((item) => item !== val);
      handleSelectBox(updatedData);
    } else {
      handleSelectBox([...slectedBox, val]);
    }
  };
  return (
    <div
      className={[styles.customContainerStyles, customContainerStyles].join(
        " "
      )}
    >
      <CustomGrid customStyle={styles.gridContainer}>
        {options.map((item) => {
          return (
            <TwoColumn
              leftSection={
                <CustomCheckBox
                  checked={slectedBox && slectedBox.includes(item)}
                  onChange={() => handleSelect(item)}
                />
              }
              rightSection={item}
              rightSectionStyle={classes.rightSectionStyle} //Use rightSectionClassName, i have added in style for demonstration
              style={classes.mainStyles} // add
            />
          );
        })}
      </CustomGrid>
    </div>
  );
};

export default CheckBoxListComponent;
