import React, { useContext } from "react";
import { useIntl } from "react-intl";
import { ThemeContext } from "core/providers/theme";
import { Button, Image, Typography } from "antd";

import useResponsive from "../../core/hooks/useResponsive";
import styles from "./DataTable.module.scss";

const PaginationItems = ({ current, disabled, type, originalElement }) => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);

  const responsive = useResponsive();

  if (type === "prev") {
    return (
      <Button
        {...{ disabled }}
        className={[styles.nextAndPrevArrowContainer, styles.rowReverse].join(
          " "
        )}
      >
        <Image
          src={getImage("arrowRight")}
          preview={false}
          className={styles.prevArrow}
        />
        {responsive.isLg ? (
          <Typography className={styles.nextAndPrevText}>
            {intl.formatMessage({ id: "label.previous" })}
          </Typography>
        ) : null}
      </Button>
    );
  }
  if (type === "next") {
    return (
      <Button className={styles.nextAndPrevArrowContainer} {...{ disabled }}>
        <Image src={getImage("arrowRight")} preview={false} />
        {responsive.isLg ? (
          <Typography className={styles.nextAndPrevText}>
            {intl.formatMessage({ id: "label.next" })}
          </Typography>
        ) : null}
      </Button>
    );
  }
  return originalElement;
};

export default PaginationItems;
