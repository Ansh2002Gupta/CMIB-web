import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "core/providers/theme";
import { Image, Spin, Typography } from "antd";

import { TwoColumn, TwoRow } from "../../core/layouts";

import CustomInput from "../../components/CustomInput";
import CustomModal from "../../components/CustomModal";
import CustomRadioButton from "../../components/CustomRadioButton";
import DataTable from "../../components/DataTable";
import ErrorMessageBox from "../../components/ErrorMessageBox";
import useFetch from "../../core/hooks/useFetch";
import useModuleWiseApiCall from "../../core/hooks/useModuleWiseApiCall";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import useUpdateSessionRoundDetailsApi from "../../services/api-services/SessionRounds/useUpdateRoundDetailsApi";
import { GlobalSessionContext } from "../../globalContext/globalSession/globalSessionProvider";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { urlService } from "../../Utils/urlService";
import {
  ADMIN_ROUTE,
  CENTRE_END_POINT,
  ROUNDS,
} from "../../constant/apiEndpoints";
import {
  DEFAULT_PAGE_SIZE,
  MODULE_KEYS,
  PAGINATION_PROPERTIES,
  PAYMENT_TYPE,
  ROUND_ID,
  VALID_ROW_PER_OPTIONS,
} from "../../constant/constant";
import { NUMERIC_VALUE_REGEX } from "../../constant/regex";
import { classes } from "./SetupCenter.styles";
import styles from "./SetupCenter.module.scss";

