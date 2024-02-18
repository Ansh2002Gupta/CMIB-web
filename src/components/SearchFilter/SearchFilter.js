import React, { useContext, useRef, useState } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { ThemeContext } from "core/providers/theme";
import { Button, Card, Image, Typography } from "antd";

import TwoColumn from "../../core/layouts/TwoColumn/TwoColumn";
import useResponsive from "../../core/hooks/useResponsive";

import CustomButton from "../CustomButton";
import CustomCheckBox from "../CustomCheckBox";
import useOutSideClick from "../../core/hooks/useOutSideClick";
import { classes } from "./SearchFilter.styles";
import styles from "./SearchFilter.module.scss";

const SearchFilter = ({
  filterArray,
  filterPropertiesArray,
  onFilterApply,
  setFilterArray,
  setShowFilters,
  showFilters,
}) => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);
  const responsive = useResponsive();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentFilterStatus, setCurrentFilterStatus] = useState(filterArray);

  const elementNotConsideredInOutSideClick = useRef();

  const { wrapperRef } = useOutSideClick({
    onOutSideClick: () => {
      setShowFilters(false);
      setCurrentFilterStatus(filterArray);
    },
    elementNotToBeConsidered: elementNotConsideredInOutSideClick,
  });

  const handleOnUpdateAccessFilterStatus = (itemId, optionId) => {
    setCurrentFilterStatus((prevStatus) => {
      const updatedStatus = { ...prevStatus };

      if (updatedStatus[itemId] && updatedStatus[itemId].includes(optionId)) {
        updatedStatus[itemId] = updatedStatus[itemId].filter(
          (id) => id !== optionId
        );
      } else {
        updatedStatus[itemId] = [...(updatedStatus[itemId] || []), optionId];
      }
      return updatedStatus;
    });
  };

  const showOption = (index) => {
    setSelectedIndex(index);
  };

  const selectOrRemoveAll = (item) => {
    const itemOptionIds = item.options.map((option) => option.optionId);
    const itemId = item.id;
    if (!currentFilterStatus?.[itemId]?.length) {
      setCurrentFilterStatus({
        ...currentFilterStatus,
        [itemId]: itemOptionIds,
      });
    } else {
      const isSelectedItemOptions = itemOptionIds.every((optionId) =>
        (currentFilterStatus[itemId] || []).includes(optionId)
      );
      const updatedStatus = { ...currentFilterStatus };
      if (isSelectedItemOptions) {
        delete updatedStatus[itemId];
      } else {
        updatedStatus[itemId] = itemOptionIds;
      }

      setCurrentFilterStatus(updatedStatus);
    }
  };

  const handleClearFilter = () => {
    if (Object.keys(filterArray).length !== 0) {
      setFilterArray({});
      onFilterApply({});
    }
    setCurrentFilterStatus({});
    setShowFilters(false);
  };

  const getCheckBoxes = (item) => {
    const selectedOptionIds = currentFilterStatus[item.id] || [];
    if (selectedOptionIds.length === 0) {
      return getImage("unCheckedBox");
    }
    if (selectedOptionIds.length === item.options.length) {
      return getImage("checkedBox");
    }
    return getImage("someFiltersAreSelected");
  };

  const totalCount = Object.values(currentFilterStatus).reduce(
    (total, currentArray) => {
      return total + currentArray.length;
    },
    0
  );

  return (
    <div className={styles.container}>
      <Button
        ref={wrapperRef}
        className={styles.filterBtn}
        onClick={() => setShowFilters((prev) => !prev)}
      >
        <Image
          src={getImage("filter")}
          preview={false}
          className={styles.iconStyle}
        />
        <Typography className={styles.filterBtnText}>
          {intl.formatMessage({ id: "label.filters" })}
        </Typography>
        {totalCount > 0 && (
          <Typography className={styles.countFilterStyle}>
            {totalCount}
          </Typography>
        )}
      </Button>
      {showFilters && (
        <div
          className={styles.cardParentContainer}
          ref={elementNotConsideredInOutSideClick}
        >
          <Card
            title={intl.formatMessage({ id: "label.filters" })}
            className={styles.filterContainer}
            headStyle={classes.filterHeaderText}
            extra={
              <Button
                type="link"
                onClick={handleClearFilter}
                className={styles.clearAllBtn}
              >
                {intl.formatMessage({ id: "label.clearAll" })}
              </Button>
            }
            bodyStyle={classes.cardBody}
          >
            <TwoColumn
              isLeftFillSpace
              isRightFillSpace
              leftSectionStyle={
                responsive.isMd
                  ? classes.leftSectionStyle
                  : classes.filterLeftSectionMobile
              }
              rightSectionStyle={
                responsive.isMd
                  ? classes.rightSectionStyle
                  : classes.filterRightSectionMobile
              }
              leftSection={
                <div>
                  {filterPropertiesArray?.map((item, index) => {
                    return (
                      <div
                        className={[
                          styles.filterOption,
                          selectedIndex === index ? styles.active : "",
                        ].join(" ")}
                        onClick={() => showOption(index)}
                        key={index}
                      >
                        <div className={styles.filterTextAndCheckContainer}>
                          <Image
                            className={styles.iconStyle}
                            style={classes.iconStyle}
                            src={getCheckBoxes(item)}
                            preview={false}
                            onClick={() => selectOrRemoveAll(item)}
                          />
                          <Typography className={styles.leftFilterOptionText}>
                            {item.name}
                          </Typography>
                          {item?.options?.length && (
                            <div className={styles.filterRightArrow}>
                              <Image
                                src={getImage("arrowRightFilter")}
                                preview={false}
                                style={classes.iconStyle}
                                className={styles.iconStyle}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              }
              rightSection={
                <div>
                  {filterPropertiesArray[selectedIndex]?.options?.map(
                    (item, index) => {
                      return (
                        <CustomCheckBox
                          checked={(
                            currentFilterStatus[
                              filterPropertiesArray[selectedIndex].id
                            ] || []
                          ).includes(item.optionId)}
                          onChange={() =>
                            handleOnUpdateAccessFilterStatus(
                              filterPropertiesArray[selectedIndex].id,
                              item.optionId
                            )
                          }
                          customStyles={styles.filterSecondLevelOption}
                        >
                          <Typography className={styles.filterOptionText}>
                            {item?.str}{" "}
                            <span className={styles.textInBrackets}>
                              {!isNaN(item?.count) ? `(${item?.count})` : ""}
                            </span>
                          </Typography>
                        </CustomCheckBox>
                      );
                    }
                  )}
                </div>
              }
            />
          </Card>
          <div className={styles.footerBtnContainer}>
            <Button
              className={styles.cancelBtn}
              onClick={() => {
                setShowFilters(false);
                setCurrentFilterStatus(filterArray);
              }}
            >
              {intl.formatMessage({ id: "label.cancel" })}
            </Button>
            <CustomButton
              btnText={intl.formatMessage({ id: "label.show_result" })}
              customStyle={styles.showResultBtn}
              onClick={() => {
                setFilterArray(currentFilterStatus);
                onFilterApply(currentFilterStatus);
                setShowFilters(false);
              }}
              textStyle={styles.buttonTextStyle}
            />
          </div>
        </div>
      )}
    </div>
  );
};

SearchFilter.defaultProps = {
  filterArray: [],
  filterPropertiesArray: [],
  setFilterArray: () => {},
  setShowFilters: () => {},
  showFilters: false,
};

SearchFilter.propTypes = {
  filterArray: PropTypes.array,
  filterPropertiesArray: PropTypes.array,
  handleApllyFilter: PropTypes.func,
  setFilterArray: PropTypes.func,
  setShowFilters: PropTypes.func,
  showFilters: PropTypes.bool,
};

export default SearchFilter;
