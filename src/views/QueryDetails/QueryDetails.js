import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useIntl } from "react-intl";

import TwoRow from "../../core/layouts/TwoRow/TwoRow";

import CustomLoader from "../../components/CustomLoader/CustomLoader";
import ErrorMessageBox from "../../components/ErrorMessageBox/ErrorMessageBox";
import QueryDetailsContent from "../../containers/QueryDetailsContent";
import QueryDetailsHeader from "../../containers/QueryDetailsHeader";
import useFetch from "../../core/hooks/useFetch";
import useMarkQueriesAsAnswerApi from "../../services/api-services/Queries/useMarkQueriesAsAnswerApi";
import { NotificationContext } from "../../globalContext/notification/notificationProvider";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useShowNotification from "../../core/hooks/useShowNotification";
import { userDetailToast } from "../../globalContext/notification/notificationActions";
import { getErrorMessage } from "../../constant/utils";
import { ADMIN_ROUTE, QUERIES_END_POINT } from "../../constant/apiEndpoints";
import { QUERIES } from "../../routes/routeNames";
import { STATUS_CODES } from "../../constant/constant";
import { classes } from "./QueryDetails.styles";
import styles from "./QueryDetails.module.scss";

const QueryDetails = () => {
  const { queryId } = useParams();
  const intl = useIntl();

  const GET_QUERY_URL = ADMIN_ROUTE + QUERIES_END_POINT + "/" + queryId;

  const { data, error, fetchData, isError, isLoading, isSuccess } = useFetch({
    url: GET_QUERY_URL,
    apiOptions: {
      headers: {
        Accept: "application/json",
      },
    },
  });
  const { showNotification, notificationContextHolder } = useShowNotification();
  const { navigateScreen: navigate } = useNavigateScreen();
  const [userProfileDetails] = useContext(UserProfileContext);
  const [, setNotificationStateDispatch] = useContext(NotificationContext);
  const selectedModule = userProfileDetails?.selectedModuleItem;

  const { handleMarkQueriesAsAnswered, isLoading: isMarkingQueryAsAnswered } =
    useMarkQueriesAsAnswerApi();

  const typeOfData = data?.type?.split(" ")[1];

  useEffect(() => {
    if (error?.data?.code === STATUS_CODES.NOT_FOUND) {
      navigate(`/${selectedModule?.key}/${QUERIES}`);
      setNotificationStateDispatch(userDetailToast(true));
    }
  }, [error?.data?.code]);

  return (
    <>
      {notificationContextHolder}
      {(isLoading || isMarkingQueryAsAnswered) && <CustomLoader />}
      {isError && (
        <div className={styles.errorContainer}>
          <ErrorMessageBox
            errorText={getErrorMessage(error)}
            onRetry={() => fetchData({})}
            errorHeading={intl.formatMessage({ id: "label.errorOccured" })}
          />
        </div>
      )}
      {isSuccess && !isMarkingQueryAsAnswered && (
        <TwoRow
          topSection={
            <QueryDetailsHeader
              id={data?.id}
              readable_id={data?.readable_id}
              status={data?.status}
              {...{
                handleMarkQueriesAsAnswered,
                showNotification,
                fetchData,
              }}
            />
          }
          bottomSection={
            <QueryDetailsContent type={typeOfData} {...{ data }} />
          }
          isBottomFillSpace
          bottomSectionStyle={classes.bottomContainer}
        />
      )}
    </>
  );
};

export default QueryDetails;
