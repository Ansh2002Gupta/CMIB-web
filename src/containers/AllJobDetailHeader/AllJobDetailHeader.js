import React from "react";
import { useIntl } from "react-intl";

import { TwoColumn, TwoRow } from "core/layouts";

import ContentHeader from "../../containers/ContentHeader";
import useResponsive from "core/hooks/useResponsive";
import styles from "./AllJobDetailHeader.module.scss";
import CustomSwitch from '../../components/CustomSwitch'

function AllJobDetailHeaderView({designation, changeJobStatus, isActive}) {
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
                  <CustomSwitch checked={isActive} onChange={changeJobStatus} activeText="active" inActiveText="inactive"   />
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
