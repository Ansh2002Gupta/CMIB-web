import React from "react";
import { useIntl } from "react-intl";
import { Switch, Typography } from "antd";

import { TwoColumn, TwoRow } from "core/layouts";

import ContentHeader from "../../containers/ContentHeader";
import useResponsive from "core/hooks/useResponsive";
import { COMPANY_STATUS } from "../../companyDetailsDummyData";
import { classes } from "./AllJobDetailHeader.styles";
import styles from "./AllJobDetailHeader.module.scss";

function AllJobDetailHeaderView({designation}) {
  const intl = useIntl();
  const responsive = useResponsive();

  return (
    <TwoRow
      className={styles.topSectionWithFRN}
      topSection={
        <ContentHeader
          customStyles={!responsive?.isMd ? styles.customStyles : ""}
          headerText={designation}
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
            </div>
          }
        />
      }
      bottomSection={<></>}
    />
  );
}

export default AllJobDetailHeaderView;
