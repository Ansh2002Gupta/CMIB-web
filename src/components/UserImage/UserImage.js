import React, { useContext } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { ThemeContext } from "core/providers/theme";
import { Image, Typography } from "antd";

import { ReactComponent as Trash } from "../../themes/base/assets/images/trash.svg";
import styles from "./UserImage.module.scss";

const UserImage = ({
  customImageStyles,
  editable,
  imageName,
  onTrashClick,
  src,
}) => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);

  return (
    <div className={[styles.container].join(" ")}>
      <Image
        src={src ? src : getImage("dummyPerson")}
        className={[styles.userImage, customImageStyles].join(" ")}
      />
      {editable && (
        <Trash className={styles.trashIcon} onClick={onTrashClick} />
      )}
    </div>
  );
};

UserImage.defaultProps = {
  customImageStyles: "",
  editable: false,
  imageName: "",
  onTrashClick: () => {},
  src: "",
};

UserImage.propTypes = {
  customImageStyles: PropTypes.string,
  editable: PropTypes.bool,
  imageName: PropTypes.string,
  onTrashClick: PropTypes.func,
  src: PropTypes.string,
};

export default UserImage;
