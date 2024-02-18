import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Image, Typography } from "antd";

import { ThreeRow, TwoColumn } from "../../core/layouts";
import { ThemeContext } from "core/providers/theme";

import CustomButton from "../../components/CustomButton";
import CustomLoader from "../../components/CustomLoader";
import CustomRadioButton from "../../components/CustomRadioButton";
import useFetch from "../../core/hooks/useFetch";
import useTicketAssignApi from "../../services/api-services/Ticket/useTicketAssignApi";
import {
  ASSIGNEES,
  CORE_ROUTE,
  TICKET_LIST,
} from "../../constant/apiEndpoints";
import styles from "./AddTicketAssignee.module.scss";
import { classes } from "./AddTicketAssignee.styles";

const AddTicketAssignee = ({
  handleAssignee,
  setIsModalOpen,
  showNotification,
  ticket_id,
}) => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);
  const [selectedValue, setSelectedValue] = useState();
  const { data, error, isLoading } = useFetch({
    url: CORE_ROUTE + TICKET_LIST + ASSIGNEES,
  });
  const { isLoading: assigningTicket, handleAssignTicket } =
    useTicketAssignApi();
  const handleSubmit = () => {
    setSelectedValue(null);
    setIsModalOpen(false);
    handleAssignTicket({
      payload: { ticket_id, user_id: selectedValue },
      onErrorCallback: (errMessage) => {
        showNotification({
          text: errMessage,
          type: "error",
          headingText: intl.formatMessage({ id: "label.errorMessage" }),
        });
      },
      onSuccessCallback: () => {
        handleAssignee();
      },
    });
  };

  return (
    <ThreeRow
      className={styles.mainContainer}
      topSection={
        <div className={styles.topContainer}>
          <Typography className={styles.moduleText}>
            {intl.formatMessage({ id: "label.selectassignee" })}
          </Typography>
          <Image
            src={getImage("cross")}
            preview={false}
            onClick={() => {
              setSelectedValue(null);
              setIsModalOpen(false);
            }}
            className={styles.crossIcon}
            style={classes.crossIcon}
          />
        </div>
      }
      middleSectionStyle={classes.middleContainer}
      middleSection={
        <div className={styles.assigneeContainer}>
          {isLoading || assigningTicket ? (
            <CustomLoader />
          ) : data && data?.records ? (
            data?.records?.map((item) => {
              return (
                <TwoColumn
                  key={item.id}
                  onClick={() => {
                    setSelectedValue(item.id);
                  }}
                  leftSection={
                    <CustomRadioButton checked={selectedValue === item.id} />
                  }
                  rightSection={
                    <Typography className={styles.assigneeText}>
                      {item.name}
                    </Typography>
                  }
                />
              );
            })
          ) : (
            <div className={styles.noDataFoundContainer}>
              <Typography className={styles.noDataFound}>
                {error?.data?.message ||
                  intl.formatMessage({ id: "label.noDataFound" })}
              </Typography>
            </div>
          )}
        </div>
      }
      bottomSectionStyle={classes.buttonContainer}
      bottomSection={
        <CustomButton
          btnText={intl.formatMessage({ id: "label.assign" })}
          isBtnDisable={!selectedValue}
          onClick={() => {
            handleSubmit();
          }}
          customStyle={styles.customStyle}
        />
      }
    />
  );
};

AddTicketAssignee.defaultProps = {
  handleAssignee: () => {},
  setIsModalOpen: () => {},
  showNotification: () => {},
  ticket_id: null,
};

AddTicketAssignee.propTypes = {
  handleAssignee: PropTypes.func,
  setIsModalOpen: PropTypes.func,
  showNotification: PropTypes.func,
  ticket_id: PropTypes.number,
};

export default AddTicketAssignee;
