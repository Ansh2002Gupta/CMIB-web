import React from "react";

import TwoRow from "../../core/layouts/TwoRow/TwoRow";

import QueryDetailsHeader from "../../containers/QueryDetailsHeader";
import QueryDetailsContent from "../../containers/QueryDetailsContent";
import styles from "./QueryDetails.module.scss";

const QueryDetails = () => {
  // TODO: change folder structure to new structure as we are using in cmib_app repository.
  return (
    <TwoRow
      topSection={<QueryDetailsHeader />}
      bottomSection={<QueryDetailsContent />}
    />
  );
};

export default QueryDetails;
