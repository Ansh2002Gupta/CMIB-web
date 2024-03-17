import React, { useContext, useState } from "react";
import { useIntl } from "react-intl";

import { ThemeContext } from "core/providers/theme";

import DataTable from "../../components/DataTable";
import SearchableComponent from "../../components/SearchableComponent";
import getSubscriptionsColumn from "./SubscriptionTableConfig";
import useRenderColumn from "../../core/hooks/useRenderColumn/useRenderColumn";
import { SUBSCRIPTION_DUMMY_DATA } from "../../dummyData";
import styles from "./SubscriptionsTable.module.scss";
import { TwoRow } from "../../core/layouts";

const SubscriptionsTable = () => {
  const intl = useIntl();
  const { getImage } = useContext(ThemeContext);
  const [current, setCurrent] = useState();
  const [pageSize, setPageSize] = useState();
  const [searchedValue, setSearchedValue] = useState("");
  const { renderColumn } = useRenderColumn();

  const goToSubscriptionDetails = () => {};

  const columns = getSubscriptionsColumn(
    intl,
    getImage,
    goToSubscriptionDetails,
    renderColumn
  );

  const onChangePageSize = () => {};

  const onChangeCurrentPage = () => {};

  const handleOnUserSearch = () => {};

  return (
    <TwoRow
      className={styles.mainContainer}
      topSection={
        <SearchableComponent
          {...{ searchedValue, handleOnUserSearch }}
          placeholder={intl.formatMessage({ id: "label.searchPackageName" })}
        />
      }
      bottomSection={
        <DataTable
          {...{
            columns,
            pageSize,
            current,
            onChangePageSize,
            onChangeCurrentPage,
          }}
          customContainerStyles={styles.customContainerStyles}
          originalData={SUBSCRIPTION_DUMMY_DATA || []}
        />
      }
    />
  );
};

export default SubscriptionsTable;
