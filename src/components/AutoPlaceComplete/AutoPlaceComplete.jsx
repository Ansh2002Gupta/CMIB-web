import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { AutoComplete } from "antd";

import { loadScript } from "../../Utils/loadScript";
import { styles } from "./AutoPlaceComplete.styles";

const AutoPlaceComplete = () => {
  const intl = useIntl();
  const [searchedLocation, setSearchedLocation] = useState("");
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
    return !searchText ? [] : [{ value: searchText }];
  };

  const setLatLngFromAddress = (address) => {
    // Note -> Use the below code if the lat and lng are required, else remove
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

  return (
      <AutoComplete
        options={suggestedLocations}
        onChange={(data) => {
          setSearchedLocation(data);
        }}
        style={styles.inputStyle}
        onSelect={setLatLngFromAddress}
        onSearch={(item) => setSuggestedLocations(getPanelValue(item))}
        placeholder={intl.formatMessage({ id: "label.enter_location" })}
      />
  );
};

export default AutoPlaceComplete;