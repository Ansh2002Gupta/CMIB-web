import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { Descriptions, Typography } from "antd";

import Base from "../../core/layouts/Base/Base";
import CheckBoxList from "../CheckBoxList";
import Chip from "../../components/Chip/Chip";
import CustomDateTimePicker from "../../components/CustomDateTimePicker/CustomDateTimePicker";
import CustomInput from "../../components/CustomInput";
import CustomSwitch from "../../components/CustomSwitch/CustomSwitch";
import PhoneInput from "../../components/PhoneInput/PhoneInput";
import { formatDate } from "../../constant/utils";
import useResponsive from "../../core/hooks/useResponsive";
import styles from "./UserInfo.module.scss";
import "./Override.css";

const UserInfo = ({
  access,
  countryData,
  checkForCorrectEmail,
  checkForMobileNumber,
  checkForUserName,
  date,
  email,
  emailErrorMessage,
  isDateDisable,
  isEditable,
  isNotAddable,
  is_two_factor,
  mobileErrorMessage,
  mobileNo,
  mobilePrefix,
  name,
  permissions,
  roles,
  rolesData,
  status,
  setIsAccessValid,
  shouldShowDatePickerOption,
  updateUserData,
  userNameErrorMessage,
  emailRef,
  phoneRef,
  nameRef,
  viewUserData,
}) => {
  const intl = useIntl();
  const responsive = useResponsive();

  const getValuesInChips = (arrayOfValues) => {
    if (Object.entries(arrayOfValues).length > 0) {
      return (
        <div className={styles.chipsContainer}>
          {Object.entries(arrayOfValues)?.map(([key, value]) => {
            return (
              <Chip
                key={key}
                bgStyles={styles.chipBg}
                label={value.name}
                textStyles={styles.chipText}
              />
            );
          })}
        </div>
      );
    }

    return null;
  };

  const getTextWithIsRequiredStart = (text) => {
    return (
      <Typography className={styles.desrciptionText}>
        {text} <span className={styles.isRequired}>*</span>
      </Typography>
    );
  };

  let items = [
    {
      key: "1",
      label: getTextWithIsRequiredStart(
        intl.formatMessage({ id: "label.userName2" })
      ),
      children: name,
    },
    {
      key: "2",
      label: getTextWithIsRequiredStart(
        intl.formatMessage({ id: "label.email" })
      ),
      children: email,
    },
    {
      key: "3",
      label: getTextWithIsRequiredStart(
        intl.formatMessage({ id: "label.mobileNumber" })
      ),
      span: responsive.isMd ? 1 : 2,
      children: `${mobilePrefix}-${mobileNo}`,
    },
    {
      key: "4",
      label: getTextWithIsRequiredStart(
        intl.formatMessage({ id: "label.status" })
      ),
      children: intl.formatMessage({
        id: `label.${status ? "active" : "inactive"}`,
      }),
    },
    {
      key: "5",
      label: getTextWithIsRequiredStart(
        intl.formatMessage({ id: "label.twoFactorAuth" })
      ),
      children: intl.formatMessage({
        id: `label.${is_two_factor ? "enabled" : "disabled"}`,
      }),
    },
    {
      key: "6",
      label: (
        <Typography className={styles.desrciptionText}>
          {intl.formatMessage({ id: "label.dateCreatedOn" })}
        </Typography>
      ),
      children: formatDate({ date }),
    },
  ];
  let item2 = [
    {
      key: "7",
      label: getTextWithIsRequiredStart(
        intl.formatMessage({ id: "label.access" })
      ),
      span: 3,
      children:
        getValuesInChips(roles) || intl.formatMessage({ id: "label.none" }),
    },
  ];
  let item3 = [
    {
      key: "8",
      label: getTextWithIsRequiredStart(
        intl.formatMessage({ id: "label.controlAccessHeading" })
      ),
      span: 3,
      children: getValuesInChips(permissions),
    },
  ];

  item3 = item3?.filter((val) => val.children);

  return (
    <>
      {!isEditable && (
        <div className={styles.nonEditableContainer}>
          <Descriptions
            className="viewUserDetails"
            colon={false}
            title={intl.formatMessage({ id: "label.userDetails" })}
            layout="vertical"
            items={items}
          />
          <Descriptions colon={false} layout="vertical" items={item2} />
          <Descriptions colon={false} layout="vertical" items={item3} />
        </div>
      )}
      {isEditable && (
        <Base className={styles.parentContainer}>
          <div>
            <Typography className={styles.heading}>
              {intl.formatMessage({ id: "label.userDetails" })}
            </Typography>
          </div>
          <div className={styles.container}>
            <div>
              <CustomInput
                type="text"
                label={intl.formatMessage({ id: "label.userName2" })}
                isError={!!userNameErrorMessage}
                errorMessage={userNameErrorMessage}
                isRequired
                value={name}
                disabled={!isEditable}
                customInputStyles={[styles.text, styles.input].join(" ")}
                customLabelStyles={styles.label}
                onChange={(e) => updateUserData("name", e.target.value)}
                placeholder={intl.formatMessage({
                  id: "label.userNamePlaceholder",
                })}
                onBlur={checkForUserName}
                ref={nameRef}
              />
            </div>
            <div>
              <CustomInput
                ref={emailRef}
                isError={!!emailErrorMessage}
                errorMessage={emailErrorMessage}
                type={"email"}
                label={intl.formatMessage({ id: "label.email" })}
                isRequired
                disabled={!isEditable}
                value={email}
                customInputStyles={[styles.text, styles.input].join(" ")}
                customLabelStyles={styles.label}
                onChange={(e) => updateUserData("email", e.target.value)}
                placeholder={intl.formatMessage({
                  id: "label.emailPlaceholder",
                })}
                onBlur={checkForCorrectEmail}
              />
            </div>
            <div>
              <PhoneInput
                ref={phoneRef}
                isError={!!mobileErrorMessage}
                errorMessage={mobileErrorMessage}
                label={intl.formatMessage({ id: "label.mobileNumber" })}
                isRequired
                value={mobileNo}
                mobilePrefix={mobilePrefix}
                disabled={!isEditable}
                customInputStyles={[styles.text, styles.input].join(" ")}
                customSelectInputStyles={[styles.selectInput].join(" ")}
                customLabelStyles={styles.label}
                onChange={(e) => {
                  updateUserData("mobile", e);
                }}
                selectOptions={countryData}
                defaultSelectValueString="+91"
                onSelectItem={(e) =>
                  updateUserData("mobile_prefix", e.target.value)
                }
                placeholder={intl.formatMessage({
                  id: "label.mobilePlaceholder",
                })}
                onBlur={checkForMobileNumber}
              />
            </div>
            {isNotAddable && (
              <div className={styles.twoFactorContainer}>
                <CustomSwitch
                  checked={status}
                  isRequired={true}
                  isEditable={isNotAddable}
                  label={intl.formatMessage({ id: "label.status" })}
                  onChange={() => {
                    updateUserData("status", !status);
                  }}
                  activeText={"active"}
                  inActiveText={"inactive"}
                />
              </div>
            )}
            <div className={styles.twoFactorContainer}>
              <CustomSwitch
                checked={is_two_factor}
                isRequired={true}
                label={intl.formatMessage({ id: "label.twoFactorAuth" })}
                onChange={() => {
                  updateUserData("is_two_factor", !is_two_factor);
                }}
                activeText={"enable"}
                inActiveText={"disable"}
              />
            </div>
            {isNotAddable && date && (
              <CustomDateTimePicker
                customLabelStyles={styles.label}
                customTimeStyle={[styles.text, styles.input].join(" ")}
                customContainerStyles={styles.twoFactorContainer}
                isRequired
                label={intl.formatMessage({ id: "label.dateCreatedOn" })}
                onChange={(date, dateString) =>
                  updateUserData("date", dateString)
                }
                placeholder={intl.formatMessage({
                  id: "centre.placeholder.selectDate",
                })}
                type="date"
                value={date}
                isEditable={!shouldShowDatePickerOption}
              />
            )}

            <div className={styles.spanOverAllColumns}>
              <CheckBoxList
                {...{ setIsAccessValid, rolesData }}
                selectedModules={
                  Array.isArray(roles)
                    ? roles
                    : Object.values(roles).map((role) => role.id)
                }
                setSelectedModules={(value) => updateUserData("roles", value)}
                selectedControls={
                  Array.isArray(permissions)
                    ? permissions
                    : Object.values(permissions).map((per) => per.id)
                }
                setSelectedControls={(value) => {
                  updateUserData("permissions", value);
                }}
              />
            </div>
          </div>
        </Base>
      )}
    </>
  );
};

UserInfo.defaultProps = {
  countryData: [],
  date: null,
  email: "",
  isEditable: false,
  isNotAddable: false,
  is_two_factor: false,
  mobileNo: "",
  mobilePrefix: "",
  name: "",
  permissions: [],
  setIsAccessValid: () => {},
  shouldShowDatePickerOption: true,
  updateUserData: () => {},
  userNameErrorMessage: "",
};

UserInfo.propTypes = {
  countryData: PropTypes.array,
  date: PropTypes.string,
  email: PropTypes.string,
  isEditable: PropTypes.bool,
  isNotAddable: PropTypes.bool,
  is_two_factor: PropTypes.bool,
  mobileNo: PropTypes.string,
  mobilePrefix: PropTypes.string,
  name: PropTypes.string,
  permissions: PropTypes.array,
  setIsAccessValid: () => {},
  shouldShowDatePickerOption: PropTypes.bool,
  updateUserData: PropTypes.func,
  userNameErrorMessage: PropTypes.string,
};

export default UserInfo;
