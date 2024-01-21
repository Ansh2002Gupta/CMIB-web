import React, { useContext, useRef, useState } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { ThemeContext } from "core/providers/theme";
import { Button, Card, Image, Typography } from "antd";

import TwoColumn from "../../core/layouts/TwoColumn/TwoColumn";

import CustomButton from "../CustomButton";
import useOutSideClick from "../../core/hooks/useOutSideClick";
import { classes } from "./SearchFilter.styles";
import styles from "./SearchFilter.module.scss";

const SearchFilter = ({
  currentFilterStatus,
  setCurrentFilterStatus,
  filterPropertiesArray,
  setShowFilters,
  showFilters,
  optionsIdKey,
  optionsNameKey,
  onSearch,
}) => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);
  
  const [currentlySelectOptionsGroup, setCurrentlySelectOptionsGroup] =
    useState(1);
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

  // TODO: need to decide that should we remove this function or not
  // const selectOrRemoveAll = () => {
  //   if (currentFilterStatus.length === 0) {
  //     setCurrentFilterStatus([1, 2, 3]);
  //     return;
  //   }
  //   setCurrentFilterStatus([]);
  // };

  const getCheckBoxes = (options) => {
    const optionsIdArray = options.map((item) => item[optionsIdKey]);
    const containsAll = optionsIdArray.every((element) =>
      currentFilterStatus.includes(element)
    );
    const containsSome = optionsIdArray.some((element) =>
      currentFilterStatus.includes(element)
    );
    if (containsAll) {
      return getImage("checkedBox");
    }
    if (containsSome) {
      return getImage("someFiltersAreSelected");
    }

    return getImage("unCheckedBox");
  };

  const optionsToBeShown = filterPropertiesArray?.filter(
    (item) => item.id === currentlySelectOptionsGroup
  )[0]?.options;

  return (
    <div className={styles.container}>
      <Button
        ref={wrapperRef}
        className={styles.filterBtn}
        onClick={() => setShowFilters((prev) => !prev)}
      >
        <Image src={getImage("filter")} preview={false} />
        <Typography className={styles.filterBtnText}>
          {intl.formatMessage({ id: "label.filter" })}
        </Typography>
      </Button>
      {showFilters && (
        <div
          className={styles.cardParentContainer}
          ref={elementNotConsideredInOutSideClick}
        >
          <Card
            title={intl.formatMessage({ id: "label.filter" })}
            className={styles.filterContainer}
            headStyle={classes.filterHeaderText}
            extra={
              <Button
                type="link"
                onClick={() => setCurrentFilterStatus([])}
                className={styles.clearAllBtn}
              >
                {intl.formatMessage({ id: "label.clearAll" })}
              </Button>
            }
            bodyStyle={classes.cardBody}
          >
            <TwoColumn
              // TODO: Srujan will be working on the responsive designs of the filters hence do not touch it much
              isLeftFillSpace
              isRightFillSpace
              leftSectionStyle={classes.filterLeftSectionBorder}
              className={styles.filterOptionContainer}
              leftSection={
                <div>
                  {filterPropertiesArray?.map((item, index) => {
                    return (
                      <div
                        className={[
                          styles.filterOption,
                          currentlySelectOptionsGroup === item.id
                            ? styles.active
                            : "",
                        ].join(" ")}
                        onClick={() => setCurrentlySelectOptionsGroup(item.id)}
                        key={index}
                      >
                        <div className={styles.filterTextAndCheckContainer}>
                          <Image
                            src={getCheckBoxes(item?.options)}
                            preview={false}
                          />
                          <Typography className={styles.filterOptionText}>
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
                <div className={styles.optionsContainer}>
                  {optionsToBeShown?.map((item, index) => {
                    return (
                      <div
                        className={[styles.filterSecondLevelOption].join(" ")}
                        onClick={() =>
                          handleOnUpdateAccessFilterStatus(item[optionsIdKey])
                        }
                        key={index}
                      >
                        {currentFilterStatus.includes(item[optionsIdKey]) ? (
                          <Image src={getImage("checkedBox")} preview={false} />
                        ) : (
                          <Image
                            src={getImage("unCheckedBox")}
                            preview={false}
                          />
                        )}
                        <Typography className={styles.filterOptionText}>
                          {item[optionsNameKey]}
                          {!isNaN(item?.count) ? `(${item?.count})` : ""}
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
              onClick={() => setShowFilters(false)}
            >
              {intl.formatMessage({ id: "label.cancel" })}
            </Button>
            <CustomButton
              btnText={intl.formatMessage({ id: "label.searchResult" })}
              customStyle={styles.showResultBtn}
              onClick={onSearch}
            />
          </div>
        </div>
      )}
    </div>
  );
};

SearchFilter.defaultProps = {
  currentFilterStatus: [],
  setCurrentFilterStatus: () => {},
  filterPropertiesArray: [],
  optionsIdKey: "id",
  optionsNameKey: "name",
  onSearch: () => {},
  setShowFilters: () => {},
  showFilters: false,
};

SearchFilter.propTypes = {
  currentFilterStatus: PropTypes.array,
  setCurrentFilterStatus: PropTypes.func,
  filterPropertiesArray: PropTypes.array,
  optionsIdKey: PropTypes.string,
  optionsNameKey: PropTypes.string,
  onSearch: PropTypes.func,
  setShowFilters: PropTypes.func,
  showFilters: PropTypes.bool,
};

export default SearchFilter;
