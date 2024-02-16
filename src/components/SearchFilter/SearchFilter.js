import React, { useContext, useRef, useState } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { ThemeContext } from "core/providers/theme";
import { Button, Card, Image, Typography } from "antd";

import TwoColumn from "../../core/layouts/TwoColumn/TwoColumn";
import useResponsive from "../../core/hooks/useResponsive";

import CustomButton from "../CustomButton";
import useOutSideClick from "../../core/hooks/useOutSideClick";
import { classes } from "./SearchFilter.styles";
import styles from "./SearchFilter.module.scss";

const SearchFilter = ({
  filterArray,
  filterPropertiesArray,
  setFilterArray,
  setShowFilters,
  showFilters,
  onFilterApply,
}) => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);
  const responsive = useResponsive();

  function getAllOptionIds(data) {
    const optionIds = [];
    data.forEach((item) => {
      if (item.options && Array.isArray(item.options)) {
        item.options.forEach((option) => {
          if (option?.optionId || option?.optionId === 0) {
            optionIds.push(option.optionId);
          }
        });
      }
    });
    return optionIds;
  }
  const allOptionId = getAllOptionIds(filterPropertiesArray);

  const [currentFilterStatus, setCurrentFilterStatus] = useState(filterArray);
  const elementNotConsideredInOutSideClick = useRef();

  const { wrapperRef } = useOutSideClick({
    onOutSideClick: () => {
      setShowFilters(false);
    },
    elementNotToBeConsidered: elementNotConsideredInOutSideClick,
  });

  const handleOnUpdateAccessFilterStatus = (optionId) => {
    let updateData;
    if (currentFilterStatus.includes(optionId)) {
      updateData = currentFilterStatus.filter((item) => item !== optionId);
      setCurrentFilterStatus(updateData);
      return;
    }
    updateData = [...currentFilterStatus, optionId];
    setCurrentFilterStatus(updateData);
  };

  const selectOrRemoveAll = () => {
    if (currentFilterStatus.length === 0) {
      setCurrentFilterStatus(allOptionId);
      return;
    }
    setCurrentFilterStatus([]);
  };

  const getCheckBoxes = () => {
    if (!currentFilterStatus?.length) {
      return getImage("unCheckedBox");
    }
    if (currentFilterStatus?.length === allOptionId.length) {
      return getImage("checkedBox");
    }
    return getImage("someFiltersAreSelected");
  };

  return (
    <div className={styles.container}>
      <Button
        ref={wrapperRef}
        className={styles.filterBtn}
        onClick={() => setShowFilters((prev) => !prev)}
      >
        <Image src={getImage("filter")} preview={false} />
        <Typography className={styles.filterBtnText}>
          {intl.formatMessage({ id: "label.filters" })}
        </Typography>
        {filterArray.length > 0 && (
          <Typography className={styles.countFilterStyle}>
            {filterArray.length}
          </Typography>
        )}
      </Button>
      {showFilters && (
        <div
          className={styles.cardParentContainer}
          ref={elementNotConsideredInOutSideClick}
        >
          <Card
            title={
              <div
                className={styles.paddingLeft}
              >
                {intl.formatMessage({ id: "label.filters" })}
              </div>
            }
            className={styles.filterContainer}
            headStyle={classes.filterHeaderText}
            extra={
              <Button
                type="link"
                onClick={() => {
                  setCurrentFilterStatus([]);
                  setFilterArray([]);
                  setShowFilters(false);
                  onFilterApply([]);
                }}
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
              className={styles.filterOptionContainer}
              leftSection={
                <div>
                  {filterPropertiesArray?.map((item, index) => {
                    return (
                      <div
                        className={[
                          styles.filterOption,
                          item.isSelected ? styles.active : "",
                        ].join(" ")}
                        onClick={selectOrRemoveAll}
                        key={index}
                      >
                        <div className={styles.filterTextAndCheckContainer}>
                          <Image src={getCheckBoxes()} preview={false} />
                          <Typography className={styles.leftFilterOptionText}>
                            {item.name}
                          </Typography>
                        </div>
                        {item?.options?.length && (
                          <div className={styles.filterRightArrow}>
                            <Image
                              src={getImage("arrowRightFilter")}
                              preview={false}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              }
              rightSection={
                <div>
                  {filterPropertiesArray[0]?.options?.map((item, index) => {
                    return (
                      <div
                        className={[styles.filterSecondLevelOption].join(" ")}
                        onClick={() =>
                          handleOnUpdateAccessFilterStatus(item.optionId)
                        }
                        key={index}
                      >
                        {currentFilterStatus.includes(item.optionId) ? (
                          <Image src={getImage("checkedBox")} preview={false} />
                        ) : (
                          <Image
                            src={getImage("unCheckedBox")}
                            preview={false}
                          />
                        )}
                        <Typography className={styles.filterOptionText}>
                          {item?.str}{" "}
                          <span className={styles.textInBrackets}>
                            {!isNaN(item?.count) ? `(${item?.count})` : ""}
                          </span>
                        </Typography>
                      </div>
                    );
                  })}
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
