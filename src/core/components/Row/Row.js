import React from 'react';
import PropTypes from 'prop-types';
import Styles from './row.module.scss';

function Row({ className, style, children, isFillSpace }) {
  let _className = className;
  if (isFillSpace) {
    _className = `${_className} ${Styles.fillSpace}`;
  }
  
  return (
    <div
      className={`${Styles.row} ${_className}`}
      style={style}
    >
      {children}
    </div>
  )
}

Row.defaultProps = {
  className: '',
  style: {},
  isFillSpace: false,
}

Row.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  isFillSpace: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default Row
