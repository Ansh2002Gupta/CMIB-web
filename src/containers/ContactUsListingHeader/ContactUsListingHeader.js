import React from "react";
import { useIntl } from "react-intl";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import { Typography } from "antd";

import { TwoRow } from "../../core/layouts";

import { DEFAULT_PAGE_SIZE, PAGINATION_PROPERTIES } from "../../constant/constant";
import styles from "./ContactUsListingHeader.module.scss";

const ContactUsListingHeader = ({ currentActiveTab, setCurrentActiveTab }) => {
  const intl = useIntl();
  const [, setSearchParams] = useSearchParams();

  const setPageSizeAndNumberToDefault = () => {
    setSearchParams((prev) => {
      prev.set([PAGINATION_PROPERTIES.CURRENT_PAGE], 1);
      prev.set([PAGINATION_PROPERTIES.ROW_PER_PAGE], DEFAULT_PAGE_SIZE);
      return prev;
    });
  };

  const handleOnTabSwitch = (tabId) => {
    setPageSizeAndNumberToDefault();
    setCurrentActiveTab(tabId);
  };

  return (
    <TwoRow
      className={styles.container}
      topSection={
        <div>
          <Typography className={styles.heading}>
            {intl.formatMessage({
              id: "label.contactUs",
            })}
          </Typography>
        </div>
      }
      bottomSection={
        <div className={styles.tabsContainer}>
          <div
            className={[
              styles.box,
              currentActiveTab === 1 ? styles.activeBox : "",
            ].join(" ")}
            onClick={() => handleOnTabSwitch(1)}
          >
            <Typography
              className={[
                styles.tabsText,
                currentActiveTab === 1 ? styles.activeText : "",
              ].join(" ")}
            >
              {intl.formatMessage({
                id: "label.queries",
              })}
            </Typography>
          </div>
          <div
            className={[
              styles.box,
              currentActiveTab === 2 ? styles.activeBox : "",
            ].join(" ")}
            onClick={() => handleOnTabSwitch(2)}
          >
            <Typography
              className={[
                styles.tabsText,
                currentActiveTab === 2 ? styles.activeText : "",
              ].join(" ")}
            >
              {intl.formatMessage({
                id: "label.tickets",
              })}
            </Typography>
          </div>
        </div>
      }
    />
  );
};

ContactUsListingHeader.defaultProps = {
  currentActiveTab: 1,
  setCurrentActiveTab: () => {},
};

ContactUsListingHeader.propTypes = {
  currentActiveTab: PropTypes.number,
  setCurrentActiveTab: PropTypes.func,
};

export default ContactUsListingHeader;
