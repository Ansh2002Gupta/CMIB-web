import React, { useContext } from "react";
import { ThemeContext } from "core/providers/theme";
import { ThreeRow } from "../../core/layouts";

import { Image, Typography } from "antd";

import styles from "./RoundCard.module.scss";
import { classes } from "./RoundCard.styles";

const RoundCard = ({ headingDescription, headingIntl, imageUrl }) => {
  const { getImage } = useContext(ThemeContext);

  return (
    <ThreeRow
      className={styles.mainContainer}
      style={classes.mainContainerStyle}
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

export default RoundCard;
