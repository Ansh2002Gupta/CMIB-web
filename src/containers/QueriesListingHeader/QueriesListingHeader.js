import React from "react";
import PropTypes from "prop-types";
import { Typography } from "antd";

import { TwoRow } from "../../core/layouts";
import styles from "./QueriesListingHeader.module.scss";

const QueriesListingHeader = ({ currentActiveTab, setCurrentActiveTab }) => {
  return (
    <TwoRow
    className={styles.container}
      topSection={
        <div>
          <Typography className={styles.heading}>Contact Us</Typography>
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
              Tickets
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
              Queries
            </Typography>
          </div>
        </div>
      }
    />
  );
};

QueriesListingHeader.defaultProps = {
  currentActiveTab: 1,
  setCurrentActiveTab: () => {},
};

QueriesListingHeader.propTypes = {
  currentActiveTab: PropTypes.number,
  setCurrentActiveTab: PropTypes.func,
};

export default QueriesListingHeader;
