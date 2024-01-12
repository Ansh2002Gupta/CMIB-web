import React from "react";
import { useIntl } from "react-intl";
import { Switch, Typography } from "antd";

import { TwoColumn } from "core/layouts";
import useResponsive from "core/hooks/useResponsive";

import ContentHeader from "../../../containers/ContentHeader";
import CustomButton from "../../../components/CustomButton";
import { ReactComponent as ArrowDown } from "../../../themes/base/assets/images/arrow-down.svg";
import { ReactComponent as Edit } from "../../../themes/base/assets/images/editDark.svg";
import { COMPANY_STATUS } from "../../../companyDetailsDummyData";
import { classes } from "./CompanyHeader.styles";
import styles from "./CompanyHeader.module.scss";

function CompanyHeader() {
  const intl = useIntl();
  const responsive = useResponsive();

  return (
    <div className={styles.topSectionWithFRN}>
      <ContentHeader
        customStyles={!responsive?.isMd && styles.customStyles}
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
                responsive?.isLg ? intl.formatMessage({ id: "label.edit" }) : ""
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
      <span className={styles.grayText}>
        FRN:{" "}
        <span className={styles.blackBoldText}>
          {COMPANY_STATUS.frn_number}
        </span>
      </span>
    </div>
  );
}

export default CompanyHeader;
