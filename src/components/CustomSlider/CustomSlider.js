import React from 'react';
import PropTypes from 'prop-types';
import { Slider, Typography } from 'antd';
import styles from './CustomSlider.module.scss';
import { useIntl } from 'react-intl';

const CustomSlider = ({
  min,
  max,
  defaultValue,
  onChange,
  onAfterChange,
  range,
  valueLabel,
  trackStyle,
  handleStyle,
}) => {
    const intl = useIntl()
  return (
    <div style={{ margin: '16px' }}>
      {valueLabel && (
        <Typography className={styles.sliderLabel}>
          {range ? `${defaultValue[0]} - ${defaultValue[1]}` : defaultValue} {intl.formatMessage({ id: "label.years" })}
        </Typography>
      )}
      <Slider
        range={range}
        defaultValue={defaultValue}
        min={min}
        max={max}
        onChange={onChange}
        onAfterChange={onAfterChange}
        className={styles.range}
        trackStyle={trackStyle}
        handleStyle={handleStyle}
        value={range ? undefined : defaultValue}
      />
      <div className={styles.sliderMarks}>
        <Typography className={styles.sliderText}>
          {min} {intl.formatMessage({ id: "label.short.years" })}
        </Typography>
        <Typography className={styles.sliderText}>
          {max} {intl.formatMessage({ id: "label.short.years" })}
        </Typography>
      </div>
    </div>
  );
};

CustomSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  defaultValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  onAfterChange: PropTypes.func,
  range: PropTypes.bool,
  valueLabel: PropTypes.bool,
  trackStyle: PropTypes.object,
  handleStyle: PropTypes.arrayOf(PropTypes.object),
};

CustomSlider.defaultProps = {
  onAfterChange: () => {},
  range: false,
  valueLabel: true,
  trackStyle: { backgroundColor: '#04AF55' },
  handleStyle: [
    { backgroundColor: '#04AF55' },
    { backgroundColor: '#04AF55' },
  ],
};

export default CustomSlider;