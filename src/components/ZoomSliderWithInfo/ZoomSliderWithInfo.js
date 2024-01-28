import React from "react";
import PropTypes from "prop-types";
import { Image, Typography } from "antd";

import Slider from "../Slider";
import { ZOOM_CONSTANT } from "../../constant/constant";
import styles from "./ZoomSliderWithInfo.style";

const ZoomSliderWithInfo = ({ zoom, setZoom }) => {
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
    <div style={styles.zoomInfoContainer}>
      <div style={styles.sliderBox}>
        <Image
          // src={images.minusCirlce}
          alt="Zoom out"
          width={24}
          height={24}
          style={styles.zoomIcon}
          onClick={zoomOutHandler}
        />
        <div style={styles.zoomSlider}>
          <Slider
            maximumValue={ZOOM_CONSTANT.MAX_ZOOM}
            minimumValue={ZOOM_CONSTANT.MIN_ZOOM}
            onChange={setZoom}
            step={ZOOM_CONSTANT.ZOOM_STEP}
            value={+zoom}
          />
        </div>
        <Image
          // src={images.addCircle}
          alt="Zoom in"
          width={24}
          height={24}
          style={styles.zoomIcon}
          onClick={zoomInHandler}
        />
      </div>
      <Typography
        customTextStyle={styles.percentageText}
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
