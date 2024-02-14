import React from "react";
import { useIntl } from "react-intl";

import ContentHeader from "../ContentHeader/ContentHeader";
import styles from "./QueriesListingHeader.module.scss";

const QueriesListingHeader = () => {
  const intl = useIntl();

  return (
    <ContentHeader
      headerText={intl.formatMessage({
        id: "label.queries",
      })}
      isLeftFillSpace
      customStyles={styles.container}
      customContainerStyle={styles.parentContainer}
    />
  );
};

export default QueriesListingHeader;
