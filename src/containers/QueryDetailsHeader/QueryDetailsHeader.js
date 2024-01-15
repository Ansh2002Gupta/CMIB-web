import React from "react";
import { useIntl } from "react-intl";

import Chip from "../../components/StatusChip";
import CustomButton from "../../components/CustomButton/CustomButton";
import ContentHeader from "../ContentHeader/ContentHeader";
import useResponsive from "../../core/hooks/useResponsive";
import { ReactComponent as CheckIconWhite } from "../../themes/base/assets/images/check-white.svg";
import styles from "./QueryDetailsHeader.module.scss";

// TODO: update by taking pull from development
const QueryDetailsHeader = ({ id }) => {
  const intl = useIntl();
  const responsive = useResponsive();

  return (
    <div className={styles.container}>
      <ContentHeader
        headerText={id}
        headerComponent={
          <Chip
            // TODO : status will come from API.
            label={intl.formatMessage({
              id: "label.pending",
            })}
            textColor={styles.pending_color}
            bgColor={styles.pending_bg}
          />
        }
        rightSection={
          <CustomButton
            IconElement={responsive?.isSm ? CheckIconWhite : null}
            customStyle={!responsive?.isSm ? styles.buttonStyles : ""}
            btnText={intl.formatMessage({
              id: "label.markAnswered",
            })}
          />
        }
      />
    </div>
  );
};

export default QueryDetailsHeader;
