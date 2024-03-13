import React, { useContext, useEffect } from "react";
import { Image, Typography } from "antd";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";

import CustomInput from "../CustomInput/CustomInput";
import { ThemeContext } from "core/providers/theme";
import { returnEmptyRow } from "./helpers.js";
import { updateArrayItem } from "../../Utils/updateArrayItem.js";
import styles from "./MultiRowInput.module.scss";
import { handleDuplicateArrayItems } from "../../Utils/handleDuplicateArrayItem.js";

const MultiRowInput = ({
  inputFields,
  headerText,
  placeholderText,
  setInputFields,
  valueKeyName,
  disableActionButton,
  setDisableActionButton,
}) => {
  const intl = useIntl();
  const fieldValuesEnteredSoFar = new Set();
  const { getImage } = useContext(ThemeContext);

  useEffect(() => {
    const customisedInputArray = inputFields
      .filter((item) => item?.[valueKeyName]?.trim()?.length)
      .map((item) => {
        return {
          ...item,
          buttonType: item?.[valueKeyName] ? "remove" : "add",
        };
      });
    customisedInputArray.push(returnEmptyRow(valueKeyName));
    setInputFields(customisedInputArray);
  }, []);

  //updating field state after checking for duplicate fields.
  useEffect(() => {
    const fieldValuesEnteredSoFar = inputFields?.map((field) =>
      field?.[valueKeyName]?.trim()
        ? { id: field?.id, value: field?.[valueKeyName].trim() }
        : {}
    );
    //console.log("fieldValuesEnteresSOFar:", fieldValuesEnteredSoFar);
    const inputFieldsAfterDuplicacyCheck = handleDuplicateArrayItems({
      array: inputFields,
      errorMessage: intl.formatMessage({ id: "label.error.DuplicateFields" }),
      uniqueArrayItems: fieldValuesEnteredSoFar,
    });
    const isDifferent =
      JSON.stringify(inputFields) !==
      JSON.stringify(inputFieldsAfterDuplicacyCheck);
    if (isDifferent) {
      setInputFields(inputFieldsAfterDuplicacyCheck);
      setDisableActionButton(true);
    }
  }, [inputFields]);

  const handleChange = ({ value, field }) => {
    value = value?.trim();
    //updating field state
    const updatedInputFields = updateArrayItem({
      array: inputFields,
      keyValuePairObject: {
        [valueKeyName]: value,
        error: !value
          ? intl.formatMessage({ id: "label.error.fieldEmpty" })
          : "",
      },
      itemToBeUpdatedId: field?.id,
    });
    setInputFields(updatedInputFields);
  };

  const handleAddOrRemoveField = ({ field, action }) => {
    if (action === "add") {
      if (field?.[valueKeyName]?.trim()) {
        const updatedInputFields = updateArrayItem({
          array: inputFields,
          keyValuePairObject: { buttonType: "remove" },
          itemToBeUpdatedId: field?.id,
        });
        updatedInputFields.push(returnEmptyRow(valueKeyName));
        setInputFields(updatedInputFields);
        return;
      }
      const inputFieldsWithCurrentFieldEmpty = inputFields.map((item) => {
        if (item?.id === field?.id) {
          return {
            ...item,
            error: intl.formatMessage({ id: "label.error.fieldEmpty" }),
          };
        }
        return item;
      });
      setInputFields(inputFieldsWithCurrentFieldEmpty);
    }
    if (action === "remove") {
      setInputFields((prev) => prev.filter((item) => item?.id !== field?.id));
    }
  };

  return (
    <div className={styles.outerContainerFlexCol}>
      <Typography className={styles.headerText}>{headerText}</Typography>
      {!!inputFields?.length &&
        inputFields?.map((field) => {
          return (
            <div key={field?.id} className={styles.innerContainerFlexRow}>
              <CustomInput
                controls={true}
                customContainerStyles={styles.customInputOuterContainer}
                errorMessage={field?.error}
                isError={!!field?.error}
                onChange={(e) =>
                  handleChange({ value: e?.target?.value, field })
                }
                placeholder={placeholderText}
                type="text"
                value={field?.[valueKeyName]}
              />
              <Image
                className={styles.imageStyle}
                src={
                  field?.buttonType?.trim()?.toLowerCase() === "add"
                    ? getImage("addCircle")
                    : getImage("minusCircle")
                }
                alt="add/remove"
                preview={false}
                onClick={() =>
                  handleAddOrRemoveField({
                    field,
                    action: field?.buttonType,
                  })
                }
              />
            </div>
          );
        })}
    </div>
  );
};

MultiRowInput.defaultProps = {
  inputFields: [],
  headerText: "",
  placeholderText: "",
  setinputFields: () => {},
  valueKeyName: "",
};

MultiRowInput.propTypes = {
  inputFields: PropTypes.array,
  headerText: PropTypes.string,
  placeholderText: PropTypes.string,
  setinputFields: PropTypes.func,
  valueKeyName: PropTypes.string,
};

export default MultiRowInput;
