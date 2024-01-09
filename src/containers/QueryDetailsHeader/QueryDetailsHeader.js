import React from "react";
import { useIntl } from "react-intl";

import CustomButton from "../../components/CustomButton/CustomButton";
import ContentHeader from "../ContentHeader/ContentHeader";
import StatusChip from "../../components/StatusChip";
import { ReactComponent as CheckIconWhite } from "../../themes/base/assets/images/check-white.svg";
import styles from "./QueryDetailsHeader.module.scss";

// TODO: update by taking pull from development
const QueryDetailsHeader = ({ id }) => {
  const intl = useIntl();

  return (
    <div className={styles.container}>
      <ContentHeader
        headerText={id}
        headerComponent={
          <StatusChip
            isPending
            // TODO as per API.
            statusText={intl.formatMessage({
              id: "label.pending",
            })}
          />
        }
        rightSection={
          <CustomButton
            IconElement={CheckIconWhite}
            btnText={"Mark Answered"}
          />
        }
      />
    </div>
  );
};

export default QueryDetailsHeader;
