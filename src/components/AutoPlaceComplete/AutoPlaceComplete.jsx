import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { AutoComplete } from "antd";

import { loadScript } from "../../Utils/loadScript";
import { styles } from "./AutoPlaceComplete.styles";

const AutoPlaceComplete = ({defaultValue, onSelectLocation}) => {
  const intl = useIntl();
  const [searchedLocation, setSearchedLocation] = useState(defaultValue);
  const [suggestedLocations, setSuggestedLocations] = useState([]);

  useEffect(() => {
    if (!window.google) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_KEY}&libraries=places&callback=initMap`
      );
    }
  }, []);

  const setRelatedSearchLocation = () => {
    const displaySuggestions = function (predictions, status) {
      if (
        status !== window.google.maps.places.PlacesServiceStatus.OK ||
        !predictions
      ) {
        return;
      }
      let suggestedLocations = [];
      if (predictions?.length) {
        suggestedLocations = predictions.map((place) => {
          return {
            value: place.description,
            label: place.description,
            ...place,
          };
        });
      }
      setSuggestedLocations(suggestedLocations || []);
    };
    window.google &&
      new window.google.maps.places.AutocompleteService().getPlacePredictions(
        {
          input: searchedLocation,
        },
        displaySuggestions
      );
  };

  useEffect(() => {
    if (searchedLocation) {
      setRelatedSearchLocation();
    }
  }, [searchedLocation]);

  const getPanelValue = (searchText) => {
    return !searchText ? [] : [{ value: searchText }];
  };

  const setLatLngFromAddress = (address) => {
    onSelectLocation && onSelectLocation(address);
  };

  return (
      <AutoComplete
        value={searchedLocation}
        options={suggestedLocations}
        onChange={(data) => {
          setSearchedLocation(data);
          onSelectLocation(data);
        }}
        style={styles.inputStyle}
        onSelect={setLatLngFromAddress}
        onSearch={(item) => setSuggestedLocations(getPanelValue(item))}
        placeholder={intl.formatMessage({ id: "label.enter_location" })}
      />
  );
};

AutoComplete.defaultProps = {
  defaultValue: '',
};

AutoComplete.propTypes = {
  defaultValue: PropTypes.string,
  onSelectLocation: PropTypes.func,
};

export default AutoPlaceComplete;