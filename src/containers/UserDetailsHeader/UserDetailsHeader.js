import React, { useContext } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { Switch, Typography } from "antd";

import ContentHeader from "../ContentHeader";
import CustomButton from "../../components/CustomButton";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { ReactComponent as Edit } from "../../themes/base/assets/images/editDark.svg";
import { FORM_STATES } from "../../constant/constant";
import { USERS } from "../../routes/routeNames";
import styles from "./UserDetailsHeader.module.scss";

const UserDetailsHeader = ({
  currentFormState,
  isUpdatingUserData,
  updateUserData,
  updateUserDetails,
  userData,
  userId,
  viewUserData,
}) => {
  const intl = useIntl();
  const { navigateScreen: navigate } = useNavigateScreen();
  const [userProfileDetails] = useContext(UserProfileContext);
  const selectedModule = userProfileDetails?.selectedModuleItem;

  const getHeaderText = () => {
    if (currentFormState === FORM_STATES.VIEW_ONLY) {
      return viewUserData?.name;
    }
    if (currentFormState === FORM_STATES.EDITABLE) {
      return intl.formatMessage({ id: "label.editUserDetails" });
    }
    return intl.formatMessage({ id: "label.addNewUsers" });
  };

  const handleOnUserStatusChange = (value) => {
    updateUserDetails(
      userId,
      {
        status: value ? 1 : 0,
      },
      () => {
        updateUserData("status", !userData?.status);
      }
    );
  };

  return (
    <div className={styles.headerContainer}>
      <ContentHeader
        headerText={getHeaderText()}
        rightSection={
          <>
            {currentFormState === FORM_STATES.VIEW_ONLY ? (
              <div className={styles.activeSwitchAndBtnContainer}>
                {currentFormState !== FORM_STATES.VIEW_ONLY && (
                  <div className={styles.switchAndTextContainer}>
                    <Switch
                      className={userData?.status ? styles.switchBgColor : ""}
                      onClick={handleOnUserStatusChange}
                      disabled={isUpdatingUserData}
                      checked={userData?.status}
                    />
                    <Typography className={styles.text}>
                      {intl.formatMessage({
                        id: `label.${userData?.status ? "active" : "inactive"}`,
                      })}
                    </Typography>
                  </div>
                )}
                <CustomButton
                  isBtnDisable={isUpdatingUserData}
                  btnText={intl.formatMessage({ id: "label.edit" })}
                  IconElement={Edit}
                  onClick={() =>
                    navigate(
                      `/${selectedModule.key}/${USERS}details/${userId}?mode=edit`,
                      true
                    )
                  }
                  iconStyles={styles.btnIconStyles}
                  customStyle={styles.btnCustomStyles}
                />
              </div>
            ) : null}
          </>
        }
      />
    </div>
  );
};

UserDetailsHeader.defaultProps = {
  currentFormState: "",
  isUpdatingUserData: false,
  updateUserData: () => {},
  updateUserDetails: () => {},
  userData: {},
  userId: "",
};

UserDetailsHeader.propTypes = {
  currentFormState: PropTypes.string,
  isUpdatingUserData: PropTypes.bool,
  updateUserData: PropTypes.func,
  updateUserDetails: PropTypes.func,
  userData: PropTypes.object,
  userId: PropTypes.string,
};

export default UserDetailsHeader;
