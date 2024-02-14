import PropTypes from "prop-types";
import { Checkbox, Image, Select, Typography } from "antd";
import { ThemeContext } from "core/providers/theme";
import { TwoColumn, TwoRow } from "../../core/layouts";
import { useIntl } from "react-intl";
import { useContext } from "react";
import { classes } from "./SearchableDropDown.styles";
import styles from "./SearchableDropDown.module.scss";

const SearchableDropDown = ({
  isError,
  isRequiredField,
  onSelectItem,
  onUnselectItem,
  options,
  placeholderText,
  selectedOptionsList,
  title,
}) => {
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
            bordered={false}
            disabled={isError}
            size={"large"}
            style={classes.multiSelectStyle}
            className={styles.multilpleInput}
            onChange={onSelectItem}
            mode="multiple"
            value={null}
            optionLabelProp="label"
            options={options}
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
                rightSection={
                  <Typography className={styles.chipText}>
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
            {selectedOptionsList?.map((item, index) => {
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
                      onUnselectItem(item);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      }
    />
  );
};

SearchableDropDown.defaultProps = {
  isError: false,
  isRequiredField: false,
  onUnselectItem: () => {},
  placeholderText: "",
  selectedOptionsList: [],
  title: "",
};

SearchableDropDown.propTypes = {
  isError: PropTypes.bool,
  isRequiredField: PropTypes.bool,
  onSelectItem: PropTypes.func.isRequired,
  onUnselectItem: PropTypes.func,
  options: PropTypes.array.isRequired,
  placeholderText: PropTypes.string,
  selectedOptionsList: PropTypes.array,
  title: PropTypes.string,
};

export default SearchableDropDown;
