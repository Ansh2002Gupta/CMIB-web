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
    if (val.includes(slectedBox)) {
      const updatedData = selectedOptionArray.filter(
        (selectedId) => selectedId !== id
      );
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
