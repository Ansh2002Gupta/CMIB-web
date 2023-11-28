import React from 'react'
import PropTypes from 'prop-types'
import Styles from './column.module.scss';

function Column({ className, style, children, isFillSpace }) {
  let _className = className;
  if (isFillSpace) {
    _className = `${_className} ${Styles.fillSpace}`;
  }
  return (
    <div
      className={`${Styles.column} ${_className}`}
      style={style}
    >
      {children}
    </div>
  )
}

Column.defaultProps = {
  className: '',
  style: {},
  isFillSpace: false,
}

Column.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  isFillSpace: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default Column
