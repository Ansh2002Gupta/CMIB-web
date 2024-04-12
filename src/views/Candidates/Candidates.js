import React, { useState } from "react";

import TwoRow from "../../core/layouts/TwoRow/TwoRow";

import styles from "./Candidates.module.scss";
import CandidateHeader from "../../containers/Candidate/CandidateHeader";
import CandidateTable from "../../containers/Candidate/CandidateTableList/CandidateTable";
import { getValidPageNumber, getValidPageSize } from "../../constant/utils";
import { urlService } from "../../Utils/urlService";
import { PAGINATION_PROPERTIES } from "../../constant/constant";

const Candidates = () => {
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
  return (
    <TwoRow
      isBottomFillSpace
      className={styles.baseLayout}
      topSection={<CandidateHeader />}
      bottomSection={
        <CandidateTable
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

export default Candidates;
