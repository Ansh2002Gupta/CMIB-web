import React, { useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import * as _ from "lodash";

import { ThemeContext } from "core/providers/theme";

import AddTicketAssignee from "../AddTicketAssignee";
import CommonModal from "../../components/CommonModal";
import CustomButton from "../../components/CustomButton";
import ErrorMessageBox from "../../components/ErrorMessageBox";
import TableWithSearchAndFilters from "../../components/TableWithSearchAndFilters/TableWithSearchAndFilters";
import useDownload from "../../core/hooks/useDownload";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import useFetch from "../../core/hooks/useFetch";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import { usePost } from "../../core/hooks/useApiRequest";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import useShowNotification from "../../core/hooks/useShowNotification";
import { urlService } from "../../Utils/urlService";
import { getPaymentColumn } from "./PaymentTableConfig";
import { resetListingData } from "../../constant/utils";
import { validateSearchTextLength } from "../../Utils/validations";
import {
  DEBOUNCE_TIME,
  DEFAULT_PAGE_SIZE,
  NOTIFICATION_TYPES,
  PAGINATION_PROPERTIES,
} from "../../constant/constant";
import {
  ADMIN_ROUTE,
  CORE_ROUTE,
  DOWNLOAD,
  PAYMENT,
  REFUND,
  STATUS,
} from "../../constant/apiEndpoints";
import { ReactComponent as ArrowDown } from "../../themes/base/assets/images/arrow-down.svg";
import styles from "./PaymentTable.module.scss";

const PaymentTable = ({
  current,
  currentActiveTab,
  pageSize,
  setCurrent,
  setPageSize,
  searchedValue,
  setSearchedValue,
}) => {
  const intl = useIntl();
  const { renderColumn } = useRenderColumn();
  const { getImage } = useContext(ThemeContext);
  const { navigateScreen: navigate } = useNavigateScreen();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTicketData, setCurrentTicketData] = useState({});
  const [sortBy, setSortBy] = useState("");
  const { showNotification, notificationContextHolder } = useShowNotification();
  const [filterArray, setFilterArray] = useState({});
  const [sortFilter, setSortFilter] = useState({});

  const [userProfileDetails] = useContext(UserProfileContext);
  const selectedModule = userProfileDetails?.selectedModuleItem;

  const { data, error, fetchData, isError, isLoading, setData } = useFetch({
    url: ADMIN_ROUTE + `/${selectedModule?.key}` + PAYMENT,
    otherOptions: { skipApiCallOnMount: true },
  });

  const {
    data: excelReport,
    error: errorWhenDownloadingExcelReport,
    fetchData: fetchExcelReport,
    isLoading: isDownloadingExcelReport,
    initiateDownload,
  } = useDownload({});

  const { data: status, fetchData: getStatus } = useFetch({
    url: CORE_ROUTE + STATUS,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const { data: paymentModes, fetchData: getPaymentModes } = useFetch({
    url: CORE_ROUTE + STATUS,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const { data: company, fetchData: getCompany } = useFetch({
    url: CORE_ROUTE + STATUS,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const {
    makeRequest: refundPayment,
    isLoading: isRefundingPayment,
    isError: didRefundPaymentFail,
    error: refundPaymentError,
    isSuccess: isRefundPaymentSuccess,
  } = usePost({
    url: ADMIN_ROUTE + `/${selectedModule?.key}` + PAYMENT,
  });

  const handleRefundPayment = (rowData) => {
    refundPayment({
      overrideUrl:
        ADMIN_ROUTE +
        `/${selectedModule?.key}` +
        PAYMENT +
        `/${rowData?.id}` +
        REFUND,
      onErrorCallback: () => {
        showNotification({
          text: refundPaymentError,
          type: "error",
          headingText: intl.formatMessage({ id: "label.errorMessage" }),
        });
      },
      onSuccessCallback: () => {
        showNotification({
          text: intl.formatMessage({ id: "label.refund_successful" }),
          type: "success",
          headingText: intl.formatMessage({ id: "label.success" }),
        });
      },
    });
  };

  let errorString = error;
  if (typeof error === "object") {
    errorString = error?.data?.message;
  }

  const debounceSearch = useMemo(() => {
    return _.debounce(fetchData, DEBOUNCE_TIME);
  }, []);

  const paymentModeOptions = useMemo(() => {
    return paymentModes?.map((mode) => ({
      optionId: mode.id,
      str: mode.name,
    }));
  }, [paymentModes]);

  const companyOptions = useMemo(() => {
    return company?.map((companyElement) => ({
      optionId: companyElement.id,
      str: companyElement.name,
    }));
  }, [company]);

  const statusOptions = useMemo(() => {
    return status?.map((status) => ({
      optionId: status.id,
      str: status.name,
    }));
  }, [status]);

  const handleClickAssign = (data) => {
    setIsModalOpen(true);
    setCurrentTicketData(data);
  };

  const handleTicketIcon = (ticketRow) => {
    const { id } = ticketRow;
    navigate(`reply/${id}`);
  };

  const getRequestedQueryParams = ({
    currentFilterStatus,
    page,
    search,
    rowPerPage,
    sortDirection,
    sortField,
  }) => {
    return {
      perPage: rowPerPage || pageSize,
      page: page || current,
      q: search?.trim() || "",
      sortDirection,
      sortField,
      status: currentFilterStatus?.["1"],
      mode: currentFilterStatus?.["2"],
      company: currentFilterStatus?.["3"],
    };
  };

  const handleOnUserSearch = (str) => {
    setCurrent(1);
    setSearchedValue(str);
    if (str?.trim()?.length > 2) {
      debounceSearch({
        queryParamsObject: getRequestedQueryParams({
          page: 1,
          search: validateSearchTextLength(str),
          currentFilterStatus: filterArray,
          sortDirection: sortFilter?.sortDirection,
          sortField: sortFilter?.sortField,
        }),
      });
      urlService.setQueryStringValue(PAGINATION_PROPERTIES.SEARCH_QUERY, str);
      urlService.setQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
    }
    if (
      !str?.trim() &&
      urlService.getQueryStringValue(PAGINATION_PROPERTIES.SEARCH_QUERY)
    ) {
      debounceSearch({
        queryParamsObject: getRequestedQueryParams({
          page: 1,
          search: "",
          currentFilterStatus: filterArray,
          sortDirection: sortFilter?.sortDirection,
          sortField: sortFilter?.sortField,
        }),
      });
      urlService.removeParam(PAGINATION_PROPERTIES.SEARCH_QUERY);
      urlService.setQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
    }
  };

  const handleSorting = (sortDetails) => {
    setCurrent(1);
    urlService.setQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
    const requestedParams = getRequestedQueryParams({
      currentFilterStatus: filterArray,
      page: 1,
      search: searchedValue,
      sortDirection: sortDetails?.sortDirection,
      sortField: sortDetails?.sortDirection ? sortDetails?.sortField : "",
    });
    fetchData({ queryParamsObject: requestedParams });
    if (sortDetails.sortDirection) {
      setSortFilter(sortDetails);
      return;
    }
    setSortFilter({ sortDirection: "", sortField: "" });
  };

  const columns = getPaymentColumn({
    type: currentActiveTab,
    intl,
    getImage,
    handleRefundPayment,
    handleClickAssign,
    handleTicketIcon,
    navigate,
    renderColumn,
    queriesColumnProperties: {},
    fetchData,
    paginationAndSearchProperties: {
      pageSize,
      current,
      searchedValue,
    },
    setSortBy,
    sortBy,
    handleSorting,
    userProfileDetails,
  });

  const onChangePageSize = (size) => {
    setPageSize(size);
    setCurrent(1);
    urlService.setQueryStringValue(PAGINATION_PROPERTIES.ROW_PER_PAGE, size);
    urlService.setQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
    const requestedParams = getRequestedQueryParams({
      rowPerPage: size,
      page: 1,
      search: searchedValue,
      currentFilterStatus: filterArray,
      sortDirection: sortFilter?.sortDirection,
      sortField: sortFilter?.sortField,
    });
    fetchData({ queryParamsObject: requestedParams });
  };

  const onChangeCurrentPage = (newPageNumber) => {
    setCurrent(newPageNumber);
    urlService.setQueryStringValue(
      PAGINATION_PROPERTIES.CURRENT_PAGE,
      newPageNumber
    );

    const requestedParams = getRequestedQueryParams({
      page: newPageNumber,
      search: searchedValue,
      currentFilterStatus: filterArray,
      sortDirection: sortFilter?.sortDirection,
      sortField: sortFilter?.sortField,
    });

    fetchData({ queryParamsObject: requestedParams });
  };

  useEffect(() => {
    urlService.setQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE, current);
    urlService.setQueryStringValue(
      PAGINATION_PROPERTIES.ROW_PER_PAGE,
      pageSize
    );
    searchedValue &&
      urlService.setQueryStringValue(
        PAGINATION_PROPERTIES.SEARCH_QUERY,
        searchedValue
      );

    const requestedParams = getRequestedQueryParams({
      search: searchedValue,
      currentFilterStatus: filterArray,
      sortDirection: sortFilter?.sortDirection,
      sortField: sortFilter?.sortField,
    });

    !!selectedModule?.key &&
      fetchData({
        queryParamsObject: requestedParams,
        onSuccessCallback: (ticketsResult) => {
          resetListingData({
            listData: ticketsResult,
            currentPage: current,
            fetchDataCallback: () =>
              fetchData({
                queryParamsObject: getRequestedQueryParams({
                  page: 1,
                  search: searchedValue,
                  currentFilterStatus: filterArray,
                  sortDirection: sortFilter?.sortDirection,
                  sortField: sortFilter?.sortField,
                }),
              }),
            setCurrent,
          });
        },
      });
  }, [selectedModule?.key]);

  useEffect(() => {
    getStatus({
      queryParamsObject: { type: "payment-status" },
    });
    getPaymentModes({
      queryParamsObject: { type: "txn-mode" },
    });
    getCompany({
      queryParamsObject: { type: "company-name" },
    });
  }, []);

  const handleOnReTry = () => {
    const requestedParams = getRequestedQueryParams({
      rowPerPage: DEFAULT_PAGE_SIZE,
      page: 1,
      search: searchedValue,
      currentFilterStatus: filterArray,
      sortDirection: sortFilter?.sortDirection,
      sortField: sortFilter?.sortField,
    });
    setCurrent(1);
    urlService.setQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
    fetchData({ queryParamsObject: requestedParams });
  };

  const handleAssignee = ({ assignedTo, ticketId }) => {
    let updatedData = data;
    updatedData.records = data?.records?.map((ticket) => {
      if (+ticket.id === +ticketId) {
        ticket.assigned_to = {
          id: assignedTo?.id,
          name: assignedTo?.name,
        };
        return ticket;
      }
      return {
        ...ticket,
      };
    });
    setData(updatedData);
    setCurrentTicketData({});
  };

  const filterOptions = [
    {
      id: 1,
      name: "Status",
      isSelected: false,
      options: statusOptions,
    },
    {
      id: 2,
      name: "Payment Mode",
      isSelected: false,
      options: paymentModeOptions,
    },
    {
      id: 3,
      name: "Company",
      isSelected: false,
      options: companyOptions,
    },
  ];

  const onFilterApply = (currentFilterStatus) => {
    const requestedParams = getRequestedQueryParams({
      currentFilterStatus,
      search: searchedValue,
      page: 1,
      sortDirection: sortFilter?.sortDirection,
      sortField: sortFilter?.sortField,
    });
    setCurrent(1);
    urlService.setQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
    fetchData({ queryParamsObject: requestedParams });
  };

  const downloadExcelReport = () => {
    const currentPage = urlService.getQueryStringValue(
      PAGINATION_PROPERTIES.CURRENT_PAGE
    );
    const row_per_page = urlService.getQueryStringValue(
      PAGINATION_PROPERTIES.ROW_PER_PAGE
    );
    const requestedParams = getRequestedQueryParams({
      currentFilterStatus: filterArray,
      page: currentPage,
      search: searchedValue,
      rowPerPage: row_per_page,
      sortDirection: sortFilter?.sortDirection,
      sortField: sortFilter?.sortField,
    });
    initiateDownload({
      url: ADMIN_ROUTE + `/${selectedModule?.key}` + PAYMENT + DOWNLOAD,
      queryParamsObject: requestedParams,
      onSuccessCallback: (response) => {
        showNotification({
          text: intl.formatMessage({
            id: "label.downloadSucess",
          }),
          type: NOTIFICATION_TYPES.SUCCESS,
        });
      },
      onErrorCallback: () => {
        showNotification({
          text:
            errorWhenDownloadingExcelReport ||
            intl.formatMessage({ id: "label.errorOccured" }),
          type: "error",
          headingText: intl.formatMessage({ id: "label.errorMessage" }),
        });
      },
    });
  };

  const renderDownloadExcelButton = () => {
    return (
      <CustomButton
        btnText={intl.formatMessage({ id: "label.download_excel_report" })}
        IconElement={ArrowDown}
        iconStyles={styles.btnIconStyles}
        customStyle={styles.greyBtnCustomStyles}
        onClick={() => downloadExcelReport()}
        loading={isDownloadingExcelReport}
        isBtnDisable={isDownloadingExcelReport}
      />
    );
  };

  return (
    <>
      {notificationContextHolder}
      <CommonModal isOpen={isModalOpen} width={450}>
        <AddTicketAssignee
          {...{
            assigned_to: currentTicketData?.assigned_to,
            ticket_id: currentTicketData?.id,
            handleAssignee,
            setIsModalOpen,
            showNotification,
          }}
        />
      </CommonModal>
      {!isError && (
        <TableWithSearchAndFilters
          {...{
            current,
            pageSize,
            searchedValue,
            filterOptions,
            handleOnUserSearch,
            columns,
            onChangePageSize,
            onChangeCurrentPage,
            onFilterApply,
            placeholder: intl.formatMessage({
              id: "label.manage_payment_searchbar_placeholder",
            }),
            filterArray,
            setFilterArray,
          }}
          rightSection={renderDownloadExcelButton()}
          isLoading={isLoading}
          data={data?.records}
          currentDataLength={data?.meta?.total}
        />
      )}
      {isError && (
        <div className={styles.errorContainer}>
          <ErrorMessageBox
            onClick={handleOnReTry}
            errorText={errorString}
            errorHeading={intl.formatMessage({
              id: "label.error",
            })}
          />
        </div>
      )}
    </>
  );
};

PaymentTable.defaultProps = {
  current: 1,
  currentActiveTab: "1",
  pageSize: DEFAULT_PAGE_SIZE,
  queryListingProps: {},
  setCurrent: () => {},
  setPageSize: () => {},
  ticketListingProps: {},
  searchedValue: "",
  setSearchedValue: () => {},
};

PaymentTable.propTypes = {
  current: PropTypes.number,
  currentActiveTab: PropTypes.string,
  pageSize: PropTypes.number,
  queryListingProps: PropTypes.object,
  setCurrent: PropTypes.func,
  setPageSize: PropTypes.func,
  ticketListingProps: PropTypes.object,
  searchedValue: PropTypes.string,
  setSearchedValue: PropTypes.func,
};

export default PaymentTable;
