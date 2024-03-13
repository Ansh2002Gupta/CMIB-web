import React, { useState } from "react";
import { Button } from "antd";

import { ThreeRow } from "../../../core/layouts";

import CaJobsConfig from "../../../containers/CaJobsConfig";
import ContentHeader from "../../../containers/ContentHeader";
import { initialFieldState } from "./constant";
import styles from "./CaJobsConfigurations.module.scss";
import CustomLoader from "../../../components/CustomLoader";

const CaJobsConfigurations = () => {
  const [videoTimeLimit, setVideoTimeLimit] = useState(0);
  const [itSkillsObj, setItSkillsObj] = useState(initialFieldState);
  const [softSkillsObj, setSoftSkillsObj] = useState(initialFieldState);

  //created these functions for future purpose.
  const handleCancel = () => {};
  const handleSave = () => {
    const itSkillsList = itSkillsObj.map((obj) => obj.fieldValue);
    const softSkillsList = softSkillsObj.map((obj) => obj.fieldValue);
    const videoLength = videoTimeLimit;
    handlePostGlobalConfigurations({
      payload: {
        it_skill: itSkillsList,
        soft_skill: softSkillsList,
        video_time_limit: videoLength,
      },
      onErrorCallback: (errMessage) => {
        console.log("error:", errMessage);
      },
      onSuccessCallback: () => {
        console.log("Success!!!!");
      },
    });
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
          currentFieldStateItSkills={itSkillsObj}
          currentFieldStateSoftSkills={softSkillsObj}
          setCurrentFieldStateItSkills={setItSkillsObj}
          setCurrentFieldStateSoftSkills={setSoftSkillsObj}
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
