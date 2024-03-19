import React from "react";
import PropTypes from "prop-types";
import { Typography } from "antd";

import { TwoRow } from "../../core/layouts";

import commonStyles from "../../common/commonStyles.module.scss";

const SubscriptionDetailsCard = ({ heading, content }) => {
  return (
    <TwoRow
      className={commonStyles.cardContainer}
      topSection={
        <Typography className={commonStyles.headingText}>{heading}</Typography>
      }
      bottomSection={content}
    />
  );
};

SubscriptionDetailsCard.defaultProps = {
  heading: "",
  content: <></>,
};

SubscriptionDetailsCard.propTypes = {
  heading: PropTypes.string,
  content: PropTypes.element,
};

export default SubscriptionDetailsCard;
