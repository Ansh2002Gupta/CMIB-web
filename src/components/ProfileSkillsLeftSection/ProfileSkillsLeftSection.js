import React, { useState, useContext } from "react";
import { Image, Typography } from "antd";
import PropTypes from "prop-types";

import CustomInput from "../CustomInput/CustomInput";
import { ThemeContext } from "core/providers/theme";
import styles from "./ProfileSkillsLeftSection.module.scss";

const ProfileSkillsLeftSection = ({
  currentFieldState,
  setCurrentFieldState,
  onChange,
  onClick,
}) => {
  const { getImage } = useContext(ThemeContext);

  return (
    <div className={styles.outerContainerFlexCol}>
      <Typography className={styles.headerText}>IT Skills</Typography>
      {!!currentFieldState.length &&
        currentFieldState?.map((field) => {
          return (
            <div key={field?.index} className={styles.innerContainerFlexRow}>
              <CustomInput
                value={field?.fieldValue}
                type="text"
                controls={true}
                onChange={(e) =>
                  onChange(
                    e.target.value,
                    field?.index,
                    currentFieldState,
                    setCurrentFieldState
                  )
                }
                customContainerStyles={styles.customInputOuterContainer}
                placeholder={"Enter IT skill"}
              />
              <Image
                className={styles.imageStyle}
                src={
                  field?.buttonType.trim().toLowerCase() === "add"
                    ? getImage("addCircle")
                    : getImage("minusCircle")
                }
                alt="add/remove"
                preview={false}
                onClick={() =>
                  onClick(
                    field?.buttonType.trim().toLowerCase(),
                    field?.index,
                    currentFieldState,
                    setCurrentFieldState
                  )
                }
              />
            </div>
          );
        })}
    </div>
  );
};

ProfileSkillsLeftSection.defaultProps = {
  currentFieldState: [],
  setCurrentFieldState: () => {},
  onChange: () => {},
  onClick: () => {},
};

ProfileSkillsLeftSection.propTypes = {
  currentFieldState: PropTypes.array,
  setCurrentFieldState: PropTypes.func,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
};

export default ProfileSkillsLeftSection;
