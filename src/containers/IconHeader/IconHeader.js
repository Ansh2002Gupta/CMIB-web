import React from "react";
import { useIntl } from "react-intl";
import { Typography } from "antd";

import { TwoColumn } from "../../core/layouts";

import Chip from "../../components/Chip/Chip";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomLoader from "../../components/CustomLoader";
import { ReactComponent as CheckIcon } from "../../themes/base/assets/images/white check icon.svg";
import { ReactComponent as IconMore } from "../../themes/base/assets/images/iconMore.svg";
import { ReactComponent as ArrowLeft } from "../../themes/base/assets/images/black-arrow-left.svg";

import useResponsive from "../../core/hooks/useResponsive";
import styles from "./IconHeader.module.scss";

const IconHeader = ({
  isLoading,
  isDetailsScreen,
  onLeftIconPress,
  onClickIconMore,
  onIconBackPress,
  ticketData,
}) => {
  const intl = useIntl();
  const readable_id = ticketData?.readable_id || "--";
  const status = ticketData?.status.toLowerCase() || "--";
  const responsive = useResponsive();

  let chipStatus = "";
  if (status === "in-progress") {
    chipStatus = "blue";
  }
  if (status === "pending") {
    chipStatus = "orange";
  }
  if (status === "closed") {
    chipStatus = "green";
  }

  return (
    <>
      <TwoColumn
        className={styles.mainContainer}
        leftSection={
          !isDetailsScreen ? (
            <TwoColumn
              className={styles.box}
              leftSection={
                <Typography className={styles.adminId}>
                  {readable_id}
                </Typography>
              }
              rightSection={<Chip color={chipStatus} label={status} />}
            />
          ) : (
            <CustomButton
              onClick={onIconBackPress}
              IconElement={ArrowLeft}
              customStyle={styles.iconMoreBtn}
            />
          )
        }
        rightSection={
          isLoading ? (
            <CustomLoader
              customLoaderContainerStyles={styles.loaderStyle}
              size={"small"}
            />
          ) : (
            <div className={styles.closedBtnContainer}>
              <CustomButton
                IconElement={CheckIcon}
                btnText={
                  responsive.isMd &&
                  intl.formatMessage({ id: "label.markClosed" })
                }
                tooltipText={intl.formatMessage({ id: "label.markClosed" })}
                onClick={onLeftIconPress}
                customStyle={styles.btn}
                isBtnDisable={status === "closed"}
              />
              {!responsive.isMd && (
                <CustomButton
                  IconElement={IconMore}
                  onClick={onClickIconMore}
                  customStyle={styles.iconMoreBtn}
                />
              )}
            </div>
          )
        }
      />
    </>
  );
};

export default IconHeader;
