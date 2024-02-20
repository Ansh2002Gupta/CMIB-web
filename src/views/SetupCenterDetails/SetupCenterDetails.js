import React, { useContext } from "react";
import { useIntl } from "react-intl";
import { useParams, useSearchParams } from "react-router-dom";

import { TwoRow } from "../../core/layouts";

import CenterDetailsContent from "../../containers/CenterDetailsContent";
import CenterDetailsHeader from "../../containers/CenterDetailsHeader";
import ErrorMessageBox from "../../components/ErrorMessageBox";
import useFetch from "../../core/hooks/useFetch";
import {
  ADMIN_ROUTE,
  CENTRE_END_POINT,
  ROUNDS,
} from "../../constant/apiEndpoints";
import { getErrorMessage } from "../../constant/utils";
import { ROUND_ID } from "../../constant/constant";
import { Spin } from "antd";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import styles from "./SetupCenterDetails.module.scss";

const SetupCenterDetails = () => {
  const [searchParams] = useSearchParams();
  const { centreId } = useParams();
  const [userProfileDetails] = useContext(UserProfileContext);
  const selectedModule = userProfileDetails?.selectedModuleItem;
  const isEdit = searchParams.get("mode") === "edit";
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
  });
  const intl = useIntl();

  const { centres } = centreDetailData || {};
  const { centre_code, name } = centres?.[0] ?? {};

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
            onRetry={() => getCentreDetail()}
            errorHeading={intl.formatMessage({ id: "label.errorOccured" })}
          />
        </div>
      )}
      {isDetailsFetchSuccessful && (
        <TwoRow
          className={styles.mainContainer}
          topSection={
            <CenterDetailsHeader
              {...{ centreCode: centre_code, centre: name }}
            />
          }
          bottomSection={
            <CenterDetailsContent
              {...{
                centreDetailData,
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
