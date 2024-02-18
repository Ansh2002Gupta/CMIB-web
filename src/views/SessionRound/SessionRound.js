import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { capitalize } from "lodash";
import { useIntl } from "react-intl";

import { TwoColumn, TwoRow } from "../../core/layouts";
import useResponsive from "../../core/hooks/useResponsive";

import CustomSwitch from "../../components/CustomSwitch";
import RoundCard from "../../containers/RoundCard";
import SearchableDropDown from "../../components/SearchableDropDown";
import useFetch from "../../core/hooks/useFetch";
import useNavigateScreen from "../../core/hooks/useNavigateScreen";
import { UserProfileContext } from "../../globalContext/userProfile/userProfileProvider";
import {
  CENTRE_END_POINT,
  CORE_ROUTE,
  DROPDOWN,
} from "../../constant/apiEndpoints";
import { classes } from "./SessionRound.styles";
import styles from "./SessionRound.module.scss";

const SessionRound = ({ roundList, switchLabel }) => {
  const intl = useIntl();
  const responsive = useResponsive();
  const { navigateScreen: navigate } = useNavigateScreen();
  const [userProfileDetails] = useContext(UserProfileContext);
  const selectedModule = userProfileDetails?.selectedModuleItem;
  const [status, setStatus] = useState(false);
  const [city, setCity] = useState([]);

  const { data, isError } = useFetch({
    url: CORE_ROUTE + `/${selectedModule?.key}` + CENTRE_END_POINT + DROPDOWN,
  });

  const handleSelectCentre = (item, option) => {
    let selectedCity = option?.[0];
    if (city.some((item) => item.id === selectedCity.id)) {
      handleDeselectCentre(selectedCity);
    } else {
      setCity([...city, selectedCity]);
    }
  };

  const handleDeselectCentre = (item) => {
    const updatedCenters = city?.filter((ele) => ele.id !== item.id);
    setCity(updatedCenters);
  };

  const getCentreListFromResponse = () => {
    console.log(data);
    let bigCentres = data?.big_centres;
    let smallCentres = data?.small_centres;

    let mapBigCentres = {
      id: 0,
      label: intl.formatMessage({ id: "label.big_centres" }),
      options: bigCentres?.map((ele) => {
        return {
          id: ele?.id,
          label: capitalize(ele?.name),
          value: capitalize(ele?.name),
        };
      }),
    };

    let mapSmallCentres = {
      id: 2,
      label: intl.formatMessage({ id: "label.small_centres" }),
      options: smallCentres?.map((ele) => {
        return {
          id: ele?.id,
          label: capitalize(ele?.name),
          value: capitalize(ele?.name),
        };
      }),
    };
    return [mapBigCentres, mapSmallCentres];
  };

  return (
    <TwoRow
      className={styles.mainContainer}
      topSection={
        <TwoColumn
          className={styles.cityContainer}
          leftSectionStyle={classes.leftSectionStyle}
          rightSectionStyle={classes.rightSectionStyle}
          leftSection={
            <CustomSwitch
              checked={status}
              label={switchLabel}
              onChange={() => {
                setStatus(!status);
              }}
              activeText={"active"}
              inActiveText={"inactive"}
            />
          }
          rightSection={
            // <SearchableDropDown
            //   isError={isError}
            //   isRequiredField={true}
            //   onSelectItem={handleSelectCentre}
            //   onRemoveItem={handleDeselectCentre}
            //   options={getCentreListFromResponse()}
            //   selectedOptionsList={city}
            //   placeholderText="session.rounds.selectCentres"
            //   title="session.rounds.centres"
            // />
            <></>
          }
        />
      }
      bottomSection={
        <div className={styles.gridClass}>
          {roundList.map((item) => {
            return (
              <RoundCard
                key={item.id}
                headingDescription={item.headingDescription}
                headingIntl={item.headingIntl}
                imageUrl={item.imageUrl}
                onClick={() => {
                  navigate(item.onClickNaviagtion);
                }}
              />
            );
          })}
        </div>
      }
      bottomSectionStyle={
        responsive?.isXl
          ? classes.bottomSectionStyle
          : classes.mobileBottomSectionStyle
      }
    />
  );
};

SessionRound.defaultProps = {
  roundList: [],
  switchLabel: "",
};

SessionRound.propTypes = {
  roundList: PropTypes.array,
  switchLabel: PropTypes.string,
};

export default SessionRound;
