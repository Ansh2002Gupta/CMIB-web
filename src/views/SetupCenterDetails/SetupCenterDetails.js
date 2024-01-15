import React from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { TwoRow } from "../../core/layouts";

import CenterDetailsContent from "../../containers/CenterDetailsContent";
import CenterDetailsHeader from "../../containers/CenterDetailsHeader";
import styles from "./SetupCenterDetails.module.scss";

const SetupCenterDetails = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { centreId } = useParams();
  const isEdit = searchParams.get("mode") === "edit";

  return (
    <TwoRow
      className={styles.mainContainer}
      topSection={<CenterDetailsHeader {...{ centreId }} />}
      bottomSection={<CenterDetailsContent {...{ isEdit }} />}
    />
  );
};

export default SetupCenterDetails;
