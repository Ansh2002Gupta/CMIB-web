import React from "react";
import { useIntl } from "react-intl";

import ContentHeader from "../ContentHeader/ContentHeader";
import styles from "./TicketListingHeader.module.scss";

const TicketListingHeader = () => {
  const intl = useIntl();

  return (
    <ContentHeader
      headerText={intl.formatMessage({
        id: "label.tickets",
      })}
      isLeftFillSpace
      customStyles={styles.container}
      customContainerStyle={styles.parentContainer}
    />
  );
};

export default TicketListingHeader;
