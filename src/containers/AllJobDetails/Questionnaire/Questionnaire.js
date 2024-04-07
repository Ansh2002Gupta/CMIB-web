import React from "react";
import styles from "./Questionnaire.module.scss";
import { Typography } from "antd";
import { TwoRow } from "../../../core/layouts";
import { useIntl } from "react-intl";

const Questionnaire = ({ questionnaires }) => {
  const intl = useIntl();
  return (
    <div className={styles.mainContainer}>
      {questionnaires?.length > 0 ? (
        questionnaires?.map((item) => (
          <TwoRow
            className={styles.QuestionnaireContainer}
            topSection={
              <Typography className={styles.grayHeadingText}>
                {`Question ${item?.question_order} (${item?.type})`}
                {item.mandatory ? (
                  <span className={styles.redText}> *</span>
                ) : null}
              </Typography>
            }
            bottomSection={
              <div>
                <Typography className={styles.blackText}>
                  {item.question}
                </Typography>
                <div className={styles.questionOptionsContainer}>
                  {item?.question_options &&
                    item?.question_options?.length > 0 &&
                    JSON.parse(item?.question_options)?.map((option, index) => (
                      <div className={styles.questionOptionsWrapper}>
                        <Typography className={styles.blackText}>
                          {`${index + 1}.`}
                        </Typography>
                        <Typography className={styles.blackText}>
                          {`${option}`}
                        </Typography>
                      </div>
                    ))}
                </div>
              </div>
            }
          />
        ))
      ) : (
        <div className={styles.QuestionnaireContainer}>
          <Typography className={styles.blackText}>
            {intl.formatMessage({
              id: `label.noQuestionnairesAreFound`,
            })}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default Questionnaire;
