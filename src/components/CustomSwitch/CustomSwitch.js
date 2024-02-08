import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Typography, Switch } from "antd";

import { TwoRow, TwoColumn } from "../../core/layouts";
import useResponsive from "core/hooks/useResponsive";

import { classes } from "./CustomSwitch.styles";
import styles from "./CustomSwitch.module.scss";

const CustomSwitch = ({
  activeText,
  checked,
  customStyle,
  disabled,
  inActiveText,
  isRequired,
  label,
  onChange,
}) => {
  const intl = useIntl();
  const responsive = useResponsive();

  return (
    <TwoRow
      className={[styles.mainContainer, customStyle].join(" ")}
      topSection={
        <Typography className={styles.grayText}>
          {label} {isRequired && <span className={styles.isRequired}>*</span>}
        </Typography>
      }
      bottomSection={
        responsive.isMd ? (
          <TwoColumn
            className={styles.statusContainer}
            leftSection={
              <Switch
                {...{ checked, onChange, disabled }}
                style={checked && classes.switchContainer}
              />
            }
            rightSection={
              <Typography className={styles.blackText}>
                {intl.formatMessage({
                  id: `label.${checked ? activeText : inActiveText}`,
                })}
              </Typography>
            }
          />
        ) : (
          <TwoRow
            className={styles.mobileContainer}
            topSection={
              <Switch
                {...{ checked, onChange, disabled }}
                style={checked && classes.switchContainer}
              />
            }
            bottomSection={
              <Typography className={styles.blackText}>
                {intl.formatMessage({
                  id: `label.${checked ? activeText : inActiveText}`,
                })}
              </Typography>
            }
          />
        )
      }
    />
  );
};

CustomSwitch.defaultProps = {
  activeText: "",
  checked: false,
  customStyle: "",
  disabled: false,
  inActiveText: "",
  isRequired: false,
  label: "",
  onChange: () => {},
};

CustomSwitch.propTypes = {
  activeText: PropTypes.string,
  checked: PropTypes.bool,
  customStyle: PropTypes.string,
  disabled: PropTypes.bool,
  inActiveText: PropTypes.string,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
};

export default CustomSwitch;
