import React from 'react'
import PropTypes from 'prop-types'
import BaseLayout from 'core/layouts/Base'
import Styles from './twoRow.module.scss'

function TwoRow({ className, style, topSection, bottomSection, topSectionStyle, bottomSectionStyle, isTopFillSpace, isBottomFillSpace }) {
  return (
    <BaseLayout
      className={`${Styles['two-row-layout']} ${className}`}
      style={style}
    >
      {
        ({ Row }) => (
          <>
            <Row isFillSpace={isTopFillSpace} style={topSectionStyle} className={`${Styles['top-section-container']}`}>
              {topSection}
            </Row>
            <Row isFillSpace={isBottomFillSpace} style={bottomSectionStyle} className={`${Styles['bottom-section-container']}`}>
              {bottomSection}
            </Row>
          </>
        )
      }
    </BaseLayout>
  )
}

TwoRow.defaultProps = {
  className: '',
  style: {},
  topSectionStyle: {},
  isBottomFillSpace: false,
  isTopFillSpace: false,
  bottomSectionStyle: {}
}

TwoRow.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  topSection: PropTypes.node.isRequired,
  topSectionStyle: PropTypes.object,
  bottomSectionStyle: PropTypes.object,
  isTopFillSpace: PropTypes.bool,
  isBottomFillSpace: PropTypes.bool,
  bottomSection: PropTypes.node.isRequired,
}

export default TwoRow;
