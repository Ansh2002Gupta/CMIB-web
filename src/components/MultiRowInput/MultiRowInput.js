import React, { useContext, useEffect } from "react";
import { Image, Typography } from "antd";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";

import CustomInput from "../CustomInput/CustomInput";
import { ThemeContext } from "core/providers/theme";
import { returnEmptyRow } from "./helpers.js";
import { updateArrayItem } from "../Utils/updateArrayItem";
import styles from "./MultiRowInput.module.scss";

const MultiRowInput = ({
  inputFields,
  headerText,
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

  const handleChange = ({ value, field }) => {
    const updatedInputFields = updateArrayItem({
      array: inputFields,
      keyValuePairObject: {
        [valueKeyName]: value,
        error: value?.trim()
          ? ""
          : intl.formatMessage({ id: "label.error.fieldEmpty" }),
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
                value={field?.[valueKeyName]}
                type="text"
                controls={true}
                onChange={(e) =>
                  handleChange({ value: e?.target?.value, field })
                }
                customContainerStyles={styles.customInputOuterContainer}
                placeholder={placeholderText}
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