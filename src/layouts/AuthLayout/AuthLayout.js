import React from 'react'
import PropTypes from 'prop-types'
import { TwoColumn, TwoRow } from 'core/layouts'
import useResponsive from 'core/hooks/useResponsive'
import Styles from './authLayout.module.scss'

function AuthLayout({ className, style, leftSection, rightSection }) {
  // responsive variables based upon config set under `/core/themes/mixins/responsive.scss`
  // larger screen first approach
  const responsive = useResponsive();
  return (
    // applies to sm screen and above
    responsive.isMd ? (
      <TwoColumn
        className={`${Styles.authayout} ${className}`}
        style={style}
        leftSection={leftSection}
        leftSectionStyle={{ width: '50%' }}
        rightSection={rightSection}
        rightSectionStyle={{ width: '50%' }}
        isRightFillSpace
      />
    ) : (
      // applies to resolution below sm
      <TwoRow
        className={`${Styles.authLayoutMobile} ${className}`}
        topSection={leftSection}
        topSectionStyle={{ height: '100%' }}
        bottomSectionStyle={{ height: '100%' }}
        bottomSection={rightSection}
      />
    )
  )
}

AuthLayout.defaultProps = {
  className: '',
  style: {},
}

AuthLayout.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
}

export default AuthLayout
