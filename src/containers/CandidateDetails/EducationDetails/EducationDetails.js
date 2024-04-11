import React, { useState } from "react";
import { useIntl } from "react-intl";
import { Typography } from "antd";

import { TwoRow } from "../../../core/layouts";
import styles from "./EducationDetails.module.scss";
import {
  EDUCATION_DETAILS_FIELD1,
  EDUCATION_DETAILS_FIELD2,
  EDUCATION_DETAILS_FIELD3,
  EDUCATION_DETAILS_FIELD4,
} from "./EducationDetailsFieldsDetails";
import { EDUCATION_DETAIL } from "../../../CandidateDetailsDummyData";
import FieldsSectionWithDivider from "../../../components/FieldsSectionWithDivider";

const EducationDetails = () => {
  const intl = useIntl();
  const [educationData, setEducationData] = useState(EDUCATION_DETAIL);

  const educationDetailsFields1 = EDUCATION_DETAILS_FIELD1(
    educationData.education1.name_of_examination,
    educationData.education1.status,
    educationData.education1.board_university,
    educationData.education1.year,
    educationData.education1.marks_in_per,
    educationData.education1.rank_medal
  );
  const educationDetailsFields2 = EDUCATION_DETAILS_FIELD2(
    educationData.education2.name_of_examination,
    educationData.education2.status,
    educationData.education2.board_university,
    educationData.education2.year,
    educationData.education2.marks_in_per,
    educationData.education2.rank_medal
  );
  const educationDetailsFields3 = EDUCATION_DETAILS_FIELD3(
    educationData.education3.graduation,
    educationData.education3.name_of_examination,
    educationData.education3.status,
    educationData.education3.board_university,
    educationData.education3.year,
    educationData.education3.marks_in_per,
    educationData.education3.rank_medal
  );
  const educationDetailsFields4 = EDUCATION_DETAILS_FIELD4(
    educationData.education4.post_graduation,
    educationData.education4.name_of_examination,
    educationData.education4.status,
    educationData.education4.board_university,
    educationData.education4.year,
    educationData.education4.marks_in_per,
    educationData.education4.rank_medal
  );

  const educationFields = [
    educationDetailsFields1,
    educationDetailsFields2,
    educationDetailsFields3,
    educationDetailsFields4
  ];

  return (
    <div className={styles.mainContainer}>
      <TwoRow
        className={styles.educationDetails}
        topSection={
          <Typography className={styles.headingText}>
            {intl.formatMessage({ id: "label.educationDetails" })}
          </Typography>
        }
        bottomSection={
          <FieldsSectionWithDivider fields={educationFields}/>
        }
      />
    </div>
  );
};

export default EducationDetails;