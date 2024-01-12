import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import useHorizontalScroll from "../../core/hooks/useHorizontalScroll";
import styles from "./ContentSlider.module.scss";

const ContentSlider = ({ children, containerCustomStyle, roundList }) => {
  const containerBoxRef = useRef(null);
  const {
    isScrollToEnd,
    onHorizontalScroll,
    scrollX,
    slide,
    isOverflowing,
    checkOverflow,
  } = useHorizontalScroll({ ref: containerBoxRef });

  const SLIDE_BY = 300;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      checkOverflow();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [roundList]);

  return (
    <div className={`${containerCustomStyle} ${styles.container}`}>
      {isOverflowing && !!scrollX && (
        <Button className={styles.arrow} onClick={() => slide(-SLIDE_BY)}>
          <LeftOutlined className={styles.arrowOutline} />
        </Button>
      )}
      <div
        ref={containerBoxRef}
        onScroll={onHorizontalScroll}
        className={styles.scrollBox}
      >
        {children}
      </div>
      {isOverflowing && !isScrollToEnd && (
        <Button className={styles.arrow} onClick={() => slide(+SLIDE_BY)}>
          <RightOutlined className={styles.arrowOutline} />
        </Button>
      )}
    </div>
  );
};

ContentSlider.defaultProps = {
  children: null,
  containerCustomStyle: "",
  roundList: [],
};

ContentSlider.propTypes = {
  children: PropTypes.node,
  containerCustomStyle: PropTypes.string,
  roundList: PropTypes.array,
};

export default ContentSlider;
