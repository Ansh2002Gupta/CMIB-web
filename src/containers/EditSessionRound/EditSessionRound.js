import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { capitalize } from "lodash";

import useFetch from "../../core/hooks/useFetch";
import useResponsive from "../../core/hooks/useResponsive";

import EditSessionRoundTemplate from "./EditSessionRoundTemplate";
import useUpdateSessionRoundDetailsApi from "../../services/api-services/SessionRounds/useUpdateRoundDetailsApi";
import { ADMIN_ROUTE, CENTRE_END_POINT } from "../../constant/apiEndpoints";

const EditSessionRound = ({
  intl,
  roundDetails,
  onClickCancel,
  selectedModule,
  switchLabel,
}) => {
  const [activeStatus, setActiveStatus] = useState(roundDetails?.status === 1);
  const [selectedCentres, setSelectedCentres] = useState();
  const [experience, setExperience] = useState(roundDetails?.experiences || []);
  const responsive = useResponsive();
  const { updateSessionRoundDetails } = useUpdateSessionRoundDetailsApi();
  const [centresError, setCentresError] = useState(false);

  const { data, isError } = useFetch({
    url: ADMIN_ROUTE + `/${selectedModule?.key}` + CENTRE_END_POINT,
  });

  useEffect(() => {
    mapSelectedCentres();
  }, []);

  const mapSelectedCentres = () => {
    let centres =
      roundDetails?.centres?.map((centre) => {
        return {
          id: centre?.id,
          label: capitalize(centre?.name),
          value: capitalize(centre?.name),
        };
      }) || [];
    setSelectedCentres(centres);
  };

  const handleSelectCentre = (item, option) => {
    setCentresError(false);
    let centre = option?.[0];
    if (selectedCentres.some((item) => item.id === centre.id)) {
      handleDeselectCentre(centre);
    } else {
      setSelectedCentres([...selectedCentres, centre]);
    }
  };

  const handleDeselectCentre = (item) => {
    const updatedCenters = selectedCentres?.filter((ele) => ele.id !== item.id);
    setSelectedCentres(updatedCenters);
  };

  const handleStatusToggle = () => {
    setActiveStatus((prev) => !prev);
  };

  const getCentreListFromResponse = () => {
    let bigCentres = data?.records?.filter((ele) => ele.centre_size === "big");
    let smallCentres = data?.records?.filter(
      (ele) => ele.centre_size === "small"
    );

    let mapBigCentres = {
      id: 0,
      label: intl.formatMessage({ id: "session.bigCentres" }),
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
      label: intl.formatMessage({ id: "session.smallCentres" }),
      options: smallCentres?.map((ele) => {
        return {
          id: ele?.id,
          label: capitalize(ele?.name),
          value: capitalize(ele?.name),
        };
      }),
    };
    return [
      ...(!!bigCentres?.length ? [mapBigCentres] : []),
      ...(!!smallCentres?.length ? [mapSmallCentres] : []),
    ];
  };

  const onClickSave = () => {
    if (!selectedCentres?.length) {
      setCentresError(true);
    } else {
      let payload = {
        status: +activeStatus,
        centre_id: Array.from(selectedCentres, (centre) => centre.id),
        experiences: experience,
      };

      updateSessionRoundDetails({
        payload: payload,
        onErrorCallback: () => {},
        onSuccessCallback: () => onClickCancel(true),
        roundId: roundDetails?.id,
        selectedModuleKey: selectedModule?.key,
      });
    }
  };

  return (
    <EditSessionRoundTemplate
      {...{ experience, setExperience }}
      activeStatus={activeStatus}
      centresError={centresError}
      getCentreListFromResponse={getCentreListFromResponse}
      handleDeselectCentre={handleDeselectCentre}
      handleSelectCentre={handleSelectCentre}
      handleStatusToggle={handleStatusToggle}
      intl={intl}
      isError={isError}
      onClickCancel={onClickCancel}
      onClickSave={onClickSave}
      responsive={responsive}
      selectedCentres={selectedCentres}
      selectedModule={selectedModule}
      switchLabel={switchLabel}
    />
  );
};

EditSessionRoundTemplate.defaultProps = {
  switchLabel: "",
};

EditSessionRoundTemplate.propTypes = {
  intl: PropTypes.object.isRequired,
  selectedModule: PropTypes.object.isRequired,
  switchLabel: PropTypes.string,
};

export default EditSessionRound;
