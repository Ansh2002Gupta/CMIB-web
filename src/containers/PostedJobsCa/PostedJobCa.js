import React, { useContext, useEffect, useState, useMemo } from "react";
import { useIntl } from "react-intl";
import * as _ from "lodash";

import { ThemeContext } from "core/providers/theme";
import { TwoRow } from "../../core/layouts";

import CommonModal from "../../components/CommonModal";
import CustomLoader from "../../components/CustomLoader/CustomLoader";
import DataTable from "../../components/DataTable";
import ErrorMessageBox from "../../components/ErrorMessageBox/ErrorMessageBox";
import PostJobDetailsContainer from "../PostJobDetailsContainer";
import SearchableComponent from "../../components/SearchableComponent";
import SearchFilter from "../../components/SearchFilter";
import getJobsColumn from "./PostedJobsConfig";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import useFetch from "../../core/hooks/useFetch";
import { usePatch } from "../../core/hooks/useApiRequest";
import { urlService } from "../../Utils/urlService";
import {
  getValidPageNumber,
  getValidPageSize,
  getValidFilter,
} from "../../constant/utils";
import { validateSearchTextLength } from "../../Utils/validations";
import { DEBOUNCE_TIME, PAGINATION_PROPERTIES } from "../../constant/constant";
import {
  APPROVE,
  ADMIN_ROUTE,
  CHANGE_STATUS,
  JOBS,
  SUMMARY,
} from "../../constant/apiEndpoints";
import styles from "./PostedJobsCa.module.scss";
import { useNavigate } from "react-router-dom";
import { Typography } from "antd";

