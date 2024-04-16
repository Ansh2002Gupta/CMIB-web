import { useEffect, useMemo, useState } from "react";
import useFetch from "../../core/hooks/useFetch";
import _ from "lodash";
import { usePatch } from "../../core/hooks/useApiRequest";
import { EMAIL_REGEX } from "../../constant/regex";
import { useIntl } from "react-intl";
import useShowNotification from "../../core/hooks/useShowNotification";
import { NOTIFICATION_TYPES } from "../../constant/constant";
import {
  ADMIN_ROUTE,
  QUERY_TYPE,
  QUERY_TYPES,
} from "../../constant/apiEndpoints";

const queryRow = (intl) => [
  {
    key: "candidate_email",
    label: intl.formatMessage({ id: "label.candidateEmailLabel" }),
    placeholder: intl.formatMessage({ id: "label.candidateEmailPlaceholder" }),
    isRequired: true,
    validate: (value) => {
      if (!value) {
        return intl.formatMessage({ id: "label.fieldRequired" });
      }
      if (value && !EMAIL_REGEX.test(value)) {
        return intl.formatMessage({ id: "label.invalidEmail" });
      }
    },
  },
  {
    key: "company_email",
    label: intl.formatMessage({ id: "label.companyEmailLabel" }),
    placeholder: intl.formatMessage({ id: "label.companyEmailPlaceholder" }),
    isRequired: true,
    validate: (value) => {
      if (!value) {
        return intl.formatMessage({ id: "label.fieldRequired" });
      }
      if (value && !EMAIL_REGEX.test(value)) {
        return intl.formatMessage({ id: "label.invalidEmail" });
      }
    },
  },
  {
    key: "default_ticket_assignee",
    label: intl.formatMessage({ id: "label.selectassignee" }),
    placeholder: intl.formatMessage({ id: "label.selectassignee" }),
    isDropdown: true,
  },
];

const addValueOnData = (state, data) => {
  return data?.map((item) => {
    const { slug, row } = item;
    let rowWithValue = row.map((field) => {
      const { key, isDropdown } = field;
      const defaultVal = isDropdown ? [] : "";
      return { ...field, value: state?.[slug]?.[key] ?? defaultVal };
    });
    return { ...item, row: rowWithValue };
  });
};

const useSupportEmailEdit = () => {
  const intl = useIntl();
  const [state, setState] = useState({});
  const [fieldError, setFieldError] = useState({});
  const { showNotification, notificationContextHolder } = useShowNotification();

  const {
    data,
    isLoading: isSupportDataLoading,
    fetchData: fetchSupportData,
    error: supportDataError,
  } = useFetch({
    url: ADMIN_ROUTE + QUERY_TYPE,
  });

  const { makeRequest: updateSupportData, isLoading: isSaveDataLoading } =
    usePatch({ url: ADMIN_ROUTE + QUERY_TYPES });

  useEffect(() => {
    setSupportData();
  }, [data]);

  const setSupportData = () => {
    let formattedData = data?.reduce((prev, val) => {
      const { slug, company_email, candidate_email, assignee } = val;
      return {
        ...prev,
        [slug]: {
          company_email,
          candidate_email,
          default_ticket_assignee: assignee
            ? [
                {
                  id: assignee?.id,
                  name: assignee?.name,
                  label: assignee?.name,
                },
              ]
            : [],
        },
      };
    }, {});
    setState({ ...formattedData });
  };

  const formattedData = useMemo(() => {
    if (!data) return [];

    return data?.map((value) => {
      return {
        name: value?.name,
        slug: value?.slug,
        row: [...queryRow(intl)].map((field) => {
          return {
            ...field,
            error: fieldError[`${value?.slug}:${field?.key}`],
          };
        }),
      };
    });
  }, [data, intl, fieldError]);

  const handleChangeData = (value, key, slug) => {
    state[slug] = {
      ...state[slug],
      [key]: value,
    };
    setState({ ...state });

    let errorKey = `${slug}:${key}`;
    setFieldError({ ...fieldError, [errorKey]: "" });
  };

  const handleSaveDetails = () => {
    let body = Object.entries(state).map((item) => {
      const [key, supportData] = item;
      return {
        slug: key,
        ...supportData,
        default_ticket_assignee:
          supportData?.default_ticket_assignee[0]?.id ?? null,
      };
    });

    updateSupportData({
      body,
      onSuccessCallback: () => {
        fetchSupportData({});
      },
      onErrorCallback: (errorMessage) => {
        showNotification({
          text: errorMessage,
          type: NOTIFICATION_TYPES.ERROR,
        });
      },
    });
  };

  const handleCancel = () => {
    fetchSupportData({});
  };

  const handleBlur = (key, slug) => {
    formattedData?.forEach(({ row }) => {
      row?.forEach((field) => {
        if (field?.validate) {
          setFieldError({
            ...fieldError,
            [`${slug}:${key}`]: field?.validate(state[slug][key]),
          });
        }
      });
    });
  };

  const isSaveButtonEnabled = () => {
    let isError = false;
    formattedData?.forEach(({ row, slug }) => {
      row?.forEach((field) => {
        const { validate, key, isRequired } = field;
        if (
          (isRequired && !state?.[slug]?.[key]) ||
          (validate && Boolean(validate(state[slug][key])))
        ) {
          isError = true;
        }
      });
    });
    return isError;
  };

  return {
    data: addValueOnData(state, formattedData),
    handleChangeData,
    handleSaveDetails,
    isSupportDataLoading,
    isSaveDataLoading,
    handleCancel,
    handleBlur,
    notificationContextHolder,
    supportDataError,
    fetchSupportData,
    isSaveButtonEnabled: isSaveButtonEnabled(),
  };
};

export default useSupportEmailEdit;
