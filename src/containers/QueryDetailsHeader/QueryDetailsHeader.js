import React from "react";
import { useIntl } from "react-intl";

import Chip from "../../components/Chip";
import CustomButton from "../../components/CustomButton/CustomButton";
import ContentHeader from "../ContentHeader/ContentHeader";
import useResponsive from "../../core/hooks/useResponsive";
import { ReactComponent as CheckIconWhite } from "../../themes/base/assets/images/check-white.svg";
import { STATUS } from "../../constant/constant";
import styles from "./QueryDetailsHeader.module.scss";

const QueryDetailsHeader = ({ id, status }) => {
  const intl = useIntl();
  const responsive = useResponsive();

  return (
    <div className={styles.container}>
      <ContentHeader
        headerText={id}
        headerComponent={
          <Chip
            label={status}
            textColor={
              styles[
                status?.toLowerCase() === STATUS.PENDING?.toLowerCase()
                  ? "pending_color"
                  : "success_color"
              ]
            }
            bgColor={
              styles[
                status?.toLowerCase() === STATUS.PENDING?.toLowerCase()
                  ? "pending_bg"
                  : "success_bg"
              ]
            }
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
