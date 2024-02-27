import React, { useContext } from "react";
import { useIntl } from "react-intl";
import { useParams, useSearchParams } from "react-router-dom";

import { TwoRow } from "../../core/layouts";

import CenterDetailsContent from "../../containers/CenterDetailsContent";
import CenterDetailsHeader from "../../containers/CenterDetailsHeader";
import ErrorMessageBox from "../../components/ErrorMessageBox";
import { GlobalSessionContext } from "../../globalContext/globalSession/globalSessionProvider";
import useFetch from "../../core/hooks/useFetch";
import useModuleWiseApiCall from "../../core/hooks/useModuleWiseApiCall";
import {
  ADMIN_ROUTE,
  CENTRE_END_POINT,
  ROUNDS,
} from "../../constant/apiEndpoints";
import { getErrorMessage } from "../../constant/utils";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { ROUND_ID } from "../../constant/constant";
import { Spin } from "antd";
import styles from "./SetupCenterDetails.module.scss";

const SetupCenterDetails = () => {
  const [searchParams] = useSearchParams();
  const { centreId } = useParams();
  const [userProfileDetails] = useContext(UserProfileContext);
  const [globalSessionDetails] = useContext(GlobalSessionContext);
  const selectedModule = userProfileDetails?.selectedModuleItem;
  const currentGlobalSession = globalSessionDetails?.globalSessionList?.find(
    (item) => item.id === globalSessionDetails?.globalSessionId
  );
  const isEdit = currentGlobalSession?.is_editable;
  const roundId = searchParams.get(ROUND_ID);
  const {
    data: centreDetailData,
    error: errorWhileGettingDetails,
    fetchData: getCentreDetail,
    isLoading: isGettingCentreDetail,
    isSuccess: isDetailsFetchSuccessful,
  } = useFetch({
    url:
      ADMIN_ROUTE +
      `/${selectedModule?.key}` +
      ROUNDS +
      `/${roundId}` +
      CENTRE_END_POINT +
      `/${centreId}`,
    otherOptions: { skipApiCallOnMount: true },
  });
  const intl = useIntl();

  const { centre_code, name } = centreDetailData || {};

  useModuleWiseApiCall({
    initialApiCall: () => {
      getCentreDetail({});
    },
  });

  return (
    <>
      {isGettingCentreDetail && (
        <div className={styles.loaderContainer}>
          <Spin size="large" />
        </div>
      )}
      {!!errorWhileGettingDetails && (
        <div className={styles.loaderContainer}>
          <ErrorMessageBox
            errorText={getErrorMessage(errorWhileGettingDetails)}
            onRetry={() => getCentreDetail({})}
            errorHeading={intl.formatMessage({ id: "label.errorOccured" })}
          />
        </div>
      )}
      {isDetailsFetchSuccessful && (
        <TwoRow
          className={styles.mainContainer}
          topSection={
            <CenterDetailsHeader
              {...{
                centreCode: centre_code,
                centreName: name,
              }}
            />
          }
          bottomSection={
            <CenterDetailsContent
              {...{
                centreDetailData,
                centreId,
                isEdit,
                roundId,
                selectedModule: selectedModule?.key,
              }}
            />
          }
        />
      )}
    </>
  );
};

export default SetupCenterDetails;
