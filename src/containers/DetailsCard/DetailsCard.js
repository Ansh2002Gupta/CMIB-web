import React from "react";
import { Image, Typography } from "antd";

import { TwoRow } from "../../core/layouts";

import CustomGrid from "../../components/CustomGrid";
import MarkRequired from "../../components/MarkRequired";
import { classes } from "./DetailsCard.styles";
import styles from "./DetailsCard.module.scss";
import { useIntl } from "react-intl";

const DetailsCard = ({
  customHeaderStyles,
  customLabelStyles,
  customValueStyles,
  isSingleComponent,
  details,
  headerText,
}) => {
  const intl = useIntl();

  console.log(isSingleComponent, "isSingleComponent..");

  return (
    <TwoRow
      style={classes.mainStyle}
      topSection={
        <Typography
          className={[styles.customHeaderStyles, customHeaderStyles].join(" ")}
        >
          {headerText}
        </Typography>
      }
      bottomSection={
        <CustomGrid
          customStyle={[
            styles.customStyle,
            isSingleComponent && styles.singleGrid,
          ].join(" ")}
        >
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
                    {intl.formatMessage({ id: item?.label })}&nbsp;
                    {item?.isMandatory && <MarkRequired />}
                  </Typography>
                }
                bottomSection={
                  item?.isImage ? (
                    <Image
                      src={item?.value}
                      preview={false}
                      width={24}
                      height={24}
                      className={styles.logoStyle}
                      alt={"company_logo"}
                    />
                  ) : (
                    <Typography
                      className={[
                        styles.customValueStyles,
                        customValueStyles,
                      ].join(" ")}
                    >
                      {item?.value}
                    </Typography>
                  )
                }
              />
            );
          })}
        </CustomGrid>
      }
    />
  );
};

export default DetailsCard;
