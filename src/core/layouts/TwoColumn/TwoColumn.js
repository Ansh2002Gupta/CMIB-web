import React from 'react'
import PropTypes from 'prop-types'
import BaseLayout from 'core/layouts/Base'
import Styles from './twoColumn.module.scss'

function TwoColumn({ className, style, leftSectionStyle, rightSectionStyle, leftSection, rightSection, isLeftFillSpace, isRightFillSpace }) {
  return (
    <BaseLayout
      className={`${Styles['two-column-layout']} ${className}`}
      style={style}
    >
      {
        ({ Row, Column }) => (
          <>
            <Column isFillSpace={isLeftFillSpace} style={leftSectionStyle} className={`${Styles['left-section-container']}`}>
              {leftSection}
            </Column>
            <Column isFillSpace={isRightFillSpace} style={rightSectionStyle} className={`${Styles['right-section-container']}`}>
              {rightSection}
            </Column>
          </>
        )
      }
    </BaseLayout>
  )
}

TwoColumn.defaultProps = {
  className: '',
  style: {},
  leftSectionStyle: {},
  rightSectionStyle: {},
  isLeftFillSpace: false,
  isRightFillSpace: false
}

TwoColumn.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  leftSectionStyle: PropTypes.object,
  rightSectionStyle: PropTypes.object,
  leftSection: PropTypes.node.isRequired,
  rightSection: PropTypes.node.isRequired,
  isLeftFillSpace: PropTypes.bool,
  isRightFillSpace: PropTypes.bool,
}

export default TwoColumn
