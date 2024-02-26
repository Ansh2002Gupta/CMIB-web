import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { AutoComplete } from "antd";

import { loadScript } from "../../Utils/loadScript";
import { styles } from "./AutoPlaceComplete.styles";

const AutoPlaceComplete = ({
  allowManualText,
  defaultValue,
  onSelectLocation,
}) => {
  const intl = useIntl();
  const [searchedLocation, setSearchedLocation] = useState(defaultValue);
  const [suggestedLocations, setSuggestedLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({});

  useEffect(() => {
    if (!window.google) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${""}&libraries=places&callback=initMap`
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
    return !searchText ? [] : [];
  };

  const setLatLngFromAddress = (address) => {
    onSelectLocation && onSelectLocation(address);
    var geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      {
        address,
      },
      function (results, status) {
        if (
          status !== window.google.maps.places.PlacesServiceStatus.OK ||
          !results
        ) {
          return;
        }
        let place = results[0];
        setSelectedLocation({
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
        });
      }
    );
  };

  const handleOnBlur = (e) => {
    if (allowManualText) {
      onSelectLocation && onSelectLocation(e.target.value);
      return;
    }
    setSearchedLocation(defaultValue);
  };

  return (
    <AutoComplete
      value={searchedLocation}
      options={suggestedLocations}
      onChange={(data) => {
        setSearchedLocation(data);
      }}
      style={styles.inputStyle}
      onSelect={setLatLngFromAddress}
      onSearch={(item) => setSuggestedLocations(getPanelValue(item))}
      placeholder={intl.formatMessage({ id: "label.enter_location" })}
      onBlur={handleOnBlur}
    />
  );
};

AutoComplete.defaultProps = {
  defaultValue: "",
};

AutoComplete.propTypes = {
  allowManualText: PropTypes.bool,
  defaultValue: PropTypes.string,
  onSelectLocation: PropTypes.func,
};

export default AutoPlaceComplete;
