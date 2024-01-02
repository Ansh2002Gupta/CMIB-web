import React from "react";
import { useIntl } from "react-intl";
import { Switch, Typography } from "antd";

import CustomButton from "../../components/CustomButton";
import ContentHeader from "../ContentHeader";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import { ReactComponent as Edit } from "../../themes/base/assets/images/edit.svg";
import { FORM_STATES } from "../../constant/constant";
import { USERS } from "../../routes/routeNames";
import styles from "./UserDetailsHeader.module.scss";

const UserDetailsHeader = ({
  userData,
  isUpdatingUserData,
  updateUserDetails,
  currentFormState,
  userId,
}) => {
  const intl = useIntl();
  const { navigateScreen: navigate } = useNavigateScreen();

  const getHeaderText = () => {
    if (currentFormState === FORM_STATES.VIEW_ONLY) {
      return userData?.name;
    }
    if (currentFormState === FORM_STATES.EDITABLE) {
      return intl.formatMessage({ id: "label.editUserDetails" });
    }
    return intl.formatMessage({ id: "label.addNewUsers" });
  };

  const handleOnUserStatusChange = (value) => {
    updateUserDetails(userId, {
      status: value ? 1 : 0,
    });
  };

  return (
    <div className={styles.headerContainer}>
      <ContentHeader
        headerText={getHeaderText()}
        rightSection={
          <>
            {currentFormState === FORM_STATES.VIEW_ONLY ? (
              <div className={styles.activeSwitchAndBtnContainer}>
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
                <CustomButton
                  isBtnDisable={isUpdatingUserData}
                  btnText={intl.formatMessage({ id: "label.edit" })}
                  IconElement={Edit}
                  onClick={() =>
                    navigate(USERS + `/details/${userId}?mode=edit`)
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

export default UserDetailsHeader;
