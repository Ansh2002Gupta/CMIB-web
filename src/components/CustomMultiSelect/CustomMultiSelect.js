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
  const [combinedString, setCombinedString] = useState("");

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
  console.log({selectedOptions})

  const toggleOptionId = (optionObject) => {
    let updatedData = [];
    if (Array.isArray(optionObject)) {
      // optionObject is array of Number
      updatedData = selectedOptions.filter(
        (item) => !optionObject.includes(item.id)
      );
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

  useEffect(() => {
    if (selectedOptions?.length) {
      let strArr = [];
      optionsArray.forEach((item) => {
        let tempStrArr = item.options
          .filter((v) => selectedOptions.includes(v.id))
          .map((v) => v.text);
        strArr = [...strArr, ...tempStrArr];
      });
      setCombinedString(strArr.join(","));
      return;
    }
    setCombinedString("");
  }, [selectedOptions]);

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
        {combinedString?.split(",")?.map((item, index) => {
          return (
            <div className={styles.chips} key={index}>
              <Typography className={styles.chipsText}>{item}</Typography>
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
                    onClick={() => toggleOptionId(item.allOptionIds)}
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
                        {selectedOptions.includes(option.id) ? (
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
