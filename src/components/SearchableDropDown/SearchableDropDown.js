import React, { forwardRef, useContext } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { Checkbox, Image, Select, Tooltip, Typography } from "antd";

import { ThemeContext } from "core/providers/theme";
import { TwoColumn, TwoRow } from "../../core/layouts";

import { classes } from "./SearchableDropDown.styles";
import styles from "./SearchableDropDown.module.scss";

const SearchableDropDown = forwardRef(
  (
    {
      errorMessage,
      disabled,
      isRequiredField,
      minLengthToShowTooltip,
      onRemoveItem,
      onSelectItem,
      options,
      placeholderText,
      selectedOptionsList,
      title,
      onSearch,
      loading,
      onClickField
    },
    ref
  ) => {
    const { getImage } = useContext(ThemeContext);
    const intl = useIntl();

    return (
      <TwoRow
        className={styles.centreContainer}
        topSection={
          <Typography className={styles.grayText}>
            {intl.formatMessage({
              id: `${title}`,
            })}
            {isRequiredField && <span className={styles.redText}> *</span>}
          </Typography>
        }
        bottomSection={
          <div className={styles.selectCentreStyles}>
            <Select
              ref={ref}
              loading={loading}
              bordered={false}
              size={"large"}
              style={classes.multiSelectStyle}
              className={styles.multilpleInput}
              onChange={onSelectItem}
              mode="multiple"
              value={null}
              optionLabelProp="label"
              options={options}
              disabled={disabled}
              onSearch={onSearch}
              onClick={onClickField}
              optionRender={(option) => (
                <TwoColumn
                  className={styles.dropDownItem}
                  leftSection={
                    <Checkbox
                      checked={selectedOptionsList?.some(
                        (item) => item?.id === option?.data?.id
                      )}
                    />
                  }
                  rightSectionStyle={classes.rightSectionStyle}
                  rightSection={
                    <Typography
                      className={styles.chipText}
                      title={
                        option?.label.length > minLengthToShowTooltip
                          ? option?.label
                          : ""
                      }
                    >
                      {option.label}
                    </Typography>
                  }
                  isRightFillSpace
                />
              )}
              placeholder={intl.formatMessage({
                id: `${placeholderText}`,
              })}
            />
            <div className={styles.selectedItemsContainer}>
              {errorMessage.length ? (
                <Typography className={styles.errorText}>
                  {`* ${intl.formatMessage({ id: `${errorMessage}` })}`}
                </Typography>
              ) : (
                selectedOptionsList?.map((item, index) => {
                  return (
                    <div className={styles.chipContainer} key={index}>
                      <Typography className={styles.chipText}>
                        {item.label}
                      </Typography>
                      <Image
                        src={getImage("cancel")}
                        className={styles.crossIcon}
                        preview={false}
                        onClick={() => {
                          onRemoveItem(item);
                        }}
                      />
                    </div>
                  );
                })
              )}
            </div>
          </div>
        }
      />
    );
  }
);

SearchableDropDown.defaultProps = {
  errorMessage: "",
  disabled: false,
  isRequiredField: false,
  minLengthToShowTooltip: 50,
  onRemoveItem: () => {},
  placeholderText: "",
  selectedOptionsList: [],
  title: "",
};

SearchableDropDown.propTypes = {
  errorMessage: PropTypes.string,
  disabled: PropTypes.bool,
  isRequiredField: PropTypes.bool,
  minLengthToShowTooltip: PropTypes.number,
  onSelectItem: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func,
  options: PropTypes.array.isRequired,
  placeholderText: PropTypes.string,
  selectedOptionsList: PropTypes.array,
  title: PropTypes.string,
};

export default SearchableDropDown;
