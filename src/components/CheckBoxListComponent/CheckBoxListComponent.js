import React from "react";
import { TwoColumn } from "../../core/layouts";

import CustomCheckBox from "../CustomCheckBox/CustomCheckBox";
import CustomGrid from "../CustomGrid";
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
            />
          );
        })}
      </CustomGrid>
    </div>
  );
};

export default CheckBoxListComponent;
