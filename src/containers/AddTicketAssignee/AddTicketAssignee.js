import React, { useContext, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Image, Typography } from "antd";

import { ThreeRow, TwoColumn, TwoRow } from "../../core/layouts";
import { ThemeContext } from "core/providers/theme";

import CustomButton from "../../components/CustomButton";
import CustomRadioButton from "../../components/CustomRadioButton";
import useFetch from "../../core/hooks/useFetch";
import useTicketAssignApi from "../../services/api-services/Ticket/useTicketAssignApi";
import {
  ASSIGNEES,
  CORE_ROUTE,
  TICKET_LIST,
} from "../../constant/apiEndpoints";
import { ASSIGNEE_DUMMY } from "../../dummyData";
import styles from "./AddTicketAssignee.module.scss";
import { classes } from "./AddTicketAssignee.styles";

const AddTicketAssignee = ({ currentTicketData, setIsModalOpen }) => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);
  const [selectedValue, setSelectedValue] = useState();
  const { data, error, fetchData, isError, isLoading, isSuccess, setData } =
    useFetch({
      url: CORE_ROUTE + TICKET_LIST + ASSIGNEES,
    });
  const { handleAssignTicket } = useTicketAssignApi();
  const handleSubmit = () => {
    setSelectedValue(null);
    setIsModalOpen(false);
    handleAssignTicket({
      payload: { ticket_id: currentTicketData?.id, user_id: selectedValue },
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
          />
        </div>
      }
      middleSectionStyle={classes.middleContainer}
      middleSection={
        <div className={styles.assigneeContainer}>
          {data &&
            data?.records &&
            data?.records?.map((item) => {
              return (
                <TwoColumn
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
            })}
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
        />
      }
    />
  );
};

export default AddTicketAssignee;
