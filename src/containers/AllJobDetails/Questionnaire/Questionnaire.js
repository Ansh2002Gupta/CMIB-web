import React from "react";
import styles from "./Questionnaire.module.scss";
import { Typography } from "antd";
import { TwoRow } from "../../../core/layouts";

const QUESTIONNAIRE = [
  {
    id: 1,
    mandatory: 0,
    type: "Text",
    question_order: "1",
    question: "question",
    question_options: null,
  },
  {
    id: 1,
    mandatory: 1,
    question: "Neveer",
    question_options: ["THis is it", "This is cancel", "Not at all"],
    question_order: 2,
    type: "single-select",
  },
];

const Questionnaire = ({questionnaires}) => {
  return (
    <div className={styles.mainContainer}>
      {questionnaires?.map((item) => (
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
              <Typography className={styles.blackText}>{item.question}</Typography>
              <div className={styles.questionOptionsContainer}>
                {item?.question_options && item?.question_options?.length > 0 &&
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
      ))}
    </div>
  );
};

export default Questionnaire;
