import React from "react";
import { useParams } from "react-router-dom";
import { useIntl } from "react-intl";

import TwoRow from "../../core/layouts/TwoRow/TwoRow";

import CustomSpinner from "../../components/CustomSpinner";
import QueryDetailsContent from "../../containers/QueryDetailsContent";
import QueryDetailsHeader from "../../containers/QueryDetailsHeader";
import ErrorMessageBox from "../../components/ErrorMessageBox/ErrorMessageBox";
import useFetch from "../../core/hooks/useFetch";
import { getErrorMessage } from "../../constant/utils";
import { ADMIN_ROUTE, QUERY_END_POINT } from "../../constant/apiEndpoints";
import styles from "./QueryDetails.module.scss";

// TODO: change folder structure to new structure as we are using in cmib_app repository.
const QueryDetails = () => {
  const { queryId } = useParams();
  const intl = useIntl();

  const GET_QUERY_URL =
    ADMIN_ROUTE + QUERY_END_POINT + "/" + queryId + "/details";
  const { data, error, fetchData, isError, isLoading, isSuccess } = useFetch({
    url: GET_QUERY_URL,
    apiOptions: {
      headers: {
        Accept: "application/json",
      },
    },
  });

  return (
    <>
      {isLoading && <CustomSpinner />}
      {isError && (
        <div className={styles.errorContainer}>
          <ErrorMessageBox
            errorText={getErrorMessage(error)}
            onClick={fetchData}
            errorHeading={intl.formatMessage({ id: "label.errorOccured" })}
          />
        </div>
      )}
      {isSuccess && (
        <TwoRow
          topSection={<QueryDetailsHeader id={data?.id} />}
          bottomSection={
            <QueryDetailsContent type={data?.type} {...{ data }} />
          }
        />
      )}
    </>
  );
};

export default QueryDetails;
