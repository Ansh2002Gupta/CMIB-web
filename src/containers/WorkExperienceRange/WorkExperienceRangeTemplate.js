import React, { useContext, useState } from "react";
import { Image, Typography } from "antd";

import { ThemeContext } from "core/providers/theme";
import { TwoColumn, ThreeColumn, TwoRow, ThreeRow } from "../../core/layouts";

import CustomCheckBox from "../../components/CustomCheckBox/CustomCheckBox";
import CustomInput from "../../components/CustomInput/CustomInput";
import styles from "./WorkExperienceRange.module.scss";
import { classes } from "./WorkExperienceRange.styles";

const WorkExperienceRangeTemplate = ({
  addExperience,
  errors,
  experience,
  experienceErrors,
  handleError,
  intl,
  setAddExperience,
  setErrors,
  setExperience,
  setExperienceErrors,
  validate,
}) => {
  const { getImage } = useContext(ThemeContext);

  const handleInputChange = (value, name) => {
    setAddExperience((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
    if (name === "work_experience_min" && value === null) {
      handleError(name, intl.formatMessage({ id: "label.error.fieldEmpty" }));
    } else {
      if (name !== "work_experience_max" && !value) {
        handleError(name, intl.formatMessage({ id: "label.error.fieldEmpty" }));
      }
    }
  };
  const handleInputChangeExperience = (value, name, index) => {
    experienceValidate(value, name, index);
    setExperience((prevData) =>
      prevData.map((item, i) => {
        if (index === i) {
          return { ...item, [name]: value };
        }
        return item;
      })
    );
  };

  const experienceValidate = (value, name, index) => {
    setExperienceErrors((prevData) =>
      prevData.map((item, i) => {
        if (index === i) {
          return {
            ...item,
            [name]: "",
          };
        }
        return item;
      })
    );

    if (value === null && name === "work_experience_min") {
      setExperienceErrors((prevData) =>
        prevData.map((item, i) => {
          if (index === i) {
            return {
              ...item,
              [name]: intl.formatMessage({ id: "label.error.fieldEmpty" }),
            };
          }
          return item;
        })
      );
    } else {
      if (name !== "work_experience_min" && !value) {
        setExperienceErrors((prevData) =>
          prevData.map((item, i) => {
            if (index === i) {
              return {
                ...item,
                [name]: intl.formatMessage({ id: "label.error.fieldEmpty" }),
              };
            }
            return item;
          })
        );
      }
    }
  };

  const handleAdd = () => {
    if (validate()) {
      setExperience((prevData) => [...prevData, addExperience]);
      setExperienceErrors((prevData) => [...prevData, errors]);
      setAddExperience({
        min_ctc: "",
        use_more_experience: 0,
        work_experience_max: null,
        work_experience_min: null,
      });
    }
  };

  const handleRemove = (index) => {
    const filteredData = experience.filter((item, i) => i !== index);
    const filterErrors = experienceErrors.filter((item, i) => i !== index);
    setExperienceErrors(filterErrors);
    setExperience(filteredData);
  };

  return (
    <TwoRow
      className={styles.mainContainer}
      topSection={
        <Typography className={styles.headingText}>
          {intl.formatMessage({ id: "session.workExperienceRanges" })}
        </Typography>
      }
      bottomSectionStyle={{ minWidth: "840px" }}
      bottomSection={
        <ThreeRow
          className={experience.length && styles.workExpContainer}
          topSection={
            <TwoColumn
              className={styles.columnCellContainer}
              leftSectionStyle={classes.flex2}
              rightSectionStyle={classes.flex1}
              leftSection={
                <Typography className={styles.grayText}>
                  {`${intl.formatMessage({
                    id: "session.workExperienceRange",
                  })}${intl.formatMessage({ id: "label.yearBracket" })}`}
                  <span className={styles.redText}> *</span>
                </Typography>
              }
              rightSection={
                <Typography className={styles.grayText}>
                  {`${intl.formatMessage({
                    id: "session.min_ctc",
                  })}${intl.formatMessage({ id: "label.inrBracket" })}`}
                  <span className={styles.redText}> *</span>
                </Typography>
              }
            />
          }
          middleSection={
            <div className={styles.addedExperience}>
              {experience.map((item, index) => {
                return (
                  <TwoColumn
                    key={index}
                    className={styles.columnCellContainer}
                    leftSectionStyle={classes.flex2}
                    rightSectionStyle={classes.flex1}
                    leftSection={
                      <ThreeColumn
                        leftSectionStyle={classes.flex1}
                        rightSectionStyle={classes.flex1}
                        isLeftFillSpace
                        leftSection={
                          <CustomInput
                            controls={true}
                            maxLength={20}
                            type="inputNumber"
                            placeholder={intl.formatMessage({
                              id: "label.from",
                            })}
                            onChange={(val) => {
                              handleInputChangeExperience(
                                val,
                                "work_experience_min",
                                index
                              );
                            }}
                            isError={
                              experienceErrors[index]?.work_experience_min
                                ? true
                                : false
                            }
                            errorMessage={
                              experienceErrors[index]?.work_experience_min
                            }
                            value={item?.work_experience_min}
                            customInputNumberStyles={
                              styles.customInputNumberStyles
                            }
                            customContainerStyles={styles.customContainerStyles}
                          />
                        }
                        middleSection={
                          <div
                            className={[styles.dash, styles.dashMargin].join(
                              " "
                            )}
                          />
                        }
                        rightSection={
                          item?.use_more_experience ? (
                            <CustomInput
                              controls={true}
                              maxLength={20}
                              value={"and more"}
                              customInputNumberStyles={
                                styles.customInputNumberStyles
                              }
                              customContainerStyles={
                                styles.customContainerStyles
                              }
                            />
                          ) : (
                            <CustomInput
                              controls={true}
                              maxLength={20}
                              isError={
                                experienceErrors[index]?.work_experience_max
                                  ? true
                                  : false
                              }
                              type="inputNumber"
                              placeholder={intl.formatMessage({
                                id: "label.to",
                              })}
                              errorMessage={
                                experienceErrors[index]?.work_experience_max
                              }
                              onChange={(val) => {
                                handleInputChangeExperience(
                                  val,
                                  "work_experience_max",
                                  index
                                );
                              }}
                              value={item?.work_experience_max}
                              customInputNumberStyles={
                                styles.customInputNumberStyles
                              }
                              customContainerStyles={
                                styles.customContainerStyles
                              }
                            />
                          )
                        }
                      />
                    }
                    rightSection={
                      <TwoColumn
                        isLeftFillSpace
                        leftSection={
                          <CustomInput
                            controls={true}
                            maxLength={20}
                            type="inputNumber"
                            isError={
                              experienceErrors[index]?.min_ctc ? true : false
                            }
                            errorMessage={experienceErrors[index]?.min_ctc}
                            placeholder={intl.formatMessage({
                              id: "session.min_ctc",
                            })}
                            onChange={(val) => {
                              handleInputChangeExperience(
                                val,
                                "min_ctc",
                                index
                              );
                            }}
                            value={item?.min_ctc}
                            customInputNumberStyles={
                              styles.customInputNumberStyles
                            }
                            customContainerStyles={styles.customContainerStyles}
                          />
                        }
                        rightSection={
                          <Image
                            className={styles.addMinusIcon}
                            src={getImage("minusCircle")}
                            style={classes.iconStyle}
                            preview={false}
                            onClick={() => {
                              handleRemove(index);
                            }}
                          />
                        }
                      />
                    }
                  />
                );
              })}
            </div>
          }
          bottomSectionStyle={
            experience.length ? classes.bottomSectionStyle : classes.bottomStyle
          }
          bottomSection={
            <TwoColumn
              className={styles.columnCellContainer}
              leftSectionStyle={classes.flex2}
              rightSectionStyle={classes.flex1}
              leftSection={
                <ThreeColumn
                  leftSectionStyle={classes.flex1}
                  rightSectionStyle={classes.flex1}
                  isLeftFillSpace
                  leftSection={
                    <CustomInput
                      controls={true}
                      maxLength={20}
                      isError={errors.work_experience_min ? true : false}
                      type="inputNumber"
                      placeholder={intl.formatMessage({
                        id: "label.from",
                      })}
                      errorMessage={errors.work_experience_min}
                      onChange={(val) => {
                        handleInputChange(val, "work_experience_min");
                      }}
                      value={addExperience.work_experience_min}
                      customInputNumberStyles={styles.customInputNumberStyles}
                      customContainerStyles={styles.customContainerStyles}
                    />
                  }
                  middleSection={
                    <div
                      className={[styles.dash, styles.dashMargin].join(" ")}
                    />
                  }
                  rightSection={
                    <TwoColumn
                      className={styles.useMoreStyles}
                      isLeftFillSpace
                      leftSection={
                        addExperience.use_more_experience ? (
                          <CustomInput
                            controls={true}
                            type="inputNumber"
                            disabled={true}
                            value={"and more"}
                            customInputNumberStyles={
                              styles.customInputNumberStyles
                            }
                            customContainerStyles={styles.customContainerStyles}
                          />
                        ) : (
                          <CustomInput
                            maxLength={20}
                            controls={true}
                            isError={errors.work_experience_max ? true : false}
                            type="inputNumber"
                            placeholder={intl.formatMessage({
                              id: "label.to",
                            })}
                            errorMessage={errors.work_experience_max}
                            onChange={(val) => {
                              handleInputChange(val, "work_experience_max");
                            }}
                            value={addExperience.work_experience_max}
                            customInputNumberStyles={
                              styles.customInputNumberStyles
                            }
                            customContainerStyles={styles.customContainerStyles}
                          />
                        )
                      }
                      rightSection={
                        <CustomCheckBox
                          customStyles={styles.customStyles}
                          checked={
                            addExperience.use_more_experience ? true : false
                          }
                          onChange={() => {
                            handleInputChange(
                              addExperience.use_more_experience ? 0 : 1,
                              "use_more_experience"
                            );
                            handleInputChange(null, "work_experience_max");
                          }}
                        >
                          <Typography className={styles.blackText}>
                            {intl.formatMessage({ id: "session.use" })}
                            <span className={styles.blackBoldText}>
                              {intl.formatMessage({
                                id: "session.andMore",
                              })}
                            </span>
                          </Typography>
                        </CustomCheckBox>
                      }
                    />
                  }
                />
              }
              rightSection={
                <TwoColumn
                  isLeftFillSpace
                  leftSection={
                    <CustomInput
                      controls={true}
                      maxLength={20}
                      isError={errors.min_ctc ? true : false}
                      type="inputNumber"
                      placeholder={intl.formatMessage({
                        id: "session.min_ctc",
                      })}
                      errorMessage={errors.min_ctc}
                      onChange={(val) => {
                        handleInputChange(val, "min_ctc");
                      }}
                      value={addExperience.min_ctc}
                      customInputNumberStyles={styles.customInputNumberStyles}
                      customContainerStyles={styles.customContainerStyles}
                    />
                  }
                  rightSection={
                    <Image
                      className={styles.addPlusIcon}
                      src={getImage("addCircle")}
                      style={classes.iconStyle}
                      preview={false}
                      onClick={handleAdd}
                    />
                  }
                />
              }
            />
          }
        />
      }
    />
  );
};

export default WorkExperienceRangeTemplate;
