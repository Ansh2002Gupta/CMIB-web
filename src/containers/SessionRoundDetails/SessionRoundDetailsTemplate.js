import React, { useContext, useState } from "react";
import { Image, Typography } from "antd";
import { capitalize } from "lodash";

import { TwoColumn, TwoRow } from "../../core/layouts";
import { ThemeContext } from "core/providers/theme";
import useResponsive from "../../core/hooks/useResponsive";

import CustomButton from "../../components/CustomButton";
import { ReactComponent as AddIcon } from "../../themes/base/assets/images/plus icon.svg";
import { classes } from "./SessionRoundDetails.styles";
import styles from "./SessionRoundDetails.module.scss";

const SessionRoundDetailsTemplate = ({ roundDetails, intl, onClickEdit }) => {
  const { getImage } = useContext(ThemeContext);
  const responsive = useResponsive();
  let centreList = roundDetails?.centres;
  let status = roundDetails?.status || 0;

  return (
    <TwoRow
      className={styles.centreContainer}
      topSection={
        <TwoColumn
          className={styles.headerContainer}
          leftSection={
            <Typography className={styles.blackText}>
              {intl.formatMessage({ id: "session.roundOneDetails" })}
            </Typography>
          }
          rightSection={
            <>
              {roundDetails && (
                <TwoColumn
                  onClick={() => {
                    onClickEdit(roundDetails)
                  }}
                  className={styles.editContainer}
                  leftSection={
                    <Image
                      src={getImage("editIcon")}
                      className={styles.editIcon}
                      preview={false}
                    />
                  }
                  rightSection={
                    <Typography className={styles.text}>
                      {intl.formatMessage({ id: "session.edit" })}
                    </Typography>
                  }
                />
              )}
            </>
          }
        />
      }
      bottomSectionStyle={
        !roundDetails ? classes.emptyMiddleContainer : classes.middleContainer
      }
      isBottomFillSpace
      bottomSection={
        !roundDetails ? (
          <TwoRow
            className={styles.emptyMiddleContainer}
            topSection={
              <Typography className={styles.middleContainerText}>
                {intl.formatMessage({ id: "session.emptyRoundDesc" })}
              </Typography>
            }
            bottomSection={
              <CustomButton
                btnText={intl.formatMessage({
                  id: "session.addRoundOneDetails",
                })}
                customStyle={!responsive.isMd ? styles.buttonStyles : ""}
                IconElement={responsive.isMd ? AddIcon : null}
                textStyle={styles.textStyle}
                onClick={onClickEdit}
              />
            }
          />
        ) : (
          <TwoColumn
            className={styles.middleContainer}
            leftSection={
              <TwoRow
                topSection={
                  <Typography className={styles.grayText}>
                    {intl.formatMessage({
                      id: `session.roundOneStatus`,
                    })}
                    <span className={styles.redText}> *</span>
                  </Typography>
                }
                bottomSection={
                  <Typography className={styles.text}>
                    {intl.formatMessage({
                      id: status == 1 ? "label.active" : "label.inactive",
                    })}
                  </Typography>
                }
              />
            }
            rightSectionStyle={classes.centresContainer}
            rightSection={
              <>
                {!!centreList?.length && (
                  <TwoRow
                    topSection={
                      <Typography className={styles.grayText}>
                        {intl.formatMessage({
                          id: `session.rounds.centres`,
                        })}
                        <span className={styles.redText}> *</span>
                      </Typography>
                    }
                    bottomSection={
                      <div className={styles.selectedItemsContainer}>
                        {centreList?.map((item, index) => {
                          return (
                            <div className={styles.chipContainer} key={index}>
                              <Typography className={styles.chipText}>
                                {capitalize(item?.name)}
                              </Typography>
                            </div>
                          );
                        })}
                      </div>
                    }
                  />
                )}
              </>
            }
          />
        )
      }
    />
  );
};

export default SessionRoundDetailsTemplate;
