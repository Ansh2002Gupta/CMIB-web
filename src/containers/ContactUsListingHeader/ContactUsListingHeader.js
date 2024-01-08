import React from "react";
import { useIntl } from "react-intl";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import { Typography } from "antd";

import { TwoRow } from "../../core/layouts";

import {
  DEFAULT_PAGE_SIZE,
  PAGINATION_PROPERTIES,
} from "../../constant/constant";
import styles from "./ContactUsListingHeader.module.scss";

const ContactUsListingHeader = ({
  currentActiveTab,
  queryListingProps,
  setCurrent,
  setCurrentActiveTab,
  setPageSize,
  ticketListingProps,
}) => {
  const intl = useIntl();
  const [, setSearchParams] = useSearchParams();

  const { fetchTickets } = ticketListingProps;
  const { fetchQueries } = queryListingProps;

  const fetchItems = (tabId, pageSize, current) => {
    tabId === 1 && fetchTickets(pageSize, current);
    tabId === 2 && fetchQueries(pageSize, current);
  };

  const setPageSizeAndNumberToDefault = () => {
    setSearchParams((prev) => {
      prev.set([PAGINATION_PROPERTIES.CURRENT_PAGE], 1);
      prev.set([PAGINATION_PROPERTIES.ROW_PER_PAGE], DEFAULT_PAGE_SIZE);
      return prev;
    });
    setCurrent(1);
    setPageSize(DEFAULT_PAGE_SIZE);
  };

  const handleOnTabSwitch = (tabId) => {
    setPageSizeAndNumberToDefault();
    setCurrentActiveTab(tabId);
    fetchItems(tabId, DEFAULT_PAGE_SIZE, 1);
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
  queryListingProps: {},
  setCurrent: () => {},
  setCurrentActiveTab: () => {},
  setPageSize: () => {},
  ticketListingProps: {},
};

ContactUsListingHeader.propTypes = {
  currentActiveTab: PropTypes.number,
  queryListingProps: PropTypes.object,
  setCurrent: PropTypes.func,
  setCurrentActiveTab: PropTypes.func,
  setPageSize: PropTypes.func,
  ticketListingProps: PropTypes.object,
};

export default ContactUsListingHeader;
