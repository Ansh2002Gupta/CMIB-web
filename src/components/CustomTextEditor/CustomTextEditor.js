import React from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import { useIntl } from "react-intl";
import "quill/dist/quill.snow.css";
import {
  ATTACHMENT_TYPE,
  COLOR,
  FORMAT,
  LIST_OPTION,
  LIST_TYPE,
  SIZE,
  TEXT_FORMATS,
} from "../../constant/constant";
import "./styles.css";
import styles from "./CustomTextEditor.style";
import { Typography } from "antd";

const CustomTextEditor = (props) => {
  const {
    customErrorStyle,
    customHandleBlur,
    customLabelStyle,
    disabled,
    errorMessage,
    isMandatory,
    label,
    onChangeText,
    value,
    quilStyle,
    quillContainerStyle,
  } = props;

  const modules = {
    toolbar: [
      [{ size: SIZE }],
      TEXT_FORMATS,
      LIST_TYPE,
      ATTACHMENT_TYPE,
      LIST_OPTION,
      [{ color: COLOR }],
    ],
  };
  const intl = useIntl();

  const handleProcedureContentChange = (content) => {
    onChangeText && onChangeText(content);
  };
  const getTextEditorStyles = () => {
    if (!!errorMessage) {
      return "error";
    } else if (disabled) {
      return "disabled";
    }
    return "";
  };

  return (
    <div style={styles.mainContainer}>
      <div style={styles.labelContainer}>
        <Typography style={{ ...styles.label, ...customLabelStyle }}>
          {label}
        </Typography>
        {isMandatory && (
          <Typography style={{ ...styles.label, ...styles.starStyle }}>
            {"*"}
          </Typography>
        )}
      </div>
      <div style={{ ...styles.quillContainer, ...quillContainerStyle }}>
        <ReactQuill
          theme="snow"
          value={value}
          className={getTextEditorStyles()}
          modules={modules}
          onBlur={customHandleBlur}
          formats={FORMAT}
          placeholder={intl.formatMessage({ id: "label.description" })}
          onChange={handleProcedureContentChange}
          style={{ ...styles.quillStyling, ...quilStyle }}
          readOnly={disabled}
        />
      </div>
      {!!errorMessage && (
        <Typography style={[styles.errorMsg, customErrorStyle]}>
          {errorMessage}
        </Typography>
      )}
    </div>
  );
};

CustomTextEditor.defaultProps = {
  customLabelStyle: {},
  isMandatory: false,
  label: "",
  disabled: false,
  quillContainerStyle: {},
  quilStyle: {},
};

CustomTextEditor.propTypes = {
  customErrorStyle: PropTypes.object,
  customHandleBlur: PropTypes.func,
  customLabelStyle: PropTypes.object,
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  isMandatory: PropTypes.bool,
  label: PropTypes.string,
  onChangeText: PropTypes.func,
  value: PropTypes.string,
  quilStyle: PropTypes.object,
  quillContainerStyle: PropTypes.object,
};

export default CustomTextEditor;
