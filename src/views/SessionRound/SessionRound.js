import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Typography } from "antd";

import { TwoRow } from "../../core/layouts";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useResponsive from "../../core/hooks/useResponsive";

import EditSessionRound from "../../containers/EditSessionRound";
import RoundCard from "../../containers/RoundCard";
import SessionRoundDetails from "../../containers/SessionRoundDetails";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { classes } from "./SessionRound.styles";
import styles from "./SessionRound.module.scss";

const SessionRound = ({ roundList, switchLabel }) => {
  const intl = useIntl();
  const responsive = useResponsive();
  const { navigateScreen: navigate } = useNavigateScreen();
  const [userProfileDetails] = useContext(UserProfileContext);
  const selectedModule = userProfileDetails?.selectedModuleItem;
  const [isEditable, setIsEditable] = useState(false);
  const [roundDetails, setRoundDetails ]= useState({});

  const handleOnClickEdit = (roundDetails) => {
      setRoundDetails(roundDetails);
      setIsEditable(true)
    }

  return (
    <TwoRow
      className={styles.mainContainer}
      topSection={
        isEditable ? (
          <EditSessionRound
            intl={intl}
            roundDetails={roundDetails}
            selectedModule={selectedModule}
            switchLabel={switchLabel}
          />
        ) : (
          <SessionRoundDetails
            intl={intl}
            onClickEdit={handleOnClickEdit}
            selectedModule={selectedModule}
          />
        )
      }
      bottomSection={
        <>
          {!isEditable && (
            <TwoRow
              topSectionStyle={classes.bottomContainer}
              topSection={
                <Typography className={styles.blackText}>
                  {intl.formatMessage({ id: "session.setUpRoundOne" })}
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
                          navigate(item.onClickNaviagtion);
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
