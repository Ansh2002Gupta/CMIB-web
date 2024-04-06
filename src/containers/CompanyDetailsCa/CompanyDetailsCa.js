import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";

import { TwoRow } from "../../core/layouts";

import DetailsCard from "../DetailsCard";
import useFetch from "../../core/hooks/useFetch";
import { useCompanyDetailsCa } from "./useCompanyDetailsCa";
import { COMPANY_ROUTE, JOBS } from "../../constant/apiEndpoints";
import CustomGrid from "../../components/CustomGrid/CustomGrid";
import styles from "./CompanyDetailsCa.module.scss";

const CompanyDetailsCa = () => {
  const intl = useIntl();
  const { companyId } = useParams();
  const isEditable = false;
  const { data, error, isLoading } = useFetch({
    url: COMPANY_ROUTE + JOBS + "/" + companyId,
  });

  const getData = (data) =>
    data && Object.keys(data)?.length
      ? {
          company_name: data?.company?.name,
        }
      : {};

  const [state, setState] = useState(getData(data));

  useEffect(() => {
    setState(getData(data));
  }, [data]);

  const { company_details_data } = useCompanyDetailsCa({
    state,
    isEditable,
  });

  console.log(data, "data..");

  return (
    <div className={styles.mainContainer}>
      <DetailsCard
        headerText={intl.formatMessage({ id: "label.companyDetails" })}
        details={company_details_data}
      />
    </div>
  );
};
export default CompanyDetailsCa;
