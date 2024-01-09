import React from "react";
import { useParams } from "react-router-dom";
import { Spin } from "antd";

import TwoRow from "../../core/layouts/TwoRow/TwoRow";

import QueryDetailsHeader from "../../containers/QueryDetailsHeader";
import QueryDetailsContent from "../../containers/QueryDetailsContent";
import useFetch from "../../core/hooks/useFetch";
import { ADMIN_ROUTE, QUERY_END_POINT } from "../../constant/apiEndpoints";
import styles from "./QueryDetails.module.scss";

// TODO: change folder structure to new structure as we are using in cmib_app repository.
const QueryDetails = () => {
  const { queryId } = useParams();
  console.log({ queryId });
  const { data, error, fetchData, isError, isLoading, isSuccess } = useFetch({
    url: ADMIN_ROUTE + QUERY_END_POINT + "/" + queryId + "/details",
    apiOptions: {
      headers: {
        Accept: "application/json",
      },
    },
  });

  console.log({ data, error, isLoading, isSuccess });

  return (
    <>
      {isLoading && <Spin size="large" />}
      {!isLoading && (
        <TwoRow
          topSection={<QueryDetailsHeader id={data?.id} />}
          bottomSection={<QueryDetailsContent type={data?.type} data={data}/>}
        />
      )}
    </>
  );
};

export default QueryDetails;