const SetupCenter = () => {
  const intl = useIntl();
  const { renderColumn } = useRenderColumn();
  const { getImage } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [globalSessionDetails] = useContext(GlobalSessionContext);
  const currentGlobalSession = globalSessionDetails?.globalSessionList?.find(
    (item) => item.id === globalSessionDetails?.globalSessionId
  );
  const isEditable = currentGlobalSession?.is_editable;
  const [isPaymentTypeModalOpen, setIsPaymentTypeModalOpen] = useState(false);
  const [isFeesError, setIsFeesError] = useState(false);
  const { updateSessionRoundDetails } = useUpdateSessionRoundDetailsApi();
  const roundId = urlService.getQueryStringValue(ROUND_ID);
  const [userProfileDetails] = useContext(UserProfileContext);
  const selectedModule = userProfileDetails?.selectedModuleItem;

  const { isLoading, fetchData: fetchRoundDetails } = useFetch({
    url: ADMIN_ROUTE + `/${selectedModule?.key}` + ROUNDS + `/${roundId}`,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });
  const [paymentType, setPaymentType] = useState(PAYMENT_TYPE.CENTRE_WISE);
  const [participationFees, setParticipationFees] = useState("");
  const [paymentModalType, setPaymentModalType] = useState(paymentType);
  const [participationModalFees, setParticipationModalFees] =
    useState(participationFees);
  const {
    data: setupCentres,
    error: errorWhileGettingCentres,
    fetchData: getSetupCentres,
    isLoading: isGettingSetupCentres,
  } = useFetch({
    url:
      ADMIN_ROUTE +
      `/${selectedModule?.key}` +
      ROUNDS +
      `/${roundId}` +
      CENTRE_END_POINT,
    otherOptions: { skipApiCallOnMount: true },
  });

  useEffect(() => {
    fetchRoundDetails({
      onSuccessCallback: (roundDetails) => {
        setParticipationFees(roundDetails?.participation_fee || "");
        setPaymentType(roundDetails?.payment_type || PAYMENT_TYPE.CENTRE_WISE);
        setParticipationModalFees(roundDetails?.participation_fee || "");
        setPaymentModalType(
          roundDetails?.payment_type || PAYMENT_TYPE.CENTRE_WISE
        );
      },
    });
  }, []);

  useModuleWiseApiCall({
    initialApiCall: () => {
      getSetupCentres({});
    },
  });

  const goToEditCentrePage = (rowData) => {
    const centreId = rowData?.id;
    navigate(`details/${centreId}?roundId=${roundId}`, {
      state: {
        paymentType: paymentType,
        participationFees: participationFees,
      },
    });
  };

  const columns = [
    renderColumn({
      title: intl.formatMessage({ id: "label.sNo" }),
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => {
        return {
          children: <span>{`${index + 1}.`}</span>,
        };
      },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.centreName" }),
      dataIndex: "name",
      key: "name",
      renderText: { isTextBold: true, visible: true, isCapitalize: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.centreId" }),
      dataIndex: "centre_code",
      key: "centre_code",
      renderText: { visible: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.bigSmallCentre" }),
      dataIndex: "centre_size",
      key: "centre_size",
      renderText: { visible: true, isIntl: true },
    }),
    renderColumn({
      title: intl.formatMessage({ id: "label.actions" }),
      dataIndex: "edit",
      key: "edit",
      renderImage: {
        alt: "edit",
        onClick: (rowData) => goToEditCentrePage(rowData),
        preview: false,
        src: getImage(isEditable ? "edit" : "eye"),
        visible: true,
      },
    }),
  ];

  const renderContent = () => {
    if (!isGettingSetupCentres && errorWhileGettingCentres) {
      return (
        <div className={styles.errorContainer}>
          <ErrorMessageBox
            onRetry={handleOnReTry}
            errorText={errorWhileGettingCentres?.data?.message}
            errorHeading={intl.formatMessage({
              id: "label.error",
            })}
          />
        </div>
      );
    }
    if (isGettingSetupCentres) {
      return (
        <div className={styles.loaderContainer}>
          <Spin size="large" />
        </div>
      );
    }

    if (setupCentres?.length === 0) {
      return (
        <div className={styles.errorContainer}>
          <ErrorMessageBox
            errorText={intl.formatMessage({
              id: "label.select_centres_error_msg",
            })}
            errorHeading={intl.formatMessage({
              id: "label.error",
            })}
          />
        </div>
      );
    }

    return (
      <DataTable
        columns={columns}
        currentDataLength={setupCentres?.length}
        customContainerStyles={styles.tableContainer}
        hidePagination
        showTableBorderBottom
        originalData={setupCentres || []}
      />
    );
  };

  useLayoutEffect(() => {
    const currentPage = +urlService.getQueryStringValue(
      PAGINATION_PROPERTIES.CURRENT_PAGE
    );
    const currentPagePerRow = +urlService.getQueryStringValue(
      PAGINATION_PROPERTIES.ROW_PER_PAGE
    );
    if (!currentPage || isNaN(currentPage) || currentPage <= 0) {
      urlService.setQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
    }

    if (
      !currentPagePerRow ||
      !VALID_ROW_PER_OPTIONS.includes(currentPagePerRow)
    ) {
      urlService.setQueryStringValue(
        PAGINATION_PROPERTIES.ROW_PER_PAGE,
        DEFAULT_PAGE_SIZE
      );
    }
  }, []);

  const handleOnReTry = () => {
    getSetupCentres({});
  };

  const handleEditPaymentType = () => {
    setParticipationFees(participationModalFees);
    setPaymentType(paymentModalType);
    setIsPaymentTypeModalOpen(false);
    updateSessionRoundDetails({
      payload: {
        payment_type: paymentModalType,
        ...(paymentModalType === PAYMENT_TYPE.WHOLE && {
          participation_fee: participationModalFees,
        }),
      },
      roundId: roundId,
      selectedModuleKey: selectedModule?.key,
    });
  };

  return (
    <>
      {
        <CustomModal
          btnText={intl.formatMessage({ id: "label.save" })}
          isOpen={isPaymentTypeModalOpen}
          headingText={intl.formatMessage({
            id: "setupCentres.editPaymentType",
          })}
          onBtnClick={() => {
            const isError =
              paymentModalType === PAYMENT_TYPE.WHOLE &&
              !participationModalFees?.length;
            if (!isError) {
              handleEditPaymentType();
            } else {
              setIsFeesError(true);
            }
          }}
          cancelBtnText={intl.formatMessage({ id: "label.cancel" })}
          onCancel={() => {
            setIsFeesError(false);
            setIsPaymentTypeModalOpen(false);
          }}
          content={
            <TwoRow
              className={styles.modalGap}
              topSection={
                <TwoRow
                  className={styles.radioButtonGap}
                  topSection={
                    <Typography className={styles.grayText}>
                      {intl.formatMessage({
                        id: "setupCentres.paymentType",
                      })}
                      <span className={styles.redText}> *</span>
                    </Typography>
                  }
                  bottomSection={
                    <TwoColumn
                      className={styles.radioButtonGap}
                      leftSection={
                        <TwoColumn
                          className={styles.assigneeRow}
                          onClick={() =>
                            setPaymentModalType(PAYMENT_TYPE.CENTRE_WISE)
                          }
                          leftSection={
                            <CustomRadioButton
                              checked={
                                paymentModalType === PAYMENT_TYPE.CENTRE_WISE
                              }
                            />
                          }
                          rightSection={
                            <Typography className={styles.text}>
                              {intl.formatMessage({
                                id: "setupCentres.perCentre",
                              })}
                            </Typography>
                          }
                        />
                      }
                      rightSection={
                        <TwoColumn
                          onClick={() =>
                            setPaymentModalType(PAYMENT_TYPE.WHOLE)
                          }
                          leftSection={
                            <CustomRadioButton
                              checked={paymentModalType === PAYMENT_TYPE.WHOLE}
                            />
                          }
                          rightSection={
                            <Typography className={styles.text}>
                              {intl.formatMessage({
                                id: "setupCentres.wholePlacementDrive",
                              })}
                            </Typography>
                          }
                        />
                      }
                    />
                  }
                />
              }
              bottomSection={
                <TwoRow
                  topSection={
                    paymentModalType === PAYMENT_TYPE.WHOLE ? (
                      <TwoRow
                        className={styles.participationFeesModalGap}
                        topSection={
                          <Typography className={styles.grayText}>
                            {intl.formatMessage({
                              id: "setupCentres.participationFees",
                            })}
                            <span className={styles.redText}> *</span>
                          </Typography>
                        }
                        bottomSection={
                          <TwoRow
                            topSection={
                              <CustomInput
                                customLabelStyles={styles.inputLabel}
                                customInputStyles={styles.input}
                                customContainerStyles={
                                  styles.customContainerStyles
                                }
                                onChange={(val) => {
                                  if (val.target.value === "") {
                                    setIsFeesError(true);
                                  } else {
                                    setIsFeesError(false);
                                  }
                                  (NUMERIC_VALUE_REGEX.test(val.target.value) ||
                                    val.target.value === "") &&
                                    setParticipationModalFees(val.target.value);
                                }}
                                placeholder={intl.formatMessage({
                                  id: "setupCentres.enterParticipationFees",
                                })}
                                value={participationModalFees}
                                onBlur={(val) => {
                                  setIsFeesError(!val.target.value.length);
                                }}
                              />
                            }
                            bottomSection={
                              isFeesError ? (
                                <Typography className={styles.errorText}>
                                  {intl.formatMessage({
                                    id: "setupCentres.feesError",
                                  })}
                                </Typography>
                              ) : (
                                <></>
                              )
                            }
                          />
                        }
                      />
                    ) : (
                      <></>
                    )
                  }
                  bottomSection={
                    <Typography className={styles.noteText}>
                      {intl.formatMessage({
                        id: "setupCentres.paymentTypeNote",
                      })}
                    </Typography>
                  }
                />
              }
            />
          }
        />
      }
      <TwoRow
        className={styles.mainContainer}
        topSection={
          <TwoRow
            className={styles.headerContainer}
            topSection={
              <Typography className={styles.headingText}>
                {intl.formatMessage({ id: "setupCentres.heading" })}
              </Typography>
            }
            bottomSection={
              <Typography className={styles.descriptionText}>
                {intl.formatMessage({ id: "setupCentres.warning" })}
              </Typography>
            }
          />
        }
        bottomSection={
          <TwoRow
            topSection={
              selectedModule?.key !==
                MODULE_KEYS.NEWLY_QUALIFIED_PLACEMENTS_KEY && !isLoading ? (
                <TwoColumn
                  className={styles.paymentTypeContainer}
                  leftSection={
                    <TwoColumn
                      className={styles.participationFeesGap}
                      leftSection={
                        <TwoRow
                          className={styles.paymentTypeGap}
                          topSection={
                            <Typography className={styles.grayText}>
                              {intl.formatMessage({
                                id: "setupCentres.paymentType",
                              })}
                            </Typography>
                          }
                          bottomSection={
                            <Typography className={styles.blackText}>
                              {intl.formatMessage({
                                id:
                                  paymentType === PAYMENT_TYPE.CENTRE_WISE
                                    ? "setupCentres.perCentre"
                                    : "setupCentres.wholePlacementDrive",
                              })}
                            </Typography>
                          }
                        />
                      }
                      rightSection={
                        paymentType === PAYMENT_TYPE.WHOLE ? (
                          <TwoRow
                            className={styles.paymentTypeGap}
                            topSection={
                              <Typography className={styles.grayText}>
                                {intl.formatMessage({
                                  id: "setupCentres.participationFees",
                                })}
                              </Typography>
                            }
                            bottomSection={
                              <Typography className={styles.blackText}>
                                {participationFees || "-"}
                              </Typography>
                            }
                          />
                        ) : (
                          <></>
                        )
                      }
                    />
                  }
                  isLeftFillSpace
                  rightSection={
                    <TwoColumn
                      onClick={() => {
                        setParticipationModalFees(participationFees);
                        setPaymentModalType(paymentType);
                        setIsPaymentTypeModalOpen(true);
                      }}
                      className={styles.editContainer}
                      leftSection={
                        <Image
                          src={getImage("editDark")}
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
                  }
                />
              ) : (
                <></>
              )
            }
            bottomSection={renderContent()}
          />
        }
        bottomSectionStyle={classes.bottomSectionStyle}
        isBottomFillSpace
      />
    </>
  );
};

export default SetupCenter;
