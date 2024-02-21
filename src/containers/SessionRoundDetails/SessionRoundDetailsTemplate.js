import React, { useContext } from "react";
import { Image, Typography } from "antd";
import { capitalize } from "lodash";

import { TwoColumn, TwoRow } from "../../core/layouts";
import { ThemeContext } from "core/providers/theme";
import useResponsive from "../../core/hooks/useResponsive";

import CustomButton from "../../components/CustomButton";
import DataTable from "../../components/DataTable/DataTable";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { ReactComponent as AddIcon } from "../../themes/base/assets/images/plus icon.svg";
import { WORK_EXP_DATA } from "../../dummyData";
import { MODULE_KEYS } from "../../constant/constant";
import { classes } from "./SessionRoundDetails.styles";
import styles from "./SessionRoundDetails.module.scss";

const SessionRoundDetailsTemplate = ({
  roundDetails,
  roundNo,
  intl,
  onClickEdit,
}) => {
  const { getImage } = useContext(ThemeContext);
  const responsive = useResponsive();
  const { renderColumn } = useRenderColumn();
  const [userProfileDetails] = useContext(UserProfileContext);
  const currentlySelectedModuleKey =
    userProfileDetails?.selectedModuleItem?.key;
  let centreList = roundDetails?.centres;
  let status = roundDetails?.status || 0;

  const columns = [
    renderColumn({
      title: intl.formatMessage({ id: "session.workExperienceRange" }),
      dataIndex: "workExperience",
      key: "workExperience",
      renderText: { visible: true, isYearRange: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "session.min_ctc" }),
      dataIndex: "min_ctc",
      key: "min_ctc",
      renderText: { isMoney: true, visible: true },
    }),
  ];

  return (
    <TwoRow
      className={styles.centreContainer}
      topSection={
        <TwoColumn
          className={styles.headerContainer}
          leftSection={
            <Typography className={styles.blackText}>
              {intl.formatMessage({
                id:
                  roundNo == 1
                    ? "session.roundOneDetails"
                    : "session.roundTwoDetails",
              })}
            </Typography>
          }
          rightSection={
            <>
              {roundDetails && (
                <TwoColumn
                  onClick={() => {
                    onClickEdit(roundDetails);
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
                  id:
                    roundNo === 1
                      ? "session.addRoundOneDetails"
                      : "session.addRoundTwoDetails",
                })}
                customStyle={!responsive.isMd ? styles.buttonStyles : ""}
                IconElement={responsive.isMd ? AddIcon : null}
                textStyle={styles.textStyle}
                onClick={onClickEdit}
              />
            }
          />
        ) : (
          <TwoRow
            className={styles.addRoundContainer}
            topSection={
              <TwoColumn
                className={styles.middleContainer}
                leftSection={
                  <TwoRow
                    topSection={
                      <Typography className={styles.grayText}>
                        {intl.formatMessage({
                          id:
                            roundNo === 1
                              ? `session.roundOneStatus`
                              : "session.roundTwoStatus",
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
                                <div
                                  className={styles.chipContainer}
                                  key={index}
                                >
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
            }
            bottomSection={
              currentlySelectedModuleKey !==
                MODULE_KEYS.NEWLY_QUALIFIED_PLACEMENTS_KEY && (
                <TwoRow
                  className={styles.experienceContainer}
                  topSection={
                    <Typography className={styles.blackText}>
                      {intl.formatMessage({
                        id: "session.workExperienceRanges",
                      })}
                    </Typography>
                  }
                  bottomSection={
                    <DataTable
                      {...{
                        columns,
                      }}
                      currentDataLength={WORK_EXP_DATA.length}
                      customContainerStyles={styles.tableContainer}
                      originalData={WORK_EXP_DATA}
                      pagination={false}
                    />
                  }
                />
              )
            }
          />
        )
      }
    />
  );
};

export default SessionRoundDetailsTemplate;
