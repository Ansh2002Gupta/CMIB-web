import React, { useMemo, useRef } from "react";
import SearchableDropDown from "../../components/SearchableDropDown";
import _ from "lodash";
import useFetch from "../../core/hooks/useFetch";
import { DEBOUNCE_TIME } from "../../constant/constant";
import {
  ASSIGNEES,
  CORE_ROUTE,
  TICKET_LIST,
} from "../../constant/apiEndpoints";

const SupportAssigneeDropdown = ({
  label,
  placeholder,
  style,
  handleChangeData,
  value = [],
}) => {
  const {
    data,
    fetchData: fetchMoreAssignee,
    isLoading: isAssingeeLoading,
    error,
  } = useFetch({
    url: CORE_ROUTE + TICKET_LIST + ASSIGNEES,
    otherOptions: {
      skipApiCallOnMount: true,
    },
  });

  const selectRef = useRef();

  const assigneeData = useMemo(() => {
    return data?.records?.map((val) => {
      return {
        id: val?.id,
        label: val?.name,
        value: val?.name,
      };
    });
  }, [data]);

  const handleSelectAssignee = (_, option) => {
    handleChangeData(option);
    setTimeout(() => {
      selectRef.current.blur();
    }, 150);
  };

  const handleDeselectAssignee = (item) => {
    const updatedAssignee = value?.filter((ele) => ele.id !== item.id);
    handleChangeData(updatedAssignee);
  };

  const handleSearch = (val) => {
    fetchMoreAssignee({ queryParamsObject: { q: val } });
  };

  const handleAssigneeSearch = useMemo(() => {
    return _.debounce(handleSearch, DEBOUNCE_TIME);
  }, [handleSearch]);

  const handleClickOnSearchField = () => {
    fetchMoreAssignee({});
  };

  return (
    <div className={style}>
      <SearchableDropDown
        ref={selectRef}
        errorMessage={error?.data?.message ?? ""}
        onSelectItem={handleSelectAssignee}
        onRemoveItem={handleDeselectAssignee}
        options={assigneeData}
        onSearch={handleAssigneeSearch}
        placeholderText={placeholder ?? ""}
        title={label ?? ""}
        loading={isAssingeeLoading}
        selectedOptionsList={value ?? []}
        onClickField={handleClickOnSearchField}
      />
    </div>
  );
};

export default SupportAssigneeDropdown;
