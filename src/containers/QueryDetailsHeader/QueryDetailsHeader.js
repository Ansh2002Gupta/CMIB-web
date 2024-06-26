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
  handleMarkQueriesAsAnswered,
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
            textStyles={
              styles[
                status?.toLowerCase() === STATUS.PENDING?.toLowerCase()
                  ? "pending_color"
                  : "success_color"
              ]
            }
            customContainerStyles={
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
              IconElement={CheckIconWhite}
              customStyle={[
                styles.btn,
                !responsive?.isSm ? styles.buttonStyles : "",
              ].join(" ")}
              btnText={
                responsive?.isSm
                  ? intl.formatMessage({
                      id: "label.markAnswered",
                    })
                  : ""
              }
              onClick={() =>
                handleMarkQueriesAsAnswered({
                  payload: {
                    query_id: [id],
                  },
                  onSuccessCallback: () => fetchData({}),
                  onErrorCallback: (error) => {
                    showNotification({ text: error, type: "error" });
                  },
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
