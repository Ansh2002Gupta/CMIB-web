import React from "react";
import { useIntl } from "react-intl";
import { useParams, useSearchParams } from "react-router-dom";

import { TwoRow } from "../../core/layouts";

import CenterDetailsHeader from "../../containers/CenterDetailsHeader";
import CenterDetailsContent from "../../containers/CenterDetailsContent";
import styles from "./SetupCenterDetails.module.scss";
import useResponsive from "../../core/hooks/useResponsive";

const SetupCenterDetails = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { centerId } = useParams();
  const isEdit = searchParams.get("edit") === "true";
  const intl = useIntl();
  const responsive = useResponsive();

  console.log(centerId, "centerId");

  return (
    <TwoRow
      className={styles.mainContainer}
      topSection={<CenterDetailsHeader {...{ centerId, intl }} />}
      bottomSection={<CenterDetailsContent {...{ isEdit, intl, responsive }} />}
    />
  );
};

export default SetupCenterDetails;
