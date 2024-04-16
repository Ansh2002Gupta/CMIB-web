import React from "react";
import { TwoRow } from "../../core/layouts";
import styles from "./SupportEmail.module.scss";
import ContentHeader from "../../containers/ContentHeader";
import { useIntl } from "react-intl";
import classes from "./SupportEmail.styles";
import SupportEmailEdit from "../../containers/SupportEmailEdit";

const SupportEmail = () => {
  const intl = useIntl();

  return (
    <div className={styles.container}>
      <TwoRow
        className={styles.mainContainer}
        topSectionStyle={classes.topSectionStyle}
        topSection={
          <ContentHeader
            customStyles={styles.customStyles}
            headerText={intl.formatMessage({ id: "label.queryEmailSetup" })}
          />
        }
        bottomSection={<SupportEmailEdit />}
        isBottomFillSpace={true}
      />
    </div>
  );
};

export default SupportEmail;
