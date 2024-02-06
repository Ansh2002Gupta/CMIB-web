import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Image, Typography } from "antd";

import { ThemeContext } from "core/providers/theme";

import Slider from "../Slider";
import { ZOOM_CONSTANT } from "../../constant/constant";
import styles from "./ZoomSliderWithInfo.module.scss";

const ZoomSliderWithInfo = ({ zoom, setZoom }) => {
  const { getImage } = useContext(ThemeContext);

  const zoomPercentage = Math.floor(
    ((zoom - ZOOM_CONSTANT.MIN_ZOOM) /
      (ZOOM_CONSTANT.MAX_ZOOM - ZOOM_CONSTANT.MIN_ZOOM)) *
      100
  );

  const zoomOutHandler = () => {
    if (zoom === ZOOM_CONSTANT.MIN_ZOOM) {
      return;
    }
    const decrement = +(zoom - ZOOM_CONSTANT.ZOOM_STEP).toFixed(1);
    setZoom(decrement);
  };

  const zoomInHandler = () => {
    if (zoom >= ZOOM_CONSTANT.MAX_ZOOM) {
      return;
    }
    const increment = +(zoom + ZOOM_CONSTANT.ZOOM_STEP).toFixed(1);
    setZoom(increment);
  };

  return (
    <div className={styles.zoomInfoContainer}>
      <div className={styles.sliderBox}>
        <Image
          src={getImage("minusCircleBlue")}
          alt="Zoom out"
          width={24}
          height={24}
          className={styles.zoomIcon}
          onClick={zoomOutHandler}
          preview={false}
        />
        <div className={styles.zoomSlider}>
          <Slider
            maximumValue={ZOOM_CONSTANT.MAX_ZOOM}
            minimumValue={ZOOM_CONSTANT.MIN_ZOOM}
            onChange={setZoom}
            step={ZOOM_CONSTANT.ZOOM_STEP}
            value={+zoom}
          />
        </div>
        <Image
          src={getImage("addCircleBlue")}
          alt="Zoom in"
          width={24}
          height={24}
          className={styles.zoomIcon}
          onClick={zoomInHandler}
          preview={false}
        />
      </div>
      <Typography
        className={styles.percentageText}
      >{`${zoomPercentage}%`}</Typography>
    </div>
  );
};

ZoomSliderWithInfo.defaultProps = {
  setZoom: () => {},
  zoom: 1,
};

ZoomSliderWithInfo.propTypes = {
  setZoom: PropTypes.func,
  zoom: PropTypes.number,
};

export default ZoomSliderWithInfo;
