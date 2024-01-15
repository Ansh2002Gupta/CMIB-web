import React from "react";
import { useIntl } from "react-intl";

import { TwoRow } from "../../core/layouts";

import HeadingAndSubHeading from "../../components/HeadingAndSubHeading/HeadingAndSubHeading";
import styles from "./SetupMockInterview.module.scss";

const SetupMockInterviewContent = () => {
  const intl = useIntl();

  return (
    <TwoRow
      className={styles.mainContainer}
      topSection={
        <HeadingAndSubHeading
          customContainerStyles={styles.customContainerStyles}
          headingText={intl.formatMessage({
            id: "label.session.setupMockInterviews",
          })}
          subHeadingText={intl.formatMessage({
            id: "label.warning.setupMockInterviews",
          })}
        />
      }
      bottomSection={<></>}
    />
  );
};
export default SetupMockInterviewContent;
