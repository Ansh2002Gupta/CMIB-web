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
  filterPropertiesArray,
  setShowFilters,
  showFilters,
}) => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);

  const [currentFilterStatus, setCurrentFilterStatus] = useState([]);
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
      setCurrentFilterStatus([1, 2, 3]);
      return;
    }
    setCurrentFilterStatus([]);
  };

  const getCheckBoxes = () => {
    // TODO: refactor this SearchFilter Component
    if (!currentFilterStatus?.length) {
      return getImage("unCheckedBox");
    }
    if (currentFilterStatus?.length === 3) {
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
              leftSection={
                <div>
                  {filterPropertiesArray?.map((item) => {
                    return (
                      <div
                        className={[
                          styles.filterOption,
                          item.isSelected ? styles.active : "",
                        ].join(" ")}
                        onClick={selectOrRemoveAll}
                      >
                        <div className={styles.filterTextAndCheckContainer}>
                          <Image src={getCheckBoxes()} preview={false} />
                          <Typography className={styles.filterOptionText}>
                            {item.name}
                          </Typography>
                        </div>
                        <div className={styles.filterRightArrow}>
                          <Image src={getImage("arrowRightFilter")} preview={false} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              }
              rightSection={
                <div>
                  {filterPropertiesArray[0]?.options?.map((item) => {
                    return (
                      <div
                        className={[styles.filterSecondLevelOption].join(" ")}
                        onClick={() =>
                          handleOnUpdateAccessFilterStatus(item.optionId)
                        }
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
                          {`${item?.str} (${item?.count})`}
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
            />
          </div>
        </div>
      )}
    </div>
  );
};

SearchFilter.defaultProps = {
  filterPropertiesArray: [],
  setShowFilters: () => {},
  showFilters: false,
};

SearchFilter.propTypes = {
  filterPropertiesArray: PropTypes.array,
  setShowFilters: PropTypes.func,
  showFilters: PropTypes.bool,
};

export default SearchFilter;
