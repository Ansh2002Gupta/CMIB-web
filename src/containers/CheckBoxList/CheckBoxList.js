import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import Typography from "antd/es/typography/Typography";

import Base from "../../core/layouts/Base/Base";

import CustomCheckBox from "../../components/CustomCheckBox";
import { MODULE_KEYS, ROLES } from "../../constant/constant";
import styles from "./CheckBoxList.module.scss";

const CheckBoxList = ({
  rolesData,
  selectedControls,
  selectedModules,
  setIsAccessValid,
  setSelectedControls,
  setSelectedModules,
}) => {
  const intl = useIntl();

  let controlModuleId;
  for (const [key, value] of Object.entries(rolesData?.roles || {})) {
    if (value.key === MODULE_KEYS.CONTROL_KEY) {
      controlModuleId = +key;
      break;
    }
  }

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
      {getTextWithStar(intl.formatMessage({ id: "label.moduleAccess" }))}
      <div className={styles.container}>
        {Object.entries(rolesData?.roles || {})?.map(([index, item]) => {
          return (
            item.key !== ROLES.SUPER_ADMIN && (
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
            )
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
  rolesData: {},
  setIsAccessValid: () => {},
  selectedControls: [],
  selectedModules: [],
  setSelectedControls: () => {},
  setSelectedModules: () => {},
};

CheckBoxList.propTypes = {
  rolesData: PropTypes.object,
  setIsAccessValid: PropTypes.func,
  selectedControls: PropTypes.array,
  selectedModules: PropTypes.array,
  setSelectedControls: PropTypes.func,
  setSelectedModules: PropTypes.func,
};

export default CheckBoxList;
