import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import Typography from "antd/es/typography/Typography";

import Base from "../../core/layouts/Base/Base";

import { PERMISION_AND_ROLE } from "../../dummyData";
import { ReactComponent as CheckedBox } from "../../themes/base/assets/images/checkedBox.svg";
import { ReactComponent as UncheckedBox } from "../../themes/base/assets/images/unCheckedBox.svg";
import styles from "./CheckBoxList.module.scss";

const CheckBoxList = ({ setIsAccessValid }) => {
  const intl = useIntl();
  const [selectedModules, setSelectedModules] = useState([]);
  const [areAllModulesSelected, setAreAllModulesSelected] = useState(false);
  const [selectedControls, setSelectedControls] = useState([]);
  const [areAllControlsSelected, setAreAllControlsSelected] = useState(false);
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
    setSelectedOptionArray((prev) => [...prev, id]);
  };

  const handleSelectAll = (
    areAllElementSelected,
    setSelectedOptionArray,
    setAreAllElementSelected,
    arrayOfAllValidId
  ) => {
    const arrayOfAllId = arrayOfAllValidId
      ?.filter((item) => !areAllElementSelected)
      ?.map((item) => item.id);
    setSelectedOptionArray(arrayOfAllId);
    setAreAllElementSelected((prev) => !prev);
  };

  useEffect(() => {
    if (selectedModules.length === PERMISION_AND_ROLE.data.length) {
      setAreAllModulesSelected(true);
    } else {
      setAreAllModulesSelected(false);
    }

    if (
      selectedControls.length === PERMISION_AND_ROLE.data[0].permissions.length
    ) {
      setAreAllControlsSelected(true);
    } else {
      setAreAllControlsSelected(false);
    }

    if (selectedModules.includes(controlModuleId)) {
      setIsAccessValid(!!selectedControls?.length);
    } else {
      setIsAccessValid(!!selectedModules?.length);
    }
  }, [selectedModules?.length, selectedControls?.length]);

  return (
    <Base className={styles.parentContainer}>
      <Typography>
        {intl.formatMessage({ id: "label.moduleAccess" })}
      </Typography>
      <div className={styles.container}>
        <div
          className={styles.box}
          onClick={() =>
            handleSelectAll(
              areAllModulesSelected,
              setSelectedModules,
              setAreAllModulesSelected,
              PERMISION_AND_ROLE?.data
            )
          }
        >
          {areAllModulesSelected ? <CheckedBox /> : <UncheckedBox />}
          <Typography>{intl.formatMessage({ id: "label.all" })}</Typography>
        </div>
        {PERMISION_AND_ROLE?.data?.map((item) => {
          return (
            <div
              key={item.id}
              className={styles.box}
              onClick={() =>
                handleSelect(selectedModules, setSelectedModules, item.id)
              }
            >
              {selectedModules.includes(item.id) ? (
                <CheckedBox />
              ) : (
                <UncheckedBox />
              )}
              <Typography>{item.name}</Typography>
            </div>
          );
        })}
      </div>

      {selectedModules.includes(controlModuleId) && (
        <>
          <Typography>
            {intl.formatMessage({ id: "label.controlAccessHeading" })}
          </Typography>
          <div className={styles.container}>
            <div
              className={styles.box}
              onClick={() =>
                handleSelectAll(
                  areAllControlsSelected,
                  setSelectedControls,
                  setAreAllControlsSelected,
                  PERMISION_AND_ROLE?.data[0]?.permissions
                )
              }
            >
              {areAllControlsSelected ? <CheckedBox /> : <UncheckedBox />}
              <Typography>{intl.formatMessage({ id: "label.all" })}</Typography>
            </div>
            {PERMISION_AND_ROLE?.data[0]?.permissions?.map((item) => {
              return (
                <div
                  key={item.id}
                  className={styles.box}
                  onClick={() =>
                    handleSelect(selectedControls, setSelectedControls, item.id)
                  }
                >
                  {selectedControls.includes(item.id) ? (
                    <CheckedBox />
                  ) : (
                    <UncheckedBox />
                  )}
                  <Typography>{item.name}</Typography>
                </div>
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
};

CheckBoxList.propTypes = {
  CheckBoxList: PropTypes.func,
};

export default CheckBoxList;
