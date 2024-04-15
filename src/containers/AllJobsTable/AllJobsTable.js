import React, { useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import * as _ from "lodash";
import { Typography, Image } from "antd";

import { ThemeContext } from "core/providers/theme";

import CustomButton from "../../components/CustomButton";
import ErrorMessageBox from "../../components/ErrorMessageBox/ErrorMessageBox";
import TableWithSearchAndFilters from "../../components/TableWithSearchAndFilters/TableWithSearchAndFilters";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import useFetch from "../../core/hooks/useFetch";
import { getQueryColumn } from "./AllJobsTableConfig";
import useShowNotification from "../../core/hooks/useShowNotification";
import { urlService } from "../../Utils/urlService";
import {
  ADMIN_ROUTE,
  JOBS,
  REGISTERED_COMPANIES,
  SUMMARY,
} from "../../constant/apiEndpoints";
import { ReactComponent as ArrowDown } from "../../themes/base/assets/images/arrow-down.svg";
import {
  DEBOUNCE_TIME,
  DEFAULT_PAGE_SIZE,
  PAGINATION_PROPERTIES,
} from "../../constant/constant";
import { active_filter_options, approval_filter_options } from "./constants";
import { getValidFilter } from "../../constant/utils";
import { validateSearchTextLength } from "../../Utils/validations";
import styles from "./AllJobsTable.module.scss";
import useApproveJobApi from "../../services/api-services/AllJob/useApproveJobApi";
import CommonModal from "../../components/CommonModal";
import PostJobDetailsContainer from "../PostJobDetailsContainer";
import CompanyDetailsCa from "../CompanyDetailsCa";
import { TwoColumn, TwoRow } from "../../core/layouts";
import { classes } from "./AllJobsTable.styles";

const AllJobsTable = ({
  current,
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

  const [filterArray, setFilterArray] = useState(
    getValidFilter(urlService.getQueryStringValue(PAGINATION_PROPERTIES.FILTER))
  );

  const [selectedJobId, setSelectedJobId] = useState("");
  const [selectedCompanyId, setCompanyId] = useState("");

  const [openPostedJobModal, setOpenPostedJobModal] = useState(false);
  const [openCompanyDetails, setOpenCompanyDetails] = useState(false);

  const { showNotification, notificationContextHolder } = useShowNotification();

  const { data, error, fetchData, isError, isLoading, setData } = useFetch({
    url: ADMIN_ROUTE + JOBS + SUMMARY,
    otherOptions: { skipApiCallOnMount: true },
  });

  const { approveJob, isLoading: isApproveJobLoading } = useApproveJobApi();
  const {
    data: companyDetailData,
    error: errorWhileGettingCompanyData,
    isLoading: isGettingCompanyData,
    fetchData: getCompanyData,
  } = useFetch({
    url: ADMIN_ROUTE + REGISTERED_COMPANIES + "/" + selectedCompanyId,
    otherOptions: { skipApiCallOnMount: true },
  });

  useEffect(() => {
    if (selectedCompanyId) {
      getCompanyData({});
      setOpenCompanyDetails(true);
    }
  }, [selectedCompanyId]);

  let errorString = error;
  if (typeof error === "object") {
    errorString = error?.data?.message;
  }

  const approvedNotApproved = approval_filter_options;
  const activeInactive = active_filter_options;

  const debounceSearch = useMemo(() => {
    return _.debounce(fetchData, DEBOUNCE_TIME);
  }, []);

  const getRequestedParams = ({ page, perPage, q, updatedFiltersValue }) => {
    return {
      perPage: perPage || pageSize,
      page: page || current,
      search: q || "",
      status: JSON.stringify(updatedFiltersValue?.["1"]),
      approved: JSON.stringify(updatedFiltersValue?.["2"]),
    };
  };

  const onRetry = () => {
    const requestedParams = getRequestedParams({
      updatedFiltersValue: filterArray,
      q: searchedValue,
    });
    fetchData({ queryParamsObject: requestedParams });
  };

  const handleColumnClick = (rowData, columnClicked) => {
    const jobId = rowData?.id;
    if (columnClicked === "applicants") {
      navigate(`job-details/${jobId}?tab=2`);
    }
    if (columnClicked === "scheduled_interview") {
      navigate(`job-details/${jobId}?tab=3`);
    }
    if (columnClicked === "company_name") {
      setCompanyId(rowData?.company_id);
    }
    if (columnClicked === "job_id") {
      setSelectedJobId(jobId);
      setOpenPostedJobModal(true);
    }
  };

  const handleMenuItems = (rowData, item) => {
    if (item.label === "Approve") {
      approveJob(
        rowData?.id,
        () => {
          setData({
            ...data,
            records: data.records.map((record) =>
              record.id === rowData?.id ? { ...record, approve: 1 } : record
            ),
          });
        },
        (errorMessage) => {
          showNotification({ text: errorMessage, type: "error" });
        }
      );
    } else {
      const jobId = rowData?.id;
      navigate(`job-details/${jobId}`);
    }
  };

  const columns = getQueryColumn({
    intl,
    getImage,
    navigate,
    renderColumn,
    handleMenuItems,
    handleColumnClick,
  });

  const handleOnUserSearch = (str) => {
    setSearchedValue(str);
    if (str?.trim()?.length > 2) {
      debounceSearch({
        queryParamsObject: getRequestedParams({
          page: 1,
          q: validateSearchTextLength(str),
        }),
      });
      urlService.setQueryStringValue(PAGINATION_PROPERTIES.SEARCH_QUERY, str);
    }
    if (
      !str?.trim() &&
      urlService.getQueryStringValue(PAGINATION_PROPERTIES.SEARCH_QUERY)
    ) {
      debounceSearch({
        queryParamsObject: getRequestedParams({
          page: 1,
          q: "",
        }),
      });
      urlService.removeParam(PAGINATION_PROPERTIES.SEARCH_QUERY);
    }
  };

  const onChangePageSize = (size) => {
    setPageSize(size);
    setCurrent(1);
    const queryParams = {
      [PAGINATION_PROPERTIES.ROW_PER_PAGE]: size,
      [PAGINATION_PROPERTIES.CURRENT_PAGE]: 1,
    };
    urlService.setMultipleQueryStringValues(queryParams);
    const requestedParams = getRequestedParams({
      perPage: size,
      page: 1,
      updatedFiltersValue: filterArray,
      q: searchedValue,
    });
    fetchData({ queryParamsObject: requestedParams });
  };

  const onChangeCurrentPage = (newPageNumber) => {
    setCurrent(newPageNumber);
    urlService.setQueryStringValue(
      PAGINATION_PROPERTIES.CURRENT_PAGE,
      newPageNumber
    );
    const requestedParams = getRequestedParams({
      page: newPageNumber,
      q: searchedValue,
      updatedFiltersValue: filterArray,
    });
    fetchData({ queryParamsObject: requestedParams });
  };

  const handleOnFilterApply = (updatedFiltersValue) => {
    setCurrent(1);
    let arrayAsString = filterArray?.length ? JSON.stringify(filterArray) : "";

    urlService.setQueryStringValue(
      PAGINATION_PROPERTIES.FILTER,
      encodeURIComponent(arrayAsString)
    );
    const requestedParams = getRequestedParams({
      updatedFiltersValue,
      page: 1,
      q: searchedValue,
    });
    fetchData({ queryParamsObject: requestedParams });
  };

  const approvedNotApprovedOptions = useMemo(() => {
    return approvedNotApproved?.map((item) => ({
      optionId: item.id,
      str: item.name,
    }));
  }, [approvedNotApproved]);

  const activeInactiveOptions = useMemo(() => {
    return activeInactive?.map((item) => ({
      optionId: item.id,
      str: item.name,
    }));
  }, [activeInactive]);

  const filterOptions = [
    {
      id: 1,
      name: "Active/Inactive",
      isSelected: false,
      options: activeInactiveOptions,
    },
    {
      id: 2,
      name: "Approved/Not Approved",
      isSelected: false,
      options: approvedNotApprovedOptions,
    },
  ];

  const resetQueryListingData = (ticketsResult) => {
    if (ticketsResult?.meta?.total) {
      const totalRecords = ticketsResult?.meta?.total;
      const numberOfPages = Math.ceil(totalRecords / pageSize);
      if (current > numberOfPages) {
        fetchData({
          queryParamsObject: getRequestedParams({
            page: 1,
            search: searchedValue,
            updatedFiltersValue: filterArray,
          }),
        });
        urlService.setQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
        setCurrent(1);
      }
    }
  };

  useEffect(() => {
    let arrayAsString = JSON.stringify(filterArray);
    const defaultQueryParams = {
      [PAGINATION_PROPERTIES.CURRENT_PAGE]: current,
      [PAGINATION_PROPERTIES.ROW_PER_PAGE]: pageSize,
      [PAGINATION_PROPERTIES.FILTER]: encodeURIComponent(arrayAsString),
      [PAGINATION_PROPERTIES.SEARCH_QUERY]: searchedValue,
    };
    urlService.setMultipleQueryStringValues(defaultQueryParams);

    const requestedParams = getRequestedParams({
      updatedFiltersValue: filterArray,
      q: searchedValue,
    });
    fetchData({
      queryParamsObject: requestedParams,
      onSuccessCallback: resetQueryListingData,
    });
  }, []);

  const downloadJobsList = (dataToBeDownloaded) => {};

  const renderDownloadBtn = () => {
    return (
      <CustomButton
        btnText={intl.formatMessage({ id: "label.downloadJobList" })}
        IconElement={ArrowDown}
        iconStyles={styles.btnIconStyles}
        customStyle={styles.greyBtnCustomStyles}
        onClick={() => downloadJobsList(data?.records)}
      />
    );
  };

  const isEditCompanyAvailable = true;
  const handleOnCancel = () => {
    setOpenCompanyDetails(false);
    setCompanyId("");
  };

  return (
    <>
      {notificationContextHolder}
      {openPostedJobModal ? (
        <CommonModal isOpen={openPostedJobModal} width={1200}>
          <PostJobDetailsContainer
            jobId={selectedJobId}
            setIsModalOpen={setOpenPostedJobModal}
          />
        </CommonModal>
      ) : null}
      {openCompanyDetails ? (
        <CommonModal isOpen={openCompanyDetails} width={1200}>
          <TwoRow
            className={styles.modalContainerStyle}
            topSection={
              <TwoColumn
                isLeftFillSpace
                leftSection={
                  <Typography className={styles.headerText}>
                    {/* {intl.formatMessage({ id: "label.postedJobDetails" })} */}
                  </Typography>
                }
                rightSection={
                  <Image
                    src={getImage("cross")}
                    preview={false}
                    onClick={() => handleOnCancel()}
                    className={styles.crossIcon}
                    style={classes.crossIcon}
                  />
                }
              />
            }
            bottomSection={
              <div style={classes.customMainStyles}>
                <div className={styles.companyDetailWrapper}>
                  <CompanyDetailsCa
                    {...{
                      data: companyDetailData,
                      errorWhileGettingCompanyData,
                      isGettingCompanyData,
                      getCompanyData,
                      isEditCompanyAvailable,
                    }}
                  />
                </div>
              </div>
            }
          />
        </CommonModal>
      ) : null}
      {!isError && (
        <TableWithSearchAndFilters
          {...{
            columns,
            current,
            filterArray,
            filterOptions,
            handleOnUserSearch,
            pageSize,
            searchedValue,
            setFilterArray,
            onChangeCurrentPage,
            onChangePageSize,
            placeholder: intl.formatMessage({
              id: "label.designation_or_job_id",
            }),
          }}
          isLoading={isLoading}
          rightSection={renderDownloadBtn()}
          data={data?.records}
          currentDataLength={data?.meta?.total}
          onFilterApply={handleOnFilterApply}
        />
      )}
      {isError && (
        <div className={styles.errorContainer}>
          <ErrorMessageBox
            {...{ onRetry }}
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

AllJobsTable.defaultProps = {
  pageSize: DEFAULT_PAGE_SIZE,
  queryListingProps: {},
  setCurrent: () => {},
  setPageSize: () => {},
  ticketListingProps: {},
  searchedValue: "",
  setSearchedValue: () => {},
};

AllJobsTable.propTypes = {
  current: PropTypes.number,
  pageSize: PropTypes.number,
  queryListingProps: PropTypes.object,
  setCurrent: PropTypes.func,
  setPageSize: PropTypes.func,
  ticketListingProps: PropTypes.object,
  searchedValue: PropTypes.string,
  setSearchedValue: PropTypes.func,
};

export default AllJobsTable;
