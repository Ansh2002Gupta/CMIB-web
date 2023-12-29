import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import moment from "moment";
import { DatePicker, Typography, Descriptions, Switch } from "antd";

import Base from "../../core/layouts/Base/Base";

import CustomInput from "../../components/CustomInput";
import CustomMultiSelect from "../../components/CustomMultiSelect";
import { ADD_NEW_USER_ACCESS_OPTIONS } from "../../constant/constant";
import styles from "./UserInfo.module.scss";
import "./Override.css";

const UserInfo = ({
  access,
  date,
  email,
  isDateDisable,
  isEditable,
  mobileNo,
  mobilePrefix,
  name,
  emailErrorMessage,
  mobileErrorMessage,
  is_two_factor,
  shouldShowDatePickerOption,
  updateUserData,
  userAccessErrorMessage,
  userNameErrorMessage,
}) => {
  const intl = useIntl();

  const items = [
    {
      key: "1",
      label: `${intl.formatMessage({ id: "label.userName2" })} *`,
      children: name,
    },
    {
      key: "2",
      label: `${intl.formatMessage({ id: "label.email" })} *`,
      children: email,
    },
    {
      key: "3",
      label: `${intl.formatMessage({ id: "label.mobileNumber" })} *`,
      children: `+${mobilePrefix}-${mobileNo}`,
    },
    {
      key: "4",
      label: `${intl.formatMessage({ id: "label.access" })} *`,
      children: access,
    },
    {
      key: "5",
      label: `${intl.formatMessage({ id: "label.dateCreatedOn" })} *`,
      children: moment(date).format("DD/MM/YYYY"),
    },
    {
      key: "6",
      label: `${intl.formatMessage({ id: "label.twoFactorAuth" })} *`,
      children: intl.formatMessage({
        id: `label.${is_two_factor ? "on" : "off"}`,
      }),
    },
  ];

  return (
    <>
      {!isEditable && (
        <div className={styles.nonEditableContainer}>
          <Descriptions
            className={styles.description}
            title={intl.formatMessage({ id: "label.userDetails" })}
            layout="vertical"
            items={items}
          />
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
              />
            </div>
            <div>
              <CustomInput
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
              />
            </div>
            <div>
              <CustomInput
                isError={!!mobileErrorMessage}
                errorMessage={mobileErrorMessage}
                isSelectBoxDisable
                type="mobile"
                label={intl.formatMessage({ id: "label.mobileNumber" })}
                isRequired
                value={mobileNo}
                disabled={!isEditable}
                customInputStyles={[styles.text, styles.input].join(" ")}
                customSelectInputStyles={[styles.selectInput].join(" ")}
                customLabelStyles={styles.label}
                onChange={(e) => updateUserData("mobile", e.target.value)}
                selectOptions={[
                  {
                    value: "91",
                    label: "+91",
                  },
                ]}
                defaultSelectValueString="+91"
                onSelectItem={(e) =>
                  updateUserData("mobile_prefix", e.target.value)
                }
              />
            </div>
            <div className={styles.spanOverAllColumns}>
              <CustomMultiSelect
                optionsArray={ADD_NEW_USER_ACCESS_OPTIONS}
                selectedOptions={access}
                setSelectedOptions={(value) => updateUserData("access", value)}
              />
            </div>
            {shouldShowDatePickerOption && date && (
              <div className={styles.dateContainer}>
                <Typography className={styles.accessSelectLabel}>
                  {intl.formatMessage({ id: "label.dateCreatedOn" })}
                </Typography>
                <DatePicker
                  onChange={(date, dateString) =>
                    updateUserData("date", dateString)
                  }
                  className={[styles.text, styles.input].join(" ")}
                  defaultValue={moment(date)}
                  disabled={isDateDisable || !isEditable}
                  customInputStyles={[styles.text, styles.input].join(" ")}
                  customLabelStyles={styles.label}
                />
              </div>
            )}
            <div className={styles.twoFactorContainer}>
              <div className={styles.accessSelectLabelContainer}>
                <Typography className={styles.label}>
                  {intl.formatMessage({ id: "label.twoFactorAuth" })}
                </Typography>
              </div>
              <div className={styles.switchAndTextContainer}>
                <Switch
                  className={is_two_factor ? styles.active : ""}
                  defaultChecked={is_two_factor}
                  onChange={(value) => updateUserData("is_two_factor", value)}
                />
                <Typography>
                  {intl.formatMessage({
                    id: `label.${is_two_factor ? "on" : "off"}`,
                  })}
                </Typography>
              </div>
            </div>
          </div>
        </Base>
      )}
    </>
  );
};

UserInfo.defaultProps = {
  access: [],
  date: null,
  email: "",
  isDateDisable: false,
  isEditable: false,
  mobileNo: "",
  mobilePrefix: "",
  is_two_factor: false,
  name: "",
  shouldShowDatePickerOption: true,
  updateUserData: () => {},
  userAccessErrorMessage: "",
  userNameErrorMessage: "",
};

UserInfo.propTypes = {
  access: PropTypes.array,
  date: PropTypes.string,
  email: PropTypes.string,
  isDateDisable: PropTypes.bool,
  isEditable: PropTypes.bool,
  mobileNo: PropTypes.string,
  mobilePrefix: PropTypes.string,
  is_two_factor: PropTypes.bool,
  name: PropTypes.string,
  shouldShowDatePickerOption: PropTypes.bool,
  updateUserData: PropTypes.func,
  userAccessErrorMessage: PropTypes.string,
  userNameErrorMessage: PropTypes.string,
};

export default UserInfo;
