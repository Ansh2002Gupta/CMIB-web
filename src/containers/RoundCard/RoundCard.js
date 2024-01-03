import React, { useContext } from "react";
import PropTypes from "prop-types";
import { ThemeContext } from "core/providers/theme";
import { Image, Typography } from "antd";

import { ThreeRow } from "../../core/layouts";
import useResponsive from "core/hooks/useResponsive";

import { classes } from "./RoundCard.styles";
import styles from "./RoundCard.module.scss";

const RoundCard = ({ headingDescription, headingIntl, imageUrl, onClick }) => {
  const { getImage } = useContext(ThemeContext);
  const responsive = useResponsive();

  return (
    <ThreeRow
      {...{ onClick }}
      className={styles.mainContainer}
      style={
        responsive.isMd
          ? classes.mainContainerStyle
          : classes.mobileContainerStyle
      }
      topSection={
        <Image
          src={getImage(imageUrl)}
          preview={false}
          className={styles.imageStyle}
        />
      }
      middleSection={
        <Typography className={styles.heading}>{headingIntl}</Typography>
      }
      bottomSection={
        <Typography className={styles.description}>
          {headingDescription}
        </Typography>
      }
    />
  );
};

RoundCard.defaultProps = {
  headingDescription: "",
  headingIntl: "",
  imageUrl: "",
  onClick: () => {},
};

RoundCard.propTypes = {
  headingDescription: PropTypes.string,
  headingIntl: PropTypes.string,
  imageUrl: PropTypes.string,
  onClick: PropTypes.func,
};

export default RoundCard;
