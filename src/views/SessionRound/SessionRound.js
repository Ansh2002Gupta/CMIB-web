import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { ThemeContext } from "../../core/providers/theme";
import { Typography } from "antd";

import { TwoRow } from "../../core/layouts";
import useFetch from "../../core/hooks/useFetch";
import useResponsive from "../../core/hooks/useResponsive";

import CustomLoader from "../../components/CustomLoader";
import CustomModal from "../../components/CustomModal/CustomModal";
import EditSessionRound from "../../containers/EditSessionRound";
import RoundCard from "../../containers/RoundCard";
import SessionRoundDetails from "../../containers/SessionRoundDetails";
import { GlobalSessionContext } from "../../globalContext/globalSession/globalSessionProvider";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import {
  setRoundOneCenters,
  setRoundTwoCenters,
} from "../../globalContext/RoundDetails/roundDetailsActions";
import { RoundDetailsContext } from "../../globalContext/RoundDetails/roundDetailsProvider";
import { urlService } from "../../Utils/urlService";
import { ADMIN_ROUTE, ROUNDS } from "../../constant/apiEndpoints";
import { API_STATUS, FORM_STATES, MODULE_KEYS } from "../../constant/constant";
import { classes } from "./SessionRound.styles";
import styles from "./SessionRound.module.scss";

const SessionRound = ({
  currentlySelectedModuleKey,
  roundId,
  roundList,
  roundNo,
  sessionData,
  switchLabel,
}) => {
  const intl = useIntl();
  const responsive = useResponsive();
  const navigate = useNavigate();
  const [userProfileDetails] = useContext(UserProfileContext);
  const [globalSessionDetails] = useContext(GlobalSessionContext);
  const currentGlobalSession = globalSessionDetails?.globalSessionList?.find(
    (item) => item.id === globalSessionDetails?.globalSessionId
  );
  const { getImage } = useContext(ThemeContext);
  const selectedModule = userProfileDetails?.selectedModuleItem;
  const [currentMode, setCurrentMode] = useState(
    urlService.getQueryStringValue("mode") || FORM_STATES.VIEW_ONLY
  );
  const [, setRoundDetailsDispatch] = useContext(RoundDetailsContext);
  const [showNoCentreSelectedAlert, setShowNoCentreSelectedAlert] =
    useState(false);

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
      fetchData({
        onSuccessCallback: (data) => {
          if (roundNo === 1) {
            setRoundDetailsDispatch(setRoundOneCenters(data?.centres));
          } else {
            setRoundDetailsDispatch(setRoundTwoCenters(data?.centres));
          }
        },
      });
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

  useEffect(() => {
    if (!currentGlobalSession?.is_editable) {
      urlService.setQueryStringValue("mode", FORM_STATES.VIEW_ONLY);
    }
  }, [globalSessionDetails]);

  const toggleShowErrorMsg = () => {
    setShowNoCentreSelectedAlert((prev) => !prev);
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
                currentGlobalSession={currentGlobalSession}
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
          <CustomModal
            btnText={intl.formatMessage({
              id: "label.okay",
            })}
            headingText={intl.formatMessage({
              id: "label.no_centres_selected",
            })}
            isOpen={showNoCentreSelectedAlert}
            onBtnClick={toggleShowErrorMsg}
            subHeadingText={intl.formatMessage({
              id: "label.no_centres_selected_msg",
            })}
            imgElement={getImage("errorIcon")}
            customButtonStyle={styles.customButtonStyle}
          />
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
                      !(
                        currentlySelectedModuleKey !==
                          MODULE_KEYS?.NEWLY_QUALIFIED_PLACEMENTS_KEY &&
                        (item.id === 2 || item.id === 3)
                      ) && (
                        <RoundCard
                          key={item.id}
                          headingDescription={item.headingDescription}
                          headingIntl={item.headingIntl}
                          imageUrl={item.imageUrl}
                          onClick={() => {
                            if (roundDetails?.centres?.length) {
                              navigate(
                                `${item.onClickNavigation}?roundId=${roundId}`
                              );
                            } else {
                              toggleShowErrorMsg();
                            }
                          }}
                        />
                      )
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
  roundId: PropTypes.string,
  roundNo: PropTypes.number,
  roundList: PropTypes.array,
  sessionData: PropTypes.object,
  switchLabel: PropTypes.string,
};

export default SessionRound;
