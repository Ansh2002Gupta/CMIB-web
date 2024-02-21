import React, { useContext } from "react";
import PropTypes from "prop-types";

import { TwoColumn, TwoRow } from "../../core/layouts";

import CustomButton from "../../components/CustomButton";
import CustomSwitch from "../../components/CustomSwitch";
import SearchableDropDown from "../../components/SearchableDropDown";
import WorkExperienceRange from "../WorkExperienceRange";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import { MODULE_KEYS } from "../../constant/constant";
import { classes } from "./EditSessionRound.styles";
import styles from "./EditSessionRound.module.scss";

const EditSessionRoundTemplate = ({
  activeStatus,
  centresError,
  experience,
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
  setExperience,
  switchLabel,
}) => {
  const [userProfileDetails] = useContext(UserProfileContext);
  const currentlySelectedModuleKey =
    userProfileDetails?.selectedModuleItem?.key;

  return (
    <TwoRow
      className={styles.mainContainer}
      isTopFillSpace
      topSection={
        <TwoRow
          className={styles.addRoundContainer}
          isBottomFillSpace
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
                  isCentreError={centresError}
                  isError={isError}
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
            currentlySelectedModuleKey !==
              MODULE_KEYS?.NEWLY_QUALIFIED_PLACEMENTS_KEY && (
              <WorkExperienceRange {...{ experience, setExperience }} />
            )
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
  handleDeselectCentre: () => {},
  handleSelectCentre: () => {},
  handleStatusToggle: () => {},
  isError: false,
  selectedCentres: [],
  switchLabel: "",
};

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
};

export default EditSessionRoundTemplate;
