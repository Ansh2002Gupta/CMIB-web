import React from 'react'
import PropTypes from 'prop-types'
import { Column, Row } from '../../components'
import Styles from './base.module.scss'

function Base({ className, style, children }) {
  return (
    <div
      className={`${Styles.baseLayout} ${className}`}
      style={style}
    >
      {
        typeof children === 'function'
        ? children({ Row, Column })
        : children
      }
    </div>
  )
}

Base.defaultProps = {
  className: '',
  style: {},
}

Base.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ]).isRequired,
}

export default Base
