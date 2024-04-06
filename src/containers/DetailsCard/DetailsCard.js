import React from "react";
import { Typography } from "antd";

import { TwoRow } from "../../core/layouts";

import CustomGrid from "../../components/CustomGrid";
import MarkRequired from "../../components/MarkRequired";
import { classes } from "./DetailsCard.styles";
import styles from "./DetailsCard.module.scss";

const DetailsCard = ({ details, headerText }) => {
  return (
    <TwoRow
      style={classes.mainStyle}
      topSection={<div>{headerText}</div>}
      bottomSection={
        <CustomGrid customStyle={styles.customStyle}>
          {details?.map((item) => {
            return (
              <TwoRow
                topSection={
                  <Typography
                    className={[
                      styles.customLabelStyles,
                      customLabelStyles,
                    ].join(" ")}
                  >
                    {item?.label}&nbsp;
                    {item?.isRequired && <MarkRequired />}
                  </Typography>
                }
                bottomSection={<div>{item?.value}</div>}
              />
            );
          })}
        </CustomGrid>
      }
    />
  );
};

export default DetailsCard;
