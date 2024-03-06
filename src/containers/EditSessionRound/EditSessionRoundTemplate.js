import React from "react";
import PropTypes from "prop-types";

import { TwoColumn, TwoRow } from "../../core/layouts";

import CustomButton from "../../components/CustomButton";
import CustomSwitch from "../../components/CustomSwitch";
import SearchableDropDown from "../../components/SearchableDropDown";
import { classes } from "./EditSessionRound.styles";
import styles from "./EditSessionRound.module.scss";

const EditSessionRoundTemplate = ({
  activeStatus,
  centresError,
  getCentreListFromResponse,
  handleDeselectCentre,
  handleSelectCentre,
  handleStatusToggle,
  intl,
  isError,
  onClickCancel,
  onClickSave,
  responsive,
  selectedCentres,
  switchLabel,
}) => {
  return (
    <TwoRow
      className={styles.mainContainer}
      isTopFillSpace
      topSection={
        <TwoColumn
          className={styles.centreContainer}
          leftSectionStyle={classes.leftSectionStyle}
          rightSectionStyle={classes.rightSectionStyle}
          leftSection={
            <CustomSwitch
              customTextStyle={styles.grayText}
              isRequired
              checked={activeStatus}
              label={switchLabel}
              onChange={handleStatusToggle}
              activeText={"active"}
              inActiveText={"inactive"}
            />
          }
          rightSection={
            <SearchableDropDown
              errorMessage={centresError ? "session.centreErrorMsg" : ""}
              isRequiredField={true}
              onSelectItem={handleSelectCentre}
              onRemoveItem={handleDeselectCentre}
              options={getCentreListFromResponse()}
              selectedOptionsList={selectedCentres}
              placeholderText="session.rounds.selectCentres"
              title="session.rounds.centres"
            />
          }
        />
      }
      bottomSection={
        <TwoColumn
          className={styles.editContainer}
          leftSection={
            <CustomButton
              btnText={intl.formatMessage({
                id: "label.cancel",
              })}
              customStyle={
                responsive.isMd
                  ? styles.buttonStyles
                  : styles.mobileButtonStyles
              }
              textStyle={styles.textStyle}
              onClick={onClickCancel}
            />
          }
          rightSection={
            <CustomButton
              isBtnDisable={false}
              textStyle={styles.saveButtonTextStyles}
              btnText={intl.formatMessage({
                id: "session.saveChanges",
              })}
              onClick={onClickSave}
            />
          }
        />
      }
    />
  );
};

EditSessionRoundTemplate.defaultProps = {
  activeStatus: false,
  handleDeselectCentre : () => {},
  handleSelectCentre: () => {},
  handleStatusToggle: () => {},
  isError: false,
  selectedCentres: [],
  switchLabel: "",
}

EditSessionRoundTemplate.propTypes = {
  activeStatus: PropTypes.bool,
  getCentreListFromResponse: PropTypes.func.isRequired,
  handleDeselectCentre: PropTypes.func,
  handleSelectCentre: PropTypes.func,
  handleStatusToggle: PropTypes.func,
  intl: PropTypes.object.isRequired,
  isError: PropTypes.bool,
  onClickCancel: PropTypes.func.isRequired,
  onClickSave: PropTypes.func.isRequired,
  responsive: PropTypes.object.isRequired,
  selectedCentres: PropTypes.array,
  switchLabel: PropTypes.string,
}

export default EditSessionRoundTemplate;
