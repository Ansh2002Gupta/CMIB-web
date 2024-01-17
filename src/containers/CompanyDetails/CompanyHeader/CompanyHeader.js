import React from "react";
import { useIntl } from "react-intl";
import { Switch, Typography } from "antd";

import { TwoColumn } from "core/layouts";
import useResponsive from "core/hooks/useResponsive";

import CustomButton from "../../../components/CustomButton";
import ContentHeader from "../../../containers/ContentHeader";
import { ReactComponent as ArrowDown } from "../../../themes/base/assets/images/arrow-down.svg";
import { ReactComponent as Edit } from "../../../themes/base/assets/images/editDark.svg";
import { COMPANY_STATUS } from "../../../companyDetailsDummyData";
import { classes } from "./CompanyHeader.styles";
import styles from "./CompanyHeader.module.scss";
import { TwoRow } from "../../../core/layouts";

function CompanyHeader() {
  const intl = useIntl();
  const responsive = useResponsive();

  return (
    <TwoRow
      className={styles.topSectionWithFRN}
      topSection={
        <ContentHeader
          customStyles={!responsive?.isMd ? styles.customStyles : ""}
          headerText={intl.formatMessage({ id: "label.appdynamics" })}
          rightSection={
            <div className={styles.headerRightSection}>
              <TwoColumn
                className={styles.statusContainer}
                leftSection={
                  <Switch style={classes.switchBackground} checked={true} />
                }
                rightSection={
                  <Typography className={styles.blackText}>
                    {intl.formatMessage({
                      id: `label.${
                        COMPANY_STATUS.status ? "active" : "inactive"
                      }`,
                    })}
                  </Typography>
                }
              />
              <CustomButton
                btnText={
                  responsive?.isLg
                    ? intl.formatMessage({
                        id: "label.downloadDetails",
                      })
                    : ""
                }
                IconElement={ArrowDown}
                iconStyles={styles.btnIconStyles}
                customStyle={
                  responsive?.isLg
                    ? styles.greyBtnCustomStyles
                    : styles.greySmallBtnCustomStyles
                }
              />
              <CustomButton
                btnText={
                  responsive?.isLg
                    ? intl.formatMessage({ id: "label.edit" })
                    : ""
                }
                IconElement={Edit}
                iconStyles={styles.btnIconStyles}
                customStyle={
                  responsive?.isLg
                    ? styles.greyBtnCustomStyles
                    : styles.greySmallBtnCustomStyles
                }
              />
            </div>
          }
        />
      }
      bottomSection={
        <span className={styles.grayText}>
          {intl.formatMessage({ id: "label.frn" })}:{" "}
          <span className={styles.blackBoldText}>
            {COMPANY_STATUS.frn_number}
          </span>
        </span>
      }
    />
  );
}

export default CompanyHeader;