const PostedJobsCa = () => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);
  const [currentDataLength, setCurrentDataLength] = useState(0);
  const [postedJobModal, setPostedJobModal] = useState(false);
  const [jobId, setJobId] = useState();
  const [showFilters, setShowFilters] = useState(false);

  const [filterArray, setFilterArray] = useState(
    getValidFilter(urlService.getQueryStringValue(PAGINATION_PROPERTIES.FILTER))
  );
  const [current, setCurrent] = useState(
    getValidPageNumber(
      urlService.getQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE)
    )
  );
  const [pageSize, setPageSize] = useState(
    getValidPageSize(
      urlService.getQueryStringValue(PAGINATION_PROPERTIES.ROW_PER_PAGE)
    )
  );
  const [searchedValue, setSearchedValue] = useState(
    urlService.getQueryStringValue(PAGINATION_PROPERTIES.SEARCH_QUERY) || ""
  );
  const navigate = useNavigate();

  const { renderColumn } = useRenderColumn();

  const {
    data: jobListingData,
    error: jobListError,
    fetchData: getJobListing,
    isError: isErrorWhileGettingJobs,
    isLoading: isGettingJobs,
    setData: setJobListingData,
  } = useFetch({
    url: ADMIN_ROUTE + JOBS + SUMMARY,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const { makeRequest: changeStatus, isLoading: isStatusChanging } = usePatch(
    {}
  );

  const { makeRequest: handleApproveJob, isLoading: isJobApproving } = usePatch(
    {}
  );

  useEffect(() => {
    getJobListing({
      queryParamsObject: getRequestedParams({
        page: current,
        search: validateSearchTextLength(searchedValue),
        size: +pageSize,
        status: filterArray["status"],
        approved: filterArray["approved"],
      }),
    });
  }, []);

  const debounceSearch = useMemo(() => {
    return _.debounce(getJobListing, DEBOUNCE_TIME);
  }, []);

  const getRequestedParams = ({ page, search, size, status, approved }) => {
    return {
      perPage: size || pageSize,
      page: page || current,
      search: search || "",
      status: status || [],
      approved: approved || [],
    };
  };

  const onFilterApply = (currentFilterStatus) => {
    setFilterArray(currentFilterStatus);
    urlService.setQueryStringValue(
      PAGINATION_PROPERTIES.FILTER,
      encodeURIComponent(JSON.stringify(currentFilterStatus))
    );
    getJobListing({
      queryParamsObject: getRequestedParams({
        search: validateSearchTextLength(searchedValue),
        status: currentFilterStatus["status"],
        approved: currentFilterStatus["approved"],
      }),
    });
  };

  const onMenuClick = (data, item) => {
    if (item === 1) {
      setPostedJobModal(true);
      setJobId(data?.id);
    }
    if (item === 2) {
      handleApproveJob({
        overrideUrl: ADMIN_ROUTE + JOBS + `/${data?.id}` + APPROVE,
        onSuccessCallback: setJobListingData({
          ...jobListingData,
          records: jobListingData.records.map((record) =>
            record.id === data?.id
              ? { ...record, approve: data?.approve ? 0 : 1 }
              : record
          ),
        }),
      });
    }
  };

  const onHandleJobStatus = (data) => {
    changeStatus({
      overrideUrl: ADMIN_ROUTE + JOBS + `/${data?.id}` + CHANGE_STATUS,
      onSuccessCallback: () => {
        setJobListingData({
          ...jobListingData,
          records: jobListingData.records.map((record) =>
            record.id === data?.id
              ? { ...record, status: !data?.status }
              : record
          ),
        });
      },
    });
  };

  const columns = getJobsColumn({
    intl,
    isStatusChanging,
    getImage,
    onMenuClick,
    renderColumn,
    onHandleJobStatus,
  });

  const onChangePageSize = (size) => {
    setPageSize(Number(size));
    setCurrent(1);
    urlService.setQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
    urlService.setQueryStringValue(PAGINATION_PROPERTIES.ROW_PER_PAGE, size);
    getJobListing({
      queryParamsObject: getRequestedParams({
        page: 1,
        search: validateSearchTextLength(searchedValue),
        size: +size,
        status: filterArray["status"],
        approved: filterArray["approved"],
      }),
    });
  };

  const onChangeCurrentPage = (newPageNumber) => {
    setCurrent(newPageNumber);
    urlService.setQueryStringValue(
      PAGINATION_PROPERTIES.CURRENT_PAGE,
      newPageNumber
    );

    getJobListing({
      queryParamsObject: getRequestedParams({
        page: newPageNumber,
        search: validateSearchTextLength(searchedValue),
        status: filterArray["status"],
        approved: filterArray["approved"],
      }),
    });
  };

  const handleOnUserSearch = (str) => {
    setCurrent(1);
    if (str?.trim()?.length > 2) {
      debounceSearch({
        queryParamsObject: getRequestedParams({
          page: 1,
          search: validateSearchTextLength(str),
          status: filterArray["status"],
          approved: filterArray["approved"],
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
        queryParamsObject: getRequestedParams({
          page: 1,
          search: "",
          status: filterArray["status"],
          approved: filterArray["approved"],
        }),
      });
      urlService.removeParam(PAGINATION_PROPERTIES.SEARCH_QUERY);
      urlService.setQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
    }
    setSearchedValue(str);
  };

  const handleTryAgain = () => {
    getJobListing({
      queryParamsObject: getRequestedParams({
        search: validateSearchTextLength(searchedValue),
        status: filterArray["status"],
        approved: filterArray["approved"],
      }),
    });
  };

  useEffect(() => {
    if (jobListingData?.meta) {
      const { total } = jobListingData?.meta;
      const numberOfPages = Math.ceil(total / pageSize);
      if (current > numberOfPages || current <= 0) {
        setCurrent(1);
        urlService.setQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE, 1);
        getJobListing({
          queryParamsObject: getRequestedParams({
            page: 1,
            search: validateSearchTextLength(searchedValue),
            size: +pageSize,
            status: filterArray["status"],
            approved: filterArray["approved"],
          }),
        });
      }
    }
  }, [jobListingData?.meta?.total]);

  useEffect(() => {
    const validPageSize = getValidPageSize(
      urlService.getQueryStringValue(PAGINATION_PROPERTIES.ROW_PER_PAGE)
    );
    const validPageNumber = getValidPageNumber(
      urlService.getQueryStringValue(PAGINATION_PROPERTIES.CURRENT_PAGE)
    );
    const defaultQueryParams = {
      [PAGINATION_PROPERTIES.CURRENT_PAGE]: validPageNumber,
      [PAGINATION_PROPERTIES.ROW_PER_PAGE]: validPageSize,
    };
    urlService.setMultipleQueryStringValues(defaultQueryParams);
  }, []);

  useEffect(() => {
    return () => {
      setSearchedValue("");
    };
  }, []);

  const filterPropertiesArray = [
    {
      id: "status",
      name: intl.formatMessage({ id: "label.activeInactive" }),
      isSelected: false,
      options: [
        {
          optionId: 1,
          str: intl.formatMessage({ id: "label.active" }),
        },
        {
          optionId: 0,
          str: intl.formatMessage({ id: "label.inactive" }),
        },
      ],
    },
    {
      id: "approved",
      name: intl.formatMessage({ id: "label.approved_not_approved" }),
      isSelected: false,
      options: [
        {
          optionId: 1,
          str: intl.formatMessage({ id: "label.approved" }),
        },
        {
          optionId: 0,
          str: intl.formatMessage({ id: "label.not_approved" }),
        },
      ],
    },
  ];

  return (
    <>
      {
        <CommonModal isOpen={postedJobModal} width={1200}>
          <PostJobDetailsContainer
            jobId={jobId}
            setIsModalOpen={setPostedJobModal}
          />
        </CommonModal>
      }
      {isGettingJobs && <CustomLoader />}
      {isErrorWhileGettingJobs && (
        <div className={styles.box}>
          <ErrorMessageBox
            onRetry={handleTryAgain}
            errorText={jobListError?.data?.message || jobListError}
            errorHeading={intl.formatMessage({ id: "label.error" })}
          />
        </div>
      )}
      {jobListingData && !isGettingJobs && !isErrorWhileGettingJobs && (
        <TwoRow
          className={styles.mainContainer}
          topSection={
            <div className={styles.filterContainer}>
              <SearchableComponent
                customSearchBar={styles.customSearchBar}
                {...{ searchedValue, handleOnUserSearch }}
                placeholder={intl.formatMessage({
                  id: "label.designation_or_job_id",
                })}
              />
              <div style={{ flex: 1 }}>
                <SearchFilter
                  {...{
                    filterPropertiesArray,
                    filterArray,
                    showFilters,
                    onFilterApply,
                    setShowFilters,
                  }}
                />
              </div>
            </div>
          }
          bottomSection={
            <DataTable
              {...{
                columns,
                pageSize,
                current,
                currentDataLength,
                onChangePageSize,
                onChangeCurrentPage,
              }}
              currentDataLength={jobListingData?.meta?.total}
              customContainerStyles={styles.customContainerStyles}
              originalData={jobListingData?.records || []}
            />
          }
        />
      )}
    </>
  );
};

export default PostedJobsCa;
