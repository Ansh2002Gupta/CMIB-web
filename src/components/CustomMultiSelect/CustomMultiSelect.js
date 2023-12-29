import React, { useEffect, useRef, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { Typography } from "antd";

import useOutSideClick from "../../core/hooks/useOutSideClick";
import { ReactComponent as CheckedBox } from "../../themes/base/assets/images/checkedBox.svg";
import { ReactComponent as UnCheckedBox } from "../../themes/base/assets/images/unCheckedBox.svg";
import { ReactComponent as DropdownArrow } from "../../themes/base/assets/images/arrow-down-admin.svg";
import { ReactComponent as Cross } from "../../themes/base/assets/images/x.svg";
import styles from "./CustomMultiSelect.module.scss";
import { allAccessIdObject } from "../../constant/constant";

const CustomMultiSelect = ({
  optionsArray,
  selectedOptions,
  setSelectedOptions,
}) => {
  const intl = useIntl();
  const arrayOfAllOptionsIds = useMemo(() => {
    const idsCount = optionsArray.reduce(
      (acc, cur) => [...acc, ...cur.allOptionIds],
      []
    );
    return idsCount;
  }, []);
  const countOfAllOptionsIds = arrayOfAllOptionsIds.length;
  const shouldShowAllOptionForEntireOptionArray = optionsArray?.length > 1;

  const [selectAll, setSelectAll] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const elementNotToBeConsideredRef = useRef();
  const { wrapperRef } = useOutSideClick({
    onOutSideClick: () => setShowDropdown(false),
    elementNotToBeConsidered: elementNotToBeConsideredRef,
  });

  const doesIncludes = (arrayForSearching, objectToBeSerached) => {
    return (
      arrayForSearching.filter((item) => item.id === objectToBeSerached.id)
        ?.length === 1
    );
  };

  const selectAllOption = () => {
    const updatedStateValue = !selectAll;
    setSelectAll(updatedStateValue);
    if (updatedStateValue) {
      let data = [];
      optionsArray.forEach((item) => {
        data.push(...item.options);
      });
      setSelectedOptions(data);
      return;
    }
    setSelectedOptions([]);
  };

  const toggleOptionId = (optionObject) => {
    let updatedData = [];
    if (Array.isArray(optionObject)) {
      // optionObject is array of objects
      updatedData = selectedOptions.filter((item) => {
        return !doesIncludes(optionObject, item);
      });
      if (doesContainsAllIds(optionObject)) {
        setSelectAll(false);
        setSelectedOptions(updatedData);
        areAllOptionSelected(updatedData.length);
        return;
      }
      updatedData = [...updatedData, ...optionObject];
      areAllOptionSelected(updatedData.length);
      setSelectedOptions(updatedData);
      return;
    }
    if (doesIncludes(selectedOptions, optionObject)) {
      updatedData = selectedOptions.filter(
        (item) => item.id !== optionObject.id
      );
      setSelectedOptions(updatedData);
      setSelectAll(false);
      areAllOptionSelected(updatedData.length);
      return;
    }
    updatedData = [...selectedOptions, optionObject];
    areAllOptionSelected(updatedData.length);
    setSelectedOptions(updatedData);
  };

  const doesContainsAllIds = (idsObjectArray) => {
    let isArrayOfObject = typeof idsObjectArray[0] === "object";
    let countOfValuesContains = 0;
    selectedOptions.forEach((item) => {
      if (isArrayOfObject) {
        if (doesIncludes(idsObjectArray, item)) countOfValuesContains++;
        return;
      }
      if (idsObjectArray.includes(item.id)) countOfValuesContains++;
    });

    return countOfValuesContains === idsObjectArray?.length;
  };

  const areAllOptionSelected = (currentlySelectedOptionsCount) => {
    if (countOfAllOptionsIds === currentlySelectedOptionsCount) {
      setSelectAll(true);
      return;
    }
    setSelectAll(false);
  };

  const removeElement = (optionObject) => {
    const updatedData = selectedOptions.filter(
      (item) => item.id !== optionObject.id
    );
    setSelectedOptions(updatedData);
  };

  useEffect(() => {
    const data = [];
    console.log("indise effect",{selectedOptions})
    for (let i = 0; i < selectedOptions.length; i++) {
      for (let j = 0; j < allAccessIdObject.length; j++) {
        console.log({ v1: selectedOptions[i], v2: allAccessIdObject[j] });
        if (
          selectedOptions[i]?.toLowerCase() ===
          allAccessIdObject[j].text?.toLowerCase()
        ) {
          data.push(allAccessIdObject[j]);
        }
      }
    }
    console.log({ data });
    setSelectedOptions(data);
  }, []);

  return (
    <div className={styles.parentContainer}>
      <div className={styles.labelContainer}>
        <Typography>Access *</Typography>
        <div
          onClick={() => setShowDropdown((prev) => !prev)}
          ref={elementNotToBeConsideredRef}
          className={styles.optionDropdownPlaceHolderContaier}
        >
          <Typography>Select Modules</Typography>
          <DropdownArrow />
        </div>
      </div>
      <div className={styles.chipsListContainer}>
        {selectedOptions?.map((item, index) => {
          return (
            <div
              className={styles.chips}
              key={index}
              onClick={() => removeElement(item)}
            >
              <Typography className={styles.chipsText}>{item.text}</Typography>
              <Cross />
            </div>
          );
        })}
      </div>
      {showDropdown && (
        <div className={styles.container} ref={wrapperRef}>
          {shouldShowAllOptionForEntireOptionArray && (
            <div className={styles.section}>
              <div className={styles.optionContainer} onClick={selectAllOption}>
                {selectAll ? (
                  <CheckedBox className={styles.icon} />
                ) : (
                  <UnCheckedBox className={styles.icon} />
                )}
                <Typography className={styles.optionText}>
                  {intl.formatMessage({ id: "label.all" })}
                </Typography>
              </div>
            </div>
          )}
          {optionsArray?.map((item, index) => {
            return (
              <div className={styles.section} key={index}>
                <div className={styles.optionHeadingContainer}>
                  <Typography className={styles.optionsHeading}>
                    {item.heading}
                  </Typography>
                </div>
                <div className={styles.optionsListContainer}>
                  <div
                    className={styles.optionContainer}
                    key={index}
                    onClick={() => toggleOptionId(item.options)}
                  >
                    {doesContainsAllIds(item.allOptionIds) ? (
                      <CheckedBox className={styles.icon} />
                    ) : (
                      <UnCheckedBox className={styles.icon} />
                    )}
                    <Typography className={styles.optionText}>
                      {intl.formatMessage({ id: "label.all" })}
                    </Typography>
                  </div>
                  {item?.options?.map((option, index) => {
                    return (
                      <div
                        className={styles.optionContainer}
                        key={index}
                        onClick={() => toggleOptionId(option)}
                      >
                        {doesIncludes(selectedOptions, option) ? (
                          <CheckedBox className={styles.icon} />
                        ) : (
                          <UnCheckedBox className={styles.icon} />
                        )}
                        <Typography className={styles.optionText}>
                          {option.text}
                        </Typography>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

CustomMultiSelect.defaultProps = {
  optionsArray: [],
  selectedOptions: [],
  setSelectedOptions: () => {},
};

CustomMultiSelect.propTypes = {
  optionsArray: PropTypes.array,
  selectedOptions: PropTypes.array,
  setSelectedOptions: PropTypes.func,
};

export default CustomMultiSelect;
