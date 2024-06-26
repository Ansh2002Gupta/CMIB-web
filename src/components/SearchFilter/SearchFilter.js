import React, { useContext, useRef, useState } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { ThemeContext } from "core/providers/theme";
import { Button, Card, Image, Slider, Typography } from "antd";

import TwoColumn from "../../core/layouts/TwoColumn/TwoColumn";
import useResponsive from "../../core/hooks/useResponsive";

import CustomButton from "../CustomButton";
import CustomCheckBox from "../CustomCheckBox";
import useOutSideClick from "../../core/hooks/useOutSideClick";
import { SLIDER_DEFAULT_VALUE } from "../../constant/constant";
import { classes } from "./SearchFilter.styles";
import styles from "./SearchFilter.module.scss";
import CustomSlider from "../CustomSlider";

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
  const [experienceRange, setExperienceRange] = useState([2, 4]);

  const elementNotConsideredInOutSideClick = useRef();

  const { wrapperRef } = useOutSideClick({
    onOutSideClick: () => {
      setShowFilters(false);
      setCurrentFilterStatus(filterArray);
    },
    elementNotToBeConsidered: elementNotConsideredInOutSideClick,
  });

  const marks = {
    [0]: 0,
    [1000]: 1000,
  };

  const handleFilter = (itemId, value) => {
    setCurrentFilterStatus((prevData) => {
      return { ...prevData, [itemId]: value };
    });
  };

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

  const sliderSelectOrRemove = (item) => {
    const itemId = item?.id;
    if (item?.isSlider) {
      if (currentFilterStatus?.[itemId]?.length)
        setCurrentFilterStatus({ ...currentFilterStatus, [itemId]: [] });
      else
        setCurrentFilterStatus({
          ...currentFilterStatus,
          [itemId]: SLIDER_DEFAULT_VALUE,
        });
    }
  };

  const selectOrRemoveAll = (item) => {
    const itemOptionIds = item.options.map((option) => option.optionId);
    const itemId = item?.id;

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
    if (
      (item.isSlider && !selectedOptionIds?.length) ||
      selectedOptionIds?.length === 0
    ) {
      return getImage("unCheckedBox");
    }
    if (
      (item.isSlider && selectedOptionIds?.length) ||
      selectedOptionIds?.length === item.options?.length
    ) {
      return getImage("checkedBox");
    }
    return getImage("someFiltersAreSelected");
  };

  const totalCount = Object.values(filterArray).reduce(
    (total, currentArray, index) => {
      if (filterPropertiesArray[index]?.isSlider) {
        if (currentArray?.length) {
          return total + 1;
        }
        return total;
      }
      return total + currentArray?.length;
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
                            onClick={() =>
                              item?.isSlider
                                ? sliderSelectOrRemove(item)
                                : selectOrRemoveAll(item)
                            }
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
                filterPropertiesArray[selectedIndex]?.isSlider ? (
                  <div className={styles.sliderContainer}>
                    {
                      <Typography className={styles.sliderLabel}>
                        {currentFilterStatus[
                          filterPropertiesArray[selectedIndex]?.id
                        ]?.length
                          ? `${
                              currentFilterStatus[
                                filterPropertiesArray[selectedIndex]?.id
                              ][0]
                            } - ${
                              currentFilterStatus[
                                filterPropertiesArray[selectedIndex]?.id
                              ][1]
                            }`
                          : `0-0`}
                      </Typography>
                    }
                    <Slider
                      range
                      max={1000}
                      tipProps={{ visible: true }}
                      marks={marks}
                      defaultValue={SLIDER_DEFAULT_VALUE}
                      disabled={false}
                      trackStyle={classes.trackStyle}
                      onChange={(val) => {
                        handleFilter(
                          filterPropertiesArray[selectedIndex]?.id,
                          val
                        );
                      }}
                      value={
                        currentFilterStatus[
                          filterPropertiesArray[selectedIndex]?.id
                        ]
                      }
                    />
                  </div>
                ) : (
                  <div>
                    {filterPropertiesArray[selectedIndex]?.type === "slider" ? (
                      <CustomSlider
                        min={0}
                        max={40}
                        defaultValue={experienceRange}
                        onChange={(value) => {
                          setExperienceRange(value);
                        }}
                        onAfterChange={(value) => {
                          handleOnUpdateAccessFilterStatus(
                            filterPropertiesArray[selectedIndex].id,
                            value
                          );
                        }}
                        range={true}
                      />
                    ) : filterPropertiesArray[selectedIndex]?.options ? (
                      filterPropertiesArray[selectedIndex].options.map(
                        (item, index) => {
                          return (
                            <CustomCheckBox
                              key={item.optionId}
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
                                {item.str}
                                <span className={styles.textInBrackets}>
                                  {!isNaN(item.count) ? `(${item.count})` : ""}
                                </span>
                              </Typography>
                            </CustomCheckBox>
                          );
                        }
                      )
                    ) : null}
                  </div>
                )
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
  onFilterApply: () => {},
};

SearchFilter.propTypes = {
  filterArray: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  filterPropertiesArray: PropTypes.array,
  handleApllyFilter: PropTypes.func,
  setFilterArray: PropTypes.func,
  setShowFilters: PropTypes.func,
  showFilters: PropTypes.bool,
  onFilterApply: PropTypes.func,
};

export default SearchFilter;
