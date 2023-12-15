import React, { useState } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { Button, Card, Typography } from "antd";

import TwoColumn from "../../core/layouts/TwoColumn/TwoColumn";

import CustomButton from "../CustomButton";

import { ReactComponent as ArrowRight } from "../../themes/base/assets/images/arrow-right-filter.svg";
import { ReactComponent as CheckedBox } from "../../themes/base/assets/images/checkedBox.svg";
import { ReactComponent as PartialSelection } from "../../themes/base/assets/images/some filters are selected.svg";
import { ReactComponent as UnCheckedBox } from "../../themes/base/assets/images/unCheckedBox.svg";

import { stylesObject } from "./SearchFilter.styles";
import styles from "./SearchFilter.module.scss";

const SearchFilter = ({
  filterPropertiesArray,
  setShowFilters,
  showFilters,
}) => {
  const intl = useIntl();
  const [currentFilterStatus, setCurrentFilterStatus] = useState([]);
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

  return (
    <>
      {showFilters ? (
        <div className={styles.cardParentContainer}>
          <Card
            title={intl.formatMessage({ id: "label.filter" })}
            className={styles.filterContainer}
            headStyle={stylesObject.filterHeaderText}
            extra={
              <Button
                type="link"
                onClick={() => setCurrentFilterStatus([])}
                className={styles.clearAllBtn}
              >
                {intl.formatMessage({ id: "label.clearAll" })}
              </Button>
            }
            bodyStyle={stylesObject.cardBody}
          >
            <TwoColumn
              // TODO: Srujan will be working on the responsive designs of the filters hence do not touch it much
              isLeftFillSpace
              isRightFillSpace
              leftSectionStyle={stylesObject.filterLeftSectionBorder}
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
                          {currentFilterStatus.length === 0 ? (
                            <UnCheckedBox />
                          ) : currentFilterStatus.length === 3 ? (
                            <CheckedBox />
                          ) : (
                            <PartialSelection />
                          )}
                          <Typography className={styles.filterOptionText}>
                            {item.name}
                          </Typography>
                        </div>
                        <div>
                          <ArrowRight />
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
                          <CheckedBox />
                        ) : (
                          <UnCheckedBox />
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
      ) : (
        <></>
      )}
    </>
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
