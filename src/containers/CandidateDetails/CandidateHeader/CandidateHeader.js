import React from "react";
import { useIntl } from "react-intl";
import { Switch, Typography } from "antd";

import { TwoColumn, TwoRow } from "core/layouts";

import CustomButton from "../../../components/CustomButton";
import ContentHeader from "../../ContentHeader";
import useResponsive from "core/hooks/useResponsive";
import { ReactComponent as brifCase } from "../../../themes/base/assets/images/briefcase.svg";
import { ReactComponent as Edit } from "../../../themes/base/assets/images/editDark.svg";
import { COMPANY_STATUS } from "../../../companyDetailsDummyData";
import { classes } from "./CandidateHeader.styles";
import styles from "./CandidateHeader.module.scss";

function CandidateHeader() {
  const intl = useIntl();
  const responsive = useResponsive();

  return (
    <TwoRow
      className={styles.topSectionWithFRN}
      topSection={
        <ContentHeader
          customStyles={!responsive?.isMd ? styles.customStyles : ""}
          headerText="Deshad Apte"
          rightSection={
            <div className={styles.headerRightSection}>
              <div className={styles.jobCompletionRate}>
                <Typography className={styles.blackText}>
                  70%
                  {intl.formatMessage({
                    id: `label.jobProfileCompetion`,
                  })}
                </Typography>
              </div>

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
              <CustomButton
                btnText={
                  responsive?.isLg
                    ? intl.formatMessage({
                        id: "label.viewAppliedJobs",
                      })
                    : ""
                }
                IconElement={brifCase}
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
    />
  );
}

export default CandidateHeader;
