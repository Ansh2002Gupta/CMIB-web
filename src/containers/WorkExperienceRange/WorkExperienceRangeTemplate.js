import React, { useContext } from "react";
import { Checkbox, Image, Typography } from "antd";

import { ThemeContext } from "core/providers/theme";
import { TwoColumn, TwoRow } from "../../core/layouts";

import CustomInputNumber from "../../components/CustomInputNumber";
import CustomGrid from "../../components/CustomGrid";
import styles from "./WorkExperienceRange.module.scss";

const WorkExperienceRangeTemplate = ({ intl }) => {
  const { getImage } = useContext(ThemeContext);

  return (
    <TwoRow
      topSection={
        <Typography className={styles.headingText}>
          {intl.formatMessage({ id: "session.workExperienceRanges" })}
        </Typography>
      }
      bottomSection={
        <TwoRow
          className={styles.gridItem}
          topSection={
            <TwoColumn
              className={styles.subHeading}
              leftSection={
                <Typography className={styles.grayText}>
                  {intl.formatMessage({ id: "session.workExperienceRange" })}
                  <span className={styles.redText}> *</span>
                </Typography>
              }
              rightSection={
                <Typography className={styles.grayText}>
                  {intl.formatMessage({ id: "session.min_ctc" })}
                  <span className={styles.redText}> *</span>
                </Typography>
              }
            />
          }
          bottomSection={
            <>
              <CustomGrid>
                <CustomInputNumber
                  customInputStyles={styles.input}
                  customContainerStyles={styles.customContainerStyles}
                />
                <CustomInputNumber />
                <CustomInputNumber />
              </CustomGrid>

              {/* <CustomInput
                controls
                value={""}
                customLabelStyles={styles.inputLabel}
                customInputStyles={styles.input}
                customContainerStyles={styles.customContainerStyles}
                onChange={(val) => {}}
                placeholder={"aaaf"}
                type={"inputNumber"}
                isError={false}
                errorMessage={""}
              />
              <div className={styles.dash} />
              <TwoColumn
                isLeftFillSpace
                leftSection={
                  <CustomInput
                    controls
                    value={""}
                    customLabelStyles={styles.inputLabel}
                    customInputStyles={styles.input}
                    customContainerStyles={styles.customContainerStyles}
                    onChange={(val) => {}}
                    placeholder={"aaaf"}
                    type={"inputNumber"}
                    isError={false}
                    errorMessage={""}
                  />
                }
                rightSection={
                  <Checkbox className={styles.checkbox}>
                    {intl.formatMessage({ id: "session.useAndMore" })}
                  </Checkbox>
                }
              />
              <CustomInput
                controls
                value={""}
                customLabelStyles={styles.inputLabel}
                customInputStyles={styles.input}
                customContainerStyles={styles.customContainerStyles}
                onChange={(val) => {}}
                placeholder={"aaaf"}
                type={"inputNumber"}
                isError={false}
                errorMessage={""}
              />
              <Image
                className={styles.addMinusIcon}
                src={getImage("addCirleGreen")}
                width={24}
                height={24}
                onClick={() => {}}
              /> */}
            </>
          }
        />
      }
    />
  );
};

export default WorkExperienceRangeTemplate;
