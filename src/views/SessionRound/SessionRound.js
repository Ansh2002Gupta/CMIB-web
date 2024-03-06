import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Typography } from "antd";

import { TwoRow } from "../../core/layouts";
import useFetch from "../../core/hooks/useFetch";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useResponsive from "../../core/hooks/useResponsive";

import CustomLoader from "../../components/CustomLoader";
import EditSessionRound from "../../containers/EditSessionRound";
import RoundCard from "../../containers/RoundCard";
import SessionRoundDetails from "../../containers/SessionRoundDetails";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { urlService } from "../../Utils/urlService";
import { ADMIN_ROUTE, ROUNDS } from "../../constant/apiEndpoints";
import { API_STATUS, FORM_STATES } from "../../constant/constant";
import { classes } from "./SessionRound.styles";
import styles from "./SessionRound.module.scss";

const SessionRound = ({
  roundId,
  roundList,
  roundNo,
  sessionData,
  switchLabel,
}) => {
  const intl = useIntl();
  const responsive = useResponsive();
  const { navigateScreen: navigate } = useNavigateScreen();
  const [userProfileDetails] = useContext(UserProfileContext);
  const selectedModule = userProfileDetails?.selectedModuleItem;
  const [currentMode, setCurrentMode] = useState(
    urlService.getQueryStringValue("mode") || FORM_STATES.VIEW_ONLY
  );

  const {
    apiStatus,
    data: roundDetails,
    fetchData,
  } = useFetch({
    url: ADMIN_ROUTE + `/${selectedModule?.key}` + ROUNDS + `/${roundId}`,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  useEffect(() => {
    if (selectedModule?.key && roundId) {
      fetchData({});
    }
  }, [selectedModule?.key, roundId]);

  useEffect(() => {
    if (urlService.getQueryStringValue("mode") !== currentMode) {
      setCurrentMode(urlService.getQueryStringValue("mode"));
    }
  }, [urlService.getQueryStringValue("mode")]);

  const handleOnClickEdit = () => {
    urlService.setQueryStringValue("mode", FORM_STATES.EDITABLE);
    setCurrentMode(FORM_STATES.EDITABLE);
  };

  const handelOnClickCancel = (value) => {
    if (value) {
      fetchData({});
    }
    urlService.setQueryStringValue("mode", FORM_STATES.VIEW_ONLY);
    setCurrentMode(FORM_STATES.VIEW_ONLY);
  };

  return (
    <TwoRow
      className={styles.mainContainer}
      topSection={
        <>
          {apiStatus === API_STATUS.IDLE ||
            (apiStatus === API_STATUS.LOADING && <CustomLoader />)}

          {apiStatus === API_STATUS.SUCCESS &&
            roundDetails &&
            currentMode === FORM_STATES.EDITABLE && (
              <EditSessionRound
                intl={intl}
                onClickCancel={handelOnClickCancel}
                roundDetails={roundDetails}
                selectedModule={selectedModule}
                sessionData={sessionData}
                switchLabel={switchLabel}
              />
            )}

          {apiStatus === API_STATUS.SUCCESS &&
            roundDetails &&
            currentMode === FORM_STATES.VIEW_ONLY && (
              <SessionRoundDetails
                intl={intl}
                onClickEdit={handleOnClickEdit}
                roundDetails={roundDetails}
                roundNo={roundNo}
                sessionData={sessionData}
              />
            )}
        </>
      }
      bottomSection={
        <>
          {currentMode == FORM_STATES.VIEW_ONLY && (
            <TwoRow
              topSectionStyle={classes.bottomContainer}
              topSection={
                <Typography className={styles.blackText}>
                  {intl.formatMessage({
                    id:
                      roundNo === 1
                        ? "session.setUpRoundOne"
                        : "session.setUpRoundTwo",
                  })}
                </Typography>
              }
              bottomSection={
                <div className={styles.gridClass}>
                  {roundList.map((item) => {
                    return (
                      <RoundCard
                        key={item.id}
                        headingDescription={item.headingDescription}
                        headingIntl={item.headingIntl}
                        imageUrl={item.imageUrl}
                        onClick={() => {
                          navigate(
                            `${item.onClickNaviagtion}?roundId=${roundId}`
                          );
                        }}
                      />
                    );
                  })}
                </div>
              }
            />
          )}
        </>
      }
      bottomSectionStyle={
        responsive?.isXl
          ? classes.bottomSectionStyle
          : classes.mobileBottomSectionStyle
      }
    />
  );
};

SessionRound.defaultProps = {
  roundList: [],
  switchLabel: "",
};

SessionRound.propTypes = {
  roundList: PropTypes.array,
  switchLabel: PropTypes.string,
};

export default SessionRound;
