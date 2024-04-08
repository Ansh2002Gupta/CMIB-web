import React, { useContext } from "react";
import { Image, Typography } from "antd";
import { FormattedMessage } from "react-intl";

import { TwoRow } from "../../core/layouts";
import { ThemeContext } from "core/providers/theme";

import CustomGrid from "../../components/CustomGrid";
import Chip from "../../components/Chip/Chip";
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
  const { getImage } = useContext(ThemeContext);

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
                className={item.fullWidth && styles.gridItem}
                topSection={
                  item?.label ? (
                    <Typography
                      className={[
                        styles.customLabelStyles,
                        customLabelStyles,
                      ].join(" ")}
                    >
                      {intl.formatMessage({ id: item?.label })}&nbsp;
                      {item?.isMandatory && <MarkRequired />}
                    </Typography>
                  ) : (
                    <></>
                  )
                }
                bottomSection={
                  item?.isImage ? (
                    <Image
                      src={
                        item.value
                          ? item?.value
                          : getImage("company_placeholder")
                      }
                      preview={false}
                      width={340}
                      height={240}
                      className={styles.logoStyle}
                      alt={"company_logo"}
                    />
                  ) : (
                    <Typography
                      className={[
                        styles.customValueStyles,
                        customValueStyles,
                        item?.isCapitalize && styles.capitalize,
                      ].join(" ")}
                    >
                      {item?.isWebsite ? (
                        <a
                          href={item?.value}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={classes.linkStyles}
                        >
                          <FormattedMessage
                            id={item?.value}
                            defaultMessage={item?.value}
                          />
                          &nbsp;
                        </a>
                      ) : (
                        item?.value
                      )}
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
