import React, { useContext, useEffect } from "react";
import { useIntl } from "react-intl";
import { Image, Typography } from "antd";
import PropTypes from "prop-types";

import { ThemeContext } from "core/providers/theme";
import CustomInput from "../CustomInput/CustomInput";
import { handleDuplicateArrayItems } from "../../Utils/handleDuplicateArrayItem.js";
import { updateArrayItem } from "../../Utils/updateArrayItem.js";
import { returnEmptyRow } from "./helpers.js";
import styles from "./MultiRowInput.module.scss";

const MultiRowInput = ({
  headerText,
  inputFields,
  maxInputLength,
  placeholderText,
  setInputFields,
  valueKeyName,
}) => {
  const intl = useIntl();
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

  useEffect(() => {
    const fieldValuesEnteredSoFar = inputFields?.map((field) =>
      field?.[valueKeyName]?.trim()
        ? { id: field?.id, value: field?.[valueKeyName].trim() }
        : {}
    );
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
    }
  }, [inputFields]);

  const handleChange = ({ value, field }) => {
    value = value?.trim();
    if (value?.length > maxInputLength) return;
    const updatedInputFields = updateArrayItem({
      array: inputFields,
      keyValuePairObject: {
        [valueKeyName]: value,
        error:
          !value && field?.buttonType?.trim() === "remove"
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
                customInputStyles={styles.customInputStyles}
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
  headerText: "",
  inputFields: [],
  maxInputLength: 100,
  placeholderText: "",
  setinputFields: () => {},
  valueKeyName: "",
};

MultiRowInput.propTypes = {
  headerText: PropTypes.string,
  inputFields: PropTypes.array,
  maxInputLength: PropTypes.number,
  placeholderText: PropTypes.string,
  setinputFields: PropTypes.func,
  valueKeyName: PropTypes.string,
};

export default MultiRowInput;
