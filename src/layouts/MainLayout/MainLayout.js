import React from 'react';
import PropTypes from 'prop-types';
import { TwoColumn, TwoRow, ThreeRow } from 'core/layouts';
import useResponsive from 'core/hooks/useResponsive';
import Styles from './mainLayout.module.scss';

function MainLayout({ className, style, header, menu, content }) {
  // responsive variables based upon config set under `/core/themes/mixins/responsive.scss`
  // larger screen first approach
  const responsive = useResponsive();
  return (
    // applies to sm screen and above
    responsive.isMd ? (
      <TwoColumn
        className={`${Styles.mainLayout} ${className}`}
        style={style}
        leftSection={menu}
        rightSection={
          <TwoRow
            className={`${Styles.mainLayoutRightSection}`}
            topSection={header}
            bottomSection={content}
          />
        }
        isRightFillSpace
      />
    ) : (
      // applies to resolution below sm
      <ThreeRow
        className={`${Styles.mainLayoutMobile} ${className}`}
        topSection={header}
        middleSection={content}
        middleSectionStyle={{
          flexGrow: 1,
          padding: '10px',
        }}
        bottomSection={menu}
        bottomSectionStyle={{
          position: 'sticky',
          bottom: 0,
          zIndex: 999,
        }}
      />
    )
  );
}

MainLayout.defaultProps = {
  className: '',
  style: {},
};

MainLayout.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
};

export default MainLayout;
