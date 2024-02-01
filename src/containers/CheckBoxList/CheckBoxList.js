import React, { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import Typography from "antd/es/typography/Typography";

import Base from "../../core/layouts/Base/Base";

import CustomCheckBox from "../../components/CustomCheckBox";
import useFetch from "../../core/hooks/useFetch";
import { ADMIN_ROUTE, ROLES_PERMISSION } from "../../constant/apiEndpoints";
import { allModuleIdObject } from "../../constant/constant";
import { PERMISION_AND_ROLE } from "../../dummyData";
import styles from "./CheckBoxList.module.scss";

const CheckBoxList = ({
  selectedControls,
  selectedModules,
  setIsAccessValid,
  setSelectedControls,
  setSelectedModules,
}) => {
  const intl = useIntl();
  const areAllModulesSelected =
    selectedModules.length === PERMISION_AND_ROLE.data.length;
  const areAllControlsSelected =
    selectedControls.length === PERMISION_AND_ROLE.data[0].permissions.length;

  const controlModuleId = allModuleIdObject.control;

  const {
    data: rolesData,
    error,
    fetchData,
    isError,
    isLoading,
    isSuccess,
  } = useFetch({
    url: ADMIN_ROUTE + ROLES_PERMISSION,
  });

  const handleSelect = (selectedOptionArray, setSelectedOptionArray, id) => {
    if (selectedOptionArray.includes(id)) {
      const updatedData = selectedOptionArray.filter(
        (selectedId) => selectedId !== id
      );
      setSelectedOptionArray(updatedData);
      return;
    }
    setSelectedOptionArray([...selectedOptionArray, id]);
  };

  const handleSelectAll = (
    areAllElementSelected,
    setSelectedOptionArray,
    arrayOfAllValidId
  ) => {
    const arrayOfAllId = arrayOfAllValidId
      ?.filter((item) => !areAllElementSelected)
      ?.map((item) => item.id);
    setSelectedOptionArray(arrayOfAllId);
  };

  const getTextWithStar = (text) => {
    return (
      <Typography className={styles.label}>
        {text} <span className={styles.isRequired}>*</span>
      </Typography>
    );
  };

  useEffect(() => {
    if (selectedModules.includes(controlModuleId)) {
      setIsAccessValid(!!selectedControls?.length);
    } else {
      setSelectedControls([]);
      setIsAccessValid(!!selectedModules?.length);
    }
  }, [selectedModules?.length, selectedControls?.length]);

  return (
    <Base className={styles.parentContainer}>
      {getTextWithStar(intl.formatMessage({ id: "label.access" }))}
      <div className={styles.container}>
        {Object.entries(rolesData?.roles || {})?.map(([index, item]) => {
          return (
            <CustomCheckBox
              disabled={item.disabled}
              key={item.id}
              className={[styles.box].join(" ")}
              onChange={() =>
                handleSelect(selectedModules, setSelectedModules, item.id)
              }
              checked={selectedModules.includes(item.id)}
            >
              <Typography className={styles.text}>{item.name}</Typography>
            </CustomCheckBox>
          );
        })}
      </div>
      {selectedModules.includes(controlModuleId) && (
        <>
          {getTextWithStar(
            intl.formatMessage({ id: "label.controlAccessHeading" })
          )}
          <div className={styles.container}>
            {Object.entries(rolesData?.permissions || {})?.map(
              ([index, item]) => {
                return (
                  <CustomCheckBox
                    disabled={item.disabled}
                    key={item.id}
                    className={styles.box}
                    onChange={() =>
                      handleSelect(
                        selectedControls,
                        setSelectedControls,
                        item.id
                      )
                    }
                    checked={
                      selectedControls && selectedControls.includes(item.id)
                    }
                  >
                    <Typography className={styles.text}>{item.name}</Typography>
                  </CustomCheckBox>
                );
              }
            )}
          </div>
        </>
      )}
    </Base>
  );
};

CheckBoxList.defaultProps = {
  setIsAccessValid: () => {},
  selectedControls: [],
  selectedModules: [],
  setSelectedControls: () => {},
  setSelectedModules: () => {},
};

CheckBoxList.propTypes = {
  setIsAccessValid: PropTypes.func,
  selectedControls: PropTypes.array,
  selectedModules: PropTypes.array,
  setSelectedControls: PropTypes.func,
  setSelectedModules: PropTypes.func,
};

export default CheckBoxList;
