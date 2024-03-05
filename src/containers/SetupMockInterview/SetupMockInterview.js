import React, { useContext, useEffect } from "react";
import { useIntl } from "react-intl";
import { ThemeContext } from "core/providers/theme";

import { TwoRow } from "../../core/layouts";

import DataTable from "../../components/DataTable/DataTable";
import CustomLoader from "../../components/CustomLoader";
import HeadingAndSubHeading from "../../components/HeadingAndSubHeading/HeadingAndSubHeading";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import useFetch from "../../core/hooks/useFetch";
import getSetupMockColumn from "./SetupMockInterviewConfig";
import { ROUND_ID } from "../../constant/constant";
import { urlService } from "../../Utils/urlService";
import {
  CORE_ROUTE,
  MOCK_INTERVIEWS,
  ROUNDS,
} from "../../constant/apiEndpoints";
import { classes } from "./SetupMockInterview.styles";
import commonStyles from "../../common/commonStyles.module.scss";
import styles from "./SetupMockInterview.module.scss";
import ErrorMessageBox from "../../components/ErrorMessageBox";

const SetupMockInterviewContent = () => {
  const intl = useIntl();
  const isEdit = true;
  const { renderColumn } = useRenderColumn();
  const { getImage } = useContext(ThemeContext);
  const { navigateScreen: navigate } = useNavigateScreen();
  const [userProfileDetails] = useContext(UserProfileContext);
  const currentlySelectedModuleKey =
    userProfileDetails?.selectedModuleItem?.key;

  const roundId = urlService.getQueryStringValue(ROUND_ID);
  const {
    data,
    error: errorWhileFetchingInterview,
    isLoading: isGettingInterview,
    fetchData,
  } = useFetch({
    url:
      CORE_ROUTE +
      `/${currentlySelectedModuleKey}` +
      ROUNDS +
      `/${roundId}` +
      MOCK_INTERVIEWS,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const goToConfigureInterview = (rowData, isEdit) => {
    const centreId = rowData?.id;
    navigate(
      `interviewDetails/${centreId}?roundId=${roundId}&mode=${
        isEdit ? "edit" : "view"
      }`,
      false
    );
  };

  const columns = getSetupMockColumn(
    intl,
    isEdit,
    getImage,
    goToConfigureInterview,
    renderColumn
  );

  useEffect(() => {
    if (userProfileDetails?.selectedModuleItem?.key) {
      fetchData({});
    }
  }, [userProfileDetails?.selectedModuleItem?.key]);

  return (
    <TwoRow
      className={styles.mainContainer}
      topSection={
        <HeadingAndSubHeading
          customContainerStyles={styles.customContainerStyles}
          headingText={intl.formatMessage({
            id: "label.session.setupMockInterviews",
          })}
          subHeadingText={intl.formatMessage({
            id: "label.warning.setupMockInterviews",
          })}
        />
      }
      bottomSection={
        isGettingInterview ? (
          <div className={commonStyles.errorContainer}>
            <CustomLoader />
          </div>
        ) : errorWhileFetchingInterview ? (
          <div className={commonStyles.errorContainer}>
            <ErrorMessageBox
              onRetry={() => fetchData({})}
              errorText={errorWhileFetchingInterview?.data?.message}
              errorHeading={intl.formatMessage({ id: "label.error" })}
            />
          </div>
        ) : (
          <DataTable
            {...{
              columns,
            }}
            hidePagination={true}
            customContainerStyles={styles.tableContainer}
            originalData={data}
          />
        )
      }
      bottomSectionStyle={classes.bottomSectionStyle}
    />
  );
};
export default SetupMockInterviewContent;
