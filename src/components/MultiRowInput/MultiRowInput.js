import React, { useContext } from "react";
import { Image, Typography } from "antd";
import PropTypes from "prop-types";

import CustomInput from "../CustomInput/CustomInput";
import { ThemeContext } from "core/providers/theme";
import styles from "./MultiRowInput.module.scss";

const MultiRowInput = ({
  currentFieldState,
  headerText,
  onChange,
  onClick,
  placeholderText,
}) => {
  const { getImage } = useContext(ThemeContext);

  return (
    <div className={styles.outerContainerFlexCol}>
      <Typography className={styles.headerText}>{headerText}</Typography>
      {!!currentFieldState?.length &&
        currentFieldState?.map((field) => {
          return (
            <div key={field?.id} className={styles.innerContainerFlexRow}>
              <CustomInput
                value={field?.fieldValue}
                type="text"
                controls={true}
                onChange={(e) => onChange(e?.target?.value, field?.id)}
                customContainerStyles={styles.customInputOuterContainer}
                placeholder={placeholderText}
              />
              <Image
                className={styles.imageStyle}
                src={
                  field?.buttonType?.trim()?.toLowerCase() === "add"
                    ? getImage("addCircle")
                    : getImage("minusCircle")
                }
                alt="add/remove"
                preview={false}
                onClick={() =>
                  onClick(field?.buttonType?.trim()?.toLowerCase(), field?.id)
                }
              />
            </div>
          );
        })}
    </div>
  );
};

MultiRowInput.defaultProps = {
  currentFieldState: [],
  setCurrentFieldState: () => {},
  onChange: () => {},
  onClick: () => {},
};

MultiRowInput.propTypes = {
  currentFieldState: PropTypes.array,
  setCurrentFieldState: PropTypes.func,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
};

export default MultiRowInput;
