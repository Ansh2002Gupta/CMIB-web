import React from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Typography, Switch } from "antd";

import { TwoRow, TwoColumn } from "../../core/layouts";
import useResponsive from "core/hooks/useResponsive";

import { classes } from "./CustomSwitch.styles";
import styles from "./CustomSwitch.module.scss";

const CustomSwitch = ({ checked, customStyle, disabled, label, onChange }) => {
  const intl = useIntl();
  const responsive = useResponsive();

  return (
    <TwoRow
      className={[styles.mainContainer, customStyle].join(" ")}
      topSection={<Typography className={styles.grayText}>{label}</Typography>}
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
                  id: `label.${checked ? "active" : "inactive"}`,
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
                  id: `label.${checked ? "active" : "inactive"}`,
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
  checked: false,
  customStyle: {},
  disabled: false,
  label: "",
  onChange: () => {},
};

CustomSwitch.propTypes = {
  checked: PropTypes.bool,
  customStyle: PropTypes.object,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
};

export default CustomSwitch;
