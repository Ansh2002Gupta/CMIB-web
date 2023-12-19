import PropTypes from "prop-types";
import moment from "moment";
import { DatePicker, Typography, Descriptions } from "antd";

import Base from "../../core/layouts/Base/Base";

import CustomInput from "../../components/CustomInput";
import { useIntl } from "react-intl";
import styles from "./UserInfo.module.scss";
import "./Override.css";

const UserInfo = ({
  access,
  accessOptions,
  date,
  email,
  isDateDisable,
  isEditable,
  mobileNo,
  name,
  updateUserData,
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
      children: mobileNo,
    },
    {
      key: "4",
      label: `${intl.formatMessage({ id: "label.access" })} *`,
      children: access,
    },
    {
      key: "5",
      label: `${intl.formatMessage({ id: "label.dateCreatedOn" })} *`,
      children: date,
    },
  ];

  return (
    <>
      {!isEditable && (
        <div className={styles.nonEditableContainer}>
          <Descriptions title="User Details" layout="vertical" items={items} />
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
                type={"text"}
                label={intl.formatMessage({ id: "label.userName2" })}
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
                  {
                    value: "135",
                    label: "+135",
                  },
                  {
                    value: "1",
                    label: "+1",
                  },
                ]}
                defaultSelectValue="+91"
                onSelectItem={(e) =>
                  updateUserData("mobile_prefix", e.target.value)
                }
              />
            </div>
            <div>
              <CustomInput
                type="select"
                isMultiSelect
                onSelectItem={(e) => updateUserData("access", e.target.value)}
                defaultSelectValue={access}
                label={intl.formatMessage({ id: "label.access" })}
                isRequired
                disabled={!isEditable}
                selectOptions={[
                  {
                    value: "All",
                    label: "All",
                  },
                  {
                    value: "Placements",
                    label: "Placements",
                  },
                  {
                    value: "CA jobs",
                    label: "CA jobs",
                  },
                ]}
                customSelectInputStyles={[
                  styles.text,
                  styles.input,
                  styles.selectInput,
                ].join(" ")}
                customLabelStyles={styles.label}
              />
            </div>
            <div className={styles.dateContainer}>
              <Typography className={styles.label}>
                {intl.formatMessage({ id: "label.dateCreatedOn" })}
              </Typography>
              <DatePicker
                onChange={(date, dateString) =>
                  updateUserData("date", dateString)
                }
                className={[styles.text, styles.input].join(" ")}
                // Fixed the below
                defaultValue={moment(date)}
                disabled={isDateDisable || !isEditable}
                customInputStyles={[styles.text, styles.input].join(" ")}
                customLabelStyles={styles.label}
              />
            </div>
          </div>
        </Base>
      )}
    </>
  );
};

UserInfo.defaultProps = {
  access: "",
  accessOptions: [],
  date: null,
  email: "",
  isDateDisable: false,
  isEditable: false,
  mobileNo: "",
  name: "",
  updateUserData: () => {},
};

UserInfo.propTypes = {
  access: PropTypes.string,
  accessOptions: PropTypes.array,
  date: PropTypes.string,
  email: PropTypes.string,
  isDateDisable: PropTypes.bool,
  isEditable: PropTypes.bool,
  mobileNo: PropTypes.string,
  name: PropTypes.string,
  updateUserData: PropTypes.func,
};

export default UserInfo;
