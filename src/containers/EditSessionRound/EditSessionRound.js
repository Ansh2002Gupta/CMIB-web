import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { capitalize } from "lodash";

import useFetch from "../../core/hooks/useFetch";
import useResponsive from "../../core/hooks/useResponsive";
import useShowNotification from "../../core/hooks/useShowNotification";

import EditSessionRoundTemplate from "./EditSessionRoundTemplate";
import useUpdateSessionRoundDetailsApi from "../../services/api-services/SessionRounds/useUpdateRoundDetailsApi";
import { checkForValidNumber } from "../../constant/utils";
import { ADMIN_ROUTE, CENTRE_END_POINT } from "../../constant/apiEndpoints";
import { MENU_KEYS, NOTIFICATION_TYPES } from "../../constant/constant";
import { GlobalSessionContext } from "../../globalContext/globalSession/globalSessionProvider";

const EditSessionRound = ({
  intl,
  roundDetails,
  onClickCancel,
  selectedModule,
  sessionData,
  switchLabel,
}) => {
  const [activeStatus, setActiveStatus] = useState(roundDetails?.status === 1);
  const [selectedCentres, setSelectedCentres] = useState();
  const [experience, setExperience] = useState(roundDetails?.experiences || []);
  const [experienceErrors, setExperienceErrors] = useState(
    experience.map(() => ({
      min_ctc: "",
      work_experience_max: "",
      work_experience_min: "",
    }))
  );
  const [addExperience, setAddExperience] = useState({
    min_ctc: "",
    use_more_experience: 0,
    work_experience_max: null,
    work_experience_min: null,
  });
  const [errors, setErrors] = useState({
    min_ctc: "",
    work_experience_max: "",
    work_experience_min: "",
  });
  const responsive = useResponsive();
  const { showNotification, notificationContextHolder } = useShowNotification();
  const { isLoading, updateSessionRoundDetails } =
    useUpdateSessionRoundDetailsApi();
  const [centresError, setCentresError] = useState(false);
  const [globalSessionDetails] = useContext(GlobalSessionContext);

  const sessionID = globalSessionDetails?.globalSessionId;

  const { data, isError } = useFetch({
    url: ADMIN_ROUTE + `/${selectedModule?.key}` + CENTRE_END_POINT,
  });

  useEffect(() => {
    mapSelectedCentres();
  }, []);

  useEffect(() => {
    if (!sessionData?.status) {
      onClickCancel();
    }
  }, [sessionData?.status]);

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
    if (!updatedCenters?.length) {
      setCentresError(true);
    }
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
      ...(bigCentres?.length ? [mapBigCentres] : []),
      ...(!!smallCentres?.length &&
      roundDetails?.round_code !== MENU_KEYS.ROUND_2_PLACEMENT
        ? [mapSmallCentres]
        : []),
    ];
  };

  const handleError = (key, error) => {
    setErrors((prev) => ({
      ...prev,
      [key]: error,
    }));
  };

  const validate = () => {
    let errorCount = 0;
    if (!checkForValidNumber(addExperience?.min_ctc)) {
      handleError(
        "min_ctc",
        intl.formatMessage({ id: "label.error.fieldEmpty" })
      );
      errorCount += 1;
    }
    if (!checkForValidNumber(addExperience?.work_experience_min)) {
      handleError(
        "work_experience_min",
        intl.formatMessage({ id: "label.error.fieldEmpty" })
      );
      errorCount += 1;
    }
    if (
      !checkForValidNumber(addExperience?.work_experience_max) &&
      !addExperience?.use_more_experience
    ) {
      handleError(
        "work_experience_max",
        intl.formatMessage({ id: "label.error.fieldEmpty" })
      );
      errorCount += 1;
    }
    if (errorCount > 0) return false;

    return true;
  };

  const onClickSave = () => {
    if (!selectedCentres?.length) {
      setCentresError(true);
    } else {
      if (
        checkForValidNumber(addExperience?.work_experience_min) ||
        checkForValidNumber(addExperience?.work_experience_max) ||
        checkForValidNumber(addExperience?.min_ctc)
      ) {
        if (validate()) {
          let payload = {
            status: +activeStatus,
            centre_id: Array.from(selectedCentres, (centre) => centre.id),
            experiences: [...experience, addExperience],
          };
          updateSessionRoundDetails({
            payload: payload,
            onErrorCallback: (error) => {
              showNotification({ text: error, type: NOTIFICATION_TYPES.ERROR });
            },
            onSuccessCallback: () => onClickCancel(true),
            roundId: roundDetails?.id,
            selectedModuleKey: selectedModule?.key,
            sessionID,
          });
        }
      } else {
        let payload = {
          status: +activeStatus,
          centre_id: Array.from(selectedCentres, (centre) => centre.id),
          experiences: experience,
        };
        updateSessionRoundDetails({
          payload: payload,
          onErrorCallback: (error) => {
            showNotification({ text: error, type: NOTIFICATION_TYPES.ERROR });
          },
          onSuccessCallback: () => onClickCancel(true),
          roundId: roundDetails?.id,
          selectedModuleKey: selectedModule?.key,
          sessionID,
        });
      }
    }
  };

  return (
    <>
      {notificationContextHolder}
      <EditSessionRoundTemplate
        {...{
          addExperience,
          errors,
          experience,
          experienceErrors,
          handleError,
          setAddExperience,
          setErrors,
          setExperience,
          setExperienceErrors,
          isLoading,
          validate,
        }}
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
    </>
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
