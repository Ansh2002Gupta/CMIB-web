import React, { useCallback, useMemo } from "react";
import { useIntl } from "react-intl";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";
import { Typography } from "antd";

import { TwoRow } from "../../core/layouts";

import CustomTabs from "../../components/CustomTabs/CustomTabs";
import {
  ACTIVE_TAB,
  DEFAULT_PAGE_SIZE,
  PAGINATION_PROPERTIES,
} from "../../constant/constant";
import styles from "./ContactUsListingHeader.module.scss";

const ContactUsListingHeader = ({
  currentActiveTab,
  setCurrent,
  setCurrentActiveTab,
  setPageSize,
}) => {
  const intl = useIntl();
  const [, setSearchParams] = useSearchParams();

  const setPageSizeAndNumberToDefault = () => {
    setSearchParams((prev) => {
      prev.set([PAGINATION_PROPERTIES.CURRENT_PAGE], 1);
      prev.set([PAGINATION_PROPERTIES.ROW_PER_PAGE], DEFAULT_PAGE_SIZE);
      prev.delete(PAGINATION_PROPERTIES.SEARCH_QUERY);
      return prev;
    });
    setCurrent(1);
    setPageSize(DEFAULT_PAGE_SIZE);
  };

  const handleOnTabSwitch = useCallback((tabId) => {
    setCurrentActiveTab(tabId);
    setPageSizeAndNumberToDefault();
  }, []);

  const tabItems = useMemo(
    () => [
      {
        key: "1",
        title: intl.formatMessage({ id: "label.tickets" }),
      },
      {
        key: "2",
        title: intl.formatMessage({ id: "label.queries" }),
      },
    ],
    []
  );

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
        <CustomTabs
          tabs={tabItems}
          activeTab={currentActiveTab}
          setActiveTab={handleOnTabSwitch}
          tabsKeyText={ACTIVE_TAB}
        />
      }
    />
  );
};

ContactUsListingHeader.defaultProps = {
  currentActiveTab: "1",
  setCurrent: () => {},
  setCurrentActiveTab: () => {},
  setPageSize: () => {},
};

ContactUsListingHeader.propTypes = {
  currentActiveTab: PropTypes.string,
  setCurrent: PropTypes.func,
  setCurrentActiveTab: PropTypes.func,
  setPageSize: PropTypes.func,
};

export default ContactUsListingHeader;
