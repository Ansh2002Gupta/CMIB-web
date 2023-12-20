import React from 'react';
import PropTypes from 'prop-types';
import { Button, Image, Typography } from 'antd';

import styles from './CustomButton.module.scss';

const CustomButton = ({
  btnText,
  customStyle,
  iconStyles,
  iconUrl,
  isBtnDisable,
  loading,
  onClick,
  type,
  textStyle,
}) => {
  return (
    <div>
      <Button
        icon={
          iconUrl ? (
            <Image src={iconUrl} className={iconStyles} preview={false} />
          ) : null
        }
        className={[styles.btn, customStyle].join(' ')}
        disabled={isBtnDisable}
        {...{ onClick, loading }}
        htmlType={type}
        block
      >
        {textStyle ? (
          <Typography className={textStyle}>{btnText}</Typography>
        ) : (
          btnText
        )}
      </Button>
    </div>
  );
};

CustomButton.defaultProps = {
  btnText: '',
  customStyle: '',
  iconStyles: '',
  iconUrl: '',
  isBtnDisable: false,
  loading: false,
  onClick: () => {},
  type: '',
  textStyle: '',
};

CustomButton.propTypes = {
  btnText: PropTypes.string,
  customStyle: PropTypes.string,
  iconStyles: PropTypes.string,
  iconUrl: PropTypes.string,
  isBtnDisable: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.string,
  textStyle: PropTypes.string,
};

export default CustomButton;
