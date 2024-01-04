import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Image, InputNumber } from "antd";
import moment from "moment";
import { ThemeContext } from "core/providers/theme";

import CustomDateTimePicker from "../../components/CustomDateTimePicker";
import CustomInput from "../../components/CustomInput/CustomInput";
import styles from "./CentreTableForm.module.scss";

const CentreTableForm = ({ tableData, setTableData }) => {
  const { getImage } = useContext(ThemeContext);

  return (
    <div className={styles.mainContainer}>
      <CustomDateTimePicker type="date" value={moment()} />
      <CustomInput customContainerStyles={styles.customContainerStyles} />
      <CustomInput customContainerStyles={styles.customContainerStyles} />
      <InputNumber />
      <CustomInput customContainerStyles={styles.customContainerStyles} />
      <CustomInput customContainerStyles={styles.customContainerStyles} />
      <CustomInput customContainerStyles={styles.customContainerStyles} />
      <Image
        src={getImage("addCircle")}
        alt="add"
        className={styles.imageStyle}
        style={{ height: "25px", width: "25px" }}
      />
    </div>
  );
};

CentreTableForm.defaultProps = {
  tableData: [],
  setTableData: () => {},
};

CentreTableForm.propTypes = {
  tableData: PropTypes.object,
  setTableData: PropTypes.func,
};

export default CentreTableForm;
