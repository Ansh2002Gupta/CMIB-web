import React, { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import Typography from "antd/es/typography/Typography";
import { Checkbox } from "antd";

import Base from "../../core/layouts/Base/Base";

import { PERMISION_AND_ROLE } from "../../dummyData";
import styles from "./CheckBoxList.module.scss";
import "./override.css";

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

  const controlModuleId = useMemo(() => {
    return PERMISION_AND_ROLE?.data?.filter(
      (item) => item.slug === "control"
    )[0].id;
  }, []);

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
      <Typography>
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
      {getTextWithStar(intl.formatMessage({ id: "label.moduleAccess" }))}
      <div className={styles.container}>
        <Checkbox
          className={styles.box}
          onChange={() =>
            handleSelectAll(
              areAllModulesSelected,
              setSelectedModules,
              PERMISION_AND_ROLE?.data
            )
          }
          checked={areAllModulesSelected}
        >
          <Typography>{intl.formatMessage({ id: "label.all" })}</Typography>
        </Checkbox>
        {PERMISION_AND_ROLE?.data?.map((item) => {
          return (
            <Checkbox
              key={item.id}
              className={[styles.box].join(" ")}
              onChange={() =>
                handleSelect(selectedModules, setSelectedModules, item.id)
              }
              checked={selectedModules.includes(item.id)}
            >
              <Typography>{item.name}</Typography>
            </Checkbox>
          );
        })}
      </div>
      {selectedModules.includes(controlModuleId) && (
        <>
          {getTextWithStar(
            intl.formatMessage({ id: "label.controlAccessHeading" })
          )}
          <div className={styles.container}>
            <Checkbox
              className={styles.box}
              onChange={() =>
                handleSelectAll(
                  areAllControlsSelected,
                  setSelectedControls,
                  PERMISION_AND_ROLE?.data[0]?.permissions
                )
              }
              checked={areAllControlsSelected}
            >
              <Typography>{intl.formatMessage({ id: "label.all" })}</Typography>
            </Checkbox>
            {PERMISION_AND_ROLE?.data[0]?.permissions?.map((item) => {
              return (
                <Checkbox
                  key={item.id}
                  className={styles.box}
                  onChange={() =>
                    handleSelect(selectedControls, setSelectedControls, item.id)
                  }
                  checked={selectedControls.includes(item.id)}
                >
                  <Typography>{item.name}</Typography>
                </Checkbox>
              );
            })}
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
