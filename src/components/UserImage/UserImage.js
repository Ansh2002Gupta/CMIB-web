import React, { useContext } from "react";
import { useIntl } from "react-intl";
import PropTypes from "prop-types";
import { Image, Typography } from "antd";

import { ReactComponent as Trash } from "../../themes/base/assets/images/trash.svg";
import styles from "./UserImage.module.scss";

const UserImage = ({ src, customImageStyles, imageName, onTrashClick }) => {
  const intl = useIntl();

  return (
    <div className={[styles.container].join(" ")}>
      <Image
        src={src ? src : getImage("dummyPerson")}
        className={[styles.userImage, customImageStyles].join(" ")}
      />
      <div className={styles.trashAndIconContainer}>
        <Typography className={styles.text}>
          {imageName ? imageName : intl.formatMessage({ id: "label.photo" })}
        </Typography>
        {editable && (
          <Trash className={styles.trashIcon} onClick={onTrashClick} />
        )}
      </div>
    </div>
  );
};

UserImage.defaultProps = {
  customImageStyles: "",
  imageName: "",
  onTrashClick: () => {},
  src: "",
};

UserImage.propTypes = {
  customImageStyles: PropTypes.string,
  imageName: PropTypes.string,
  onTrashClick: PropTypes.func,
  src: PropTypes.string,
};

export default UserImage;
