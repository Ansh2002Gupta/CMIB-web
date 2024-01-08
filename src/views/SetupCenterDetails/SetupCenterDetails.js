import React from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { TwoRow } from "../../core/layouts";

import CenterDetailsHeader from "../../containers/CenterDetailsHeader";
import CenterDetailsContent from "../../containers/CenterDetailsContent";
import styles from "./SetupCenterDetails.module.scss";

const SetupCenterDetails = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { centreId } = useParams();
  const isEdit = searchParams.get("edit") === "true";

  return (
    <TwoRow
      className={styles.mainContainer}
      topSection={<CenterDetailsHeader {...{ centreId }} />}
      bottomSection={<CenterDetailsContent {...{ isEdit }} />}
    />
  );
};

export default SetupCenterDetails;
