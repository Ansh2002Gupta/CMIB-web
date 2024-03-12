import React, { useState } from "react";
import { Button } from "antd";

import { ThreeRow } from "../../../core/layouts";

import CaJobsConfig from "../../../containers/CaJobsConfig";
import ContentHeader from "../../../containers/ContentHeader";
import { initialFieldState } from "./constant";
import styles from "./CaJobsConfigurations.module.scss";
import { CAJOBS_ROUTE, MASTER } from "../../../constant/apiEndpoints";
import { CONFIGURATIONS } from "../../../routes/routeNames";
import usePostGlobalConfigurationsApi from "../../../services/api-services/GlobalConfigurations/usePostGlobalConfigurationsApi";
import CustomLoader from "../../../components/CustomLoader";

const CaJobsConfigurations = () => {
  const [videoTimeLimit, setVideoTimeLimit] = useState(0);
  const [itSkillsList, setItSkillsList] = useState(initialFieldState);
  const [softSkillsList, setSoftSkillsList] = useState(initialFieldState);
  const { isLoading, handlePostGlobalConfigurations } =
    usePostGlobalConfigurationsApi();
  //created these functions for future purpose.
  const handleCancel = () => {};
  const handleSave = () => {
    console.log("payload(itSkillsList): ", itSkillsList);
    console.log("payload(softSkillsList): ", softSkillsList);
    console.log("payload(videoTimeLimit): ", videoTimeLimit);
    // handlePostGlobalConfigurations({
    //   payload: { itSkillsList, softSkillsList, videoTimeLimit },
    //   onErrorCallback: (errMessage) => {
    //     console.log("onErrorCallback: ", errMessage);
    //   },
    //   onSuccessCallback: () => {
    //     console.log("Succefully submitted data to the database!");
    //   },
    // });
  };

  return (
    <ThreeRow
      topSection={
        <div className={styles.headerContainer}>
          <ContentHeader headerText="Global Configurations" />
        </div>
      }
      middleSection={
        <CaJobsConfig
          currentFieldStateItSkills={itSkillsList}
          currentFieldStateSoftSkills={softSkillsList}
          setCurrentFieldStateItSkills={setItSkillsList}
          setCurrentFieldStateSoftSkills={setSoftSkillsList}
          videoTimeLimit={videoTimeLimit}
          setVideoTimeLimit={setVideoTimeLimit}
        />
      }
      bottomSection={
        <div className={styles.buttonWrapper}>
          <Button
            onClick={() => handleCancel()}
            className={styles.cancelButton}
          >
            Cancel
          </Button>
          <Button onClick={() => handleSave()} className={styles.saveButton}>
            {isLoading && <CustomLoader />}
            Save
          </Button>
        </div>
      }
    />
  );
};

export default CaJobsConfigurations;
