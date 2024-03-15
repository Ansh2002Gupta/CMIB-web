import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";
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
import useShowNotification from "../../core/hooks/useShowNotification";
import useUpdateSessionRoundDetailsApi from "../../services/api-services/SessionRounds/useUpdateRoundDetailsApi";
import { GlobalSessionContext } from "../../globalContext/globalSession/globalSessionProvider";
import { NotificationContext } from "../../globalContext/notification/notificationProvider";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { setShowSuccessNotification } from "../../globalContext/notification/notificationActions";
import { urlService } from "../../Utils/urlService";
import {
  ADMIN_ROUTE,
  CENTRE_END_POINT,
  ROUNDS,
} from "../../constant/apiEndpoints";
import { SESSION } from "../../routes/routeNames";
import { MODULE_KEYS, PAYMENT_TYPE, ROUND_ID } from "../../constant/constant";
import { NUMERIC_VALUE_REGEX } from "../../constant/regex";
import { classes } from "./SetupCenter.styles";
import styles from "./SetupCenter.module.scss";

const SetupCenter = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const { getImage } = useContext(ThemeContext);
  const [globalSessionDetails] = useContext(GlobalSessionContext);
  const [userProfileDetails] = useContext(UserProfileContext);
  const [notificationState, setNotificationStateDispatch] =
    useContext(NotificationContext);

  const [isPaymentTypeModalOpen, setIsPaymentTypeModalOpen] = useState(false);
  const [isFeesError, setIsFeesError] = useState(false);

  const { renderColumn } = useRenderColumn();
  const currentGlobalSession = globalSessionDetails?.globalSessionList?.find(
    (item) => item.id === globalSessionDetails?.globalSessionId
  );

  const { showNotification, notificationContextHolder } = useShowNotification();
  const { updateSessionRoundDetails } = useUpdateSessionRoundDetailsApi();

  const isEditable = currentGlobalSession?.is_editable;
  const roundId = urlService.getQueryStringValue(ROUND_ID);
  const selectedModule = userProfileDetails?.selectedModuleItem;

  const {
    isLoading,
    data: roundDetails,
    fetchData: fetchRoundDetails,
  } = useFetch({
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
    if (roundId && selectedModule) {
      fetchRoundDetails({
        onSuccessCallback: (roundDetails) => {
          setParticipationFees(
            roundDetails?.participation_fee !== null
              ? roundDetails?.participation_fee
              : ""
          );
          setPaymentType(
            roundDetails?.payment_type || PAYMENT_TYPE.CENTRE_WISE
          );
          setParticipationModalFees(roundDetails?.participation_fee || "");
          setPaymentModalType(
            roundDetails?.payment_type || PAYMENT_TYPE.CENTRE_WISE
          );
        },
      });
    }
  }, [userProfileDetails?.selectedModuleItem]);

  useModuleWiseApiCall({
    initialApiCall: () => {
      if (roundId) {
        getSetupCentres({});
      } else {
        navigate(`/${selectedModule?.key}/${SESSION}?mode=view&tab=2`);
      }
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

  useEffect(() => {
    if (notificationState?.showSuccessNotification) {
      showNotification({
        text: intl.formatMessage({ id: "label.data_saved_successfully" }),
        type: "success",
      });
      setNotificationStateDispatch(setShowSuccessNotification(false));
    }
  }, [notificationState?.showSuccessNotification]);

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

  const handleOnReTry = () => {
    getSetupCentres({});
  };

  const handleEditPaymentType = () => {
    setParticipationFees(
      paymentModalType === PAYMENT_TYPE.CENTRE_WISE
        ? ""
        : participationModalFees
    );
    setPaymentType(paymentModalType);
    setIsPaymentTypeModalOpen(false);
    setIsFeesError(false);
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
      {notificationContextHolder}
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
                          onClick={() => {
                            setIsFeesError(false);
                            setPaymentModalType(PAYMENT_TYPE.CENTRE_WISE);
                          }}
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
                MODULE_KEYS.NEWLY_QUALIFIED_PLACEMENTS_KEY &&
              !isLoading &&
              roundDetails ? (
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
                                {participationFees !== null
                                  ? participationFees
                                  : "-"}
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
                    isEditable ? (
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
                    ) : (
                      <></>
                    )
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
