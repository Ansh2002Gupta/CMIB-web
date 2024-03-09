import React, { useState } from "react";
import { Image, Typography } from "antd";

import { TwoRow } from "../../../src/core/layouts";
import useResponsive from "../../core/hooks/useResponsive";
import images from "../../themes/base/assets/images";
import styles from "./VideoUpload.module.scss";

const VideoUpload = () => {
  const responsive = useResponsive();
  const [value, setValue] = useState(0);
  return (
    <div className={styles.outerContainer}>
      <TwoRow
        topSection={
          <Typography className={styles.topSectionHeader}>
            Setup Maximum Video Upload Time Limit
          </Typography>
        }
        bottomSection={
          <div
            className={
              (styles.outerFlexColWrapper,
              responsive.isSm ? styles.width_350 : styles.width_200)
            }
          >
            <Typography className={styles.topSectionLabel}>
              Maximum Video Upload Time Limit
            </Typography>
            <div className={styles.inputNumberOuterContainer}>
              <div className={styles.inputNumberMainContainer}>
                {value < 0 ? 0 : value}s
              </div>
              <div className={styles.arrowContainer}>
                <Image
                  alt="up/down"
                  className={styles.imageStyle}
                  onClick={() => setValue(value - 1)}
                  preview={false}
                  src={images.blackArrowUp}
                />
                <Image
                  alt="up/down"
                  className={styles.imageStyle}
                  onClick={() => setValue(value + 1)}
                  preview={false}
                  src={images.blackArrowDown}
                />
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default VideoUpload;
