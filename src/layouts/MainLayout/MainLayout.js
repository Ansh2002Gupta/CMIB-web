import React from "react";
import PropTypes from "prop-types";
import { TwoColumn, TwoRow, ThreeRow } from "core/layouts";
import useResponsive from "core/hooks/useResponsive";
import styles from "./mainLayout.module.scss";

function MainLayout({
  className,
  style,
  header,
  menu,
  content,
  noOuterPadding,
}) {
  // responsive variables based upon config set under `/core/themes/mixins/responsive.scss`
  // larger screen first approach
  const responsive = useResponsive();
  return (
    // applies to sm screen and above
    responsive.isMd ? (
      <TwoColumn
        className={`${styles.mainLayout} ${className}`}
        style={style}
        leftSection={menu}
        rightSection={
          <TwoRow
            className={`${[
              styles.mainLayoutRightSection,
              noOuterPadding ? styles.noPadding : "",
            ].join(" ")}`}
            topSection={header}
            bottomSection={content}
          />
        }
        isRightFillSpace
      />
    ) : (
      // applies to resolution below sm
      <ThreeRow
        className={`${styles.mainLayoutMobile} ${className}`}
        topSection={header}
        topSectionStyle={{
          position: "sticky",
          top: 0,
          zIndex: 999999,
          padding: "10px",
          backgroundColor: "var(--secondary-bg)",
        }}
        middleSection={content}
        middleSectionStyle={{
          flexGrow: 1,
          padding: "10px",
        }}
        bottomSection={menu}
        bottomSectionStyle={{
          position: "sticky",
          bottom: 0,
          zIndex: 999,
        }}
      />
    )
  );
}

MainLayout.defaultProps = {
  className: "",
  style: {},
};

MainLayout.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
};

export default MainLayout;
