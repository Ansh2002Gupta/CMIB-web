import React from "react";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";

import { TwoRow } from "../../core/layouts";

import CenterDetailsHeader from "../../containers/CenterDetailsHeader";
import CenterDetailsContent from "../../containers/CenterDetailsContent";
import styles from "./SetupCenterDetails.module.scss";
import useResponsive from "../../core/hooks/useResponsive";

const SetupCenterDetails = () => {
  const { centerId } = useParams();
  const intl = useIntl();
  const responsive = useResponsive();

  return (
    <TwoRow
      className={styles.mainContainer}
      topSection={<CenterDetailsHeader {...{ centerId, intl }} />}
      bottomSection={<CenterDetailsContent {...{ intl, responsive }} />}
    />
  );
};

export default SetupCenterDetails;
