import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";

import Chip from "../../components/Chip";
import CustomButton from "../../components/CustomButton/CustomButton";
import ContentHeader from "../ContentHeader/ContentHeader";
import useResponsive from "../../core/hooks/useResponsive";
import { ReactComponent as CheckIconWhite } from "../../themes/base/assets/images/check-white.svg";
import { STATUS } from "../../constant/constant";
import styles from "./QueryDetailsHeader.module.scss";

const QueryDetailsHeader = ({
  fetchData,
  id,
  markedQueryAsAnswered,
  readable_id,
  showNotification,
  status,
}) => {
  const intl = useIntl();
  const responsive = useResponsive();

  return (
    <div className={styles.container}>
      <ContentHeader
        headerText={readable_id}
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
          status?.toLowerCase() === STATUS.PENDING?.toLowerCase() ? (
            <CustomButton
              IconElement={responsive?.isSm ? CheckIconWhite : null}
              customStyle={!responsive?.isSm ? styles.buttonStyles : ""}
              btnText={intl.formatMessage({
                id: "label.markAnswered",
              })}
              onClick={() =>
                markedQueryAsAnswered({
                  queryId: id,
                  onSuccessCallback: () => fetchData({}),
                  onErrorCallBack: (error) => showNotification(error, "error"),
                })
              }
            />
          ) : null
        }
      />
    </div>
  );
};

QueryDetailsHeader.defaultProps = {
  fetchData: () => {},
  id: 0,
  markedQueryAsAnswered: () => {},
  showNotification: () => {},
  status: "",
};

QueryDetailsHeader.propTypes = {
  fetchData: PropTypes.func,
  id: PropTypes.number,
  markedQueryAsAnswered: PropTypes.func,
  showNotification: PropTypes.func,
  status: PropTypes.string,
};

export default QueryDetailsHeader;
