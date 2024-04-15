import React, { useContext } from "react";
import { ThemeContext } from "core/providers/theme";
import { useIntl } from "react-intl";
import { Image, Typography } from "antd";

import { TwoColumn } from "../../core/layouts";

import styles from "./EditButton.module.scss";

const EditButton = ({ customEditStyle, onClick, disable, label }) => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);

  return (
    <TwoColumn
      onClick={!disable ? onClick : () => {}}
      className={[
        disable ? styles.disabledEditContainer : styles.editContainer,
        customEditStyle,
      ].join(" ")}
      leftSection={
        <Image
          src={getImage(disable ? "disableEdit" : "editDark")}
          className={styles.editIcon}
          preview={false}
        />
      }
      rightSection={
        <Typography className={disable ? styles.grayText : styles.blackText}>
          {label || intl.formatMessage({ id: "session.edit" })}
        </Typography>
      }
    />
  );
};

export default EditButton;
