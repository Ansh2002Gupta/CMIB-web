import React from "react";
import { useIntl } from "react-intl";

import ContentHeader from "../../ContentHeader";
import CustomButton from "../../../components/CustomButton";
import { ReactComponent as PlusIcon } from "../../../themes/base/assets/images/plus icon.svg";
import styles from "./CandidateHeader.module.scss";

const CandidateHeader = () => {
  const intl = useIntl();

  return (
    <div className={styles.headerContainer}>
      <ContentHeader
        headerText={intl.formatMessage({ id: "label.manageCandidates" })}
        customStyles={styles.headerResponsiveStyle}
      />
    </div>
  );
};

export default CandidateHeader;
