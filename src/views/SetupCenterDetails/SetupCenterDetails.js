import React, { useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useIntl } from "react-intl";
import { Spin } from "antd";

import { TwoRow } from "../../core/layouts";

import CenterDetailsContent from "../../containers/CenterDetailsContent";
import CenterDetailsHeader from "../../containers/CenterDetailsHeader";
import ErrorMessageBox from "../../components/ErrorMessageBox";
import { GlobalSessionContext } from "../../globalContext/globalSession/globalSessionProvider";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import useFetch from "../../core/hooks/useFetch";
import useModuleWiseApiCall from "../../core/hooks/useModuleWiseApiCall";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import { urlService } from "../../Utils/urlService";
import { getErrorMessage } from "../../constant/utils";
import {
  ADMIN_ROUTE,
  CENTRE_END_POINT,
  ROUNDS,
} from "../../constant/apiEndpoints";
import { ROUND_ID } from "../../constant/constant";
import { SESSION } from "../../routes/routeNames";
import styles from "./SetupCenterDetails.module.scss";

const SetupCenterDetails = () => {
  const { centreId } = useParams();
  const [userProfileDetails] = useContext(UserProfileContext);
  const [globalSessionDetails] = useContext(GlobalSessionContext);
  const selectedModule = userProfileDetails?.selectedModuleItem;
  const currentGlobalSession = globalSessionDetails?.globalSessionList?.find(
    (item) => item.id === globalSessionDetails?.globalSessionId
  );
  const { navigateScreen: navigate } = useNavigateScreen();
  const isEdit = currentGlobalSession?.is_editable;
  const roundId = urlService.getQueryStringValue(ROUND_ID);
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
  const location = useLocation();

  const { centre_code, name } = centreDetailData || {};

  useModuleWiseApiCall({
    initialApiCall: () => {
      if (roundId && centreId) {
        getCentreDetail({});
      } else {
        navigate(`/${selectedModule?.key}/${SESSION}?mode=view&tab=2`);
      }
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
                location,
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
