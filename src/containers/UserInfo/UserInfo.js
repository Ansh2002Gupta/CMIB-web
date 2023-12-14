import PropTypes from "prop-types";
import { DatePicker, Typography } from "antd";

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
  return (
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
            customInputStyles={[
              styles.text,
              styles.input,
            ].join(" ")}
            customSelectInputStyles={[styles.selectInput].join(" ")}
            customLabelStyles={styles.label}
            onChange={(e) => updateUserData("mobile", e.target.value)}
            selectOptions={[
              {
                value: "All",
                label: "All",
              },
              {
                value: "One",
                label: "One",
              },
              {
                value: "Two",
                label: "Two",
              },
            ]}
            defaultSelectValue="+91"
          />
        </div>
        <div>
          <CustomInput
            type="select"
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
           disabled
            onChange={(date, dateString) => updateUserData("date", dateString)}
            className={[styles.text, styles.input].join(" ")}
            // Fixed the below
            // defaultValue={moment("2023-12-11T17:15:30.000000Z").format(
            //   "DD/MM/YYYY"
            // )}
            format={"DD/MM/YYYY"}
            // disabled={!isDateDisable && isEditable}
            customInputStyles={[styles.text, styles.input].join(" ")}
            customLabelStyles={styles.label}
          />
        </div>
      </div>
    </Base>
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
