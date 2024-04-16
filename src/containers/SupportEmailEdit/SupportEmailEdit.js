import React from "react";
import useSupportEmailEdit from "./useSupportEmailEdit";
import _ from "lodash";
import SupportEmailTemplate from "./SupportEmailTemplate";

const SupportEmailEdit = ({}) => {
  const {
    data,
    isSupportDataLoading,
    handleChangeData,
    handleSaveDetails,
    isSaveDataLoading,
    handleCancel,
    handleBlur,
    notificationContextHolder,
    supportDataError,
    fetchSupportData,
    isSaveButtonEnabled,
  } = useSupportEmailEdit();

  return (
    <>
      {notificationContextHolder}
      <SupportEmailTemplate
        {...{
          data,
          isSupportDataLoading,
          handleChangeData,
          handleSaveDetails,
          isSaveDataLoading,
          handleCancel,
          handleBlur,
          supportDataError,
          fetchSupportData,
          isSaveButtonEnabled,
        }}
      />
    </>
  );
};

export default SupportEmailEdit;
