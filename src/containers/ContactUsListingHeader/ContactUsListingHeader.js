import React from "react";
import PropTypes from "prop-types";
import { Typography } from "antd";

import { TwoRow } from "../../core/layouts";
import styles from "./ContactUsListingHeader.module.scss";
import { useIntl } from "react-intl";

const ContactUsListingHeader = ({ currentActiveTab, setCurrentActiveTab }) => {
  const intl = useIntl();

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
            onClick={() => setCurrentActiveTab(1)}
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
            onClick={() => setCurrentActiveTab(2)}
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
