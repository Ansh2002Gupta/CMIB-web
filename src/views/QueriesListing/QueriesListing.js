import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useSearchParams } from "react-router-dom";

import TwoRow from "../../core/layouts/TwoRow/TwoRow";

import ContentHeader from "../../containers/ContentHeader/ContentHeader";
import QueryTable from "../../containers/QueryTable/QueryTable";
import { getValidPageNumber, getValidPageSize } from "../../constant/utils";
import { PAGINATION_PROPERTIES } from "../../constant/constant";
import styles from "./QueriesListing.module.scss"

const QueriesListing = () => {
  const intl = useIntl();
  const [searchParams] = useSearchParams();
  const [current, setCurrent] = useState(
    getValidPageNumber(searchParams.get(PAGINATION_PROPERTIES.CURRENT_PAGE))
  );
  const [pageSize, setPageSize] = useState(
    getValidPageSize(searchParams.get(PAGINATION_PROPERTIES.ROW_PER_PAGE))
  );
  const [searchedValue, setSearchedValue] = useState(
    searchParams.get(PAGINATION_PROPERTIES.SEARCH_QUERY) || ""
  );

  return (
    <TwoRow
      topSection={
        <ContentHeader
          headerText={intl.formatMessage({
            id: "label.queries",
          })}
          isLeftFillSpace
          customStyles={styles.container}
          customContainerStyle={styles.parentContainer}
        />
      }
      isBottomFillSpace
      bottomSection={
        <QueryTable
          {...{
            current,
            pageSize,
            setCurrent,
            setPageSize,
            searchedValue,
            setSearchedValue,
          }}
        />
      }
    />
  );
};

export default QueriesListing;
