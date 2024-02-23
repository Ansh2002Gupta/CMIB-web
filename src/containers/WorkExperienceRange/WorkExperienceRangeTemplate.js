import React, { useContext, useState } from "react";
import { Image, Typography } from "antd";

import { ThemeContext } from "core/providers/theme";
import { TwoColumn, ThreeColumn, TwoRow, ThreeRow } from "../../core/layouts";

import CustomCheckBox from "../../components/CustomCheckBox/CustomCheckBox";
import CustomInputNumber from "../../components/CustomInputNumber";
import styles from "./WorkExperienceRange.module.scss";
import { classes } from "./WorkExperienceRange.styles";

const WorkExperienceRangeTemplate = ({ experience, intl, setExperience }) => {
  const { getImage } = useContext(ThemeContext);
  const [addExperience, setAddExperience] = useState({
    id: Date.now(),
    min_ctc: "",
    use_more_experience: 0,
    work_experience_max: null,
    work_experience_min: null,
  });
  const [errors, setErrors] = useState({
    id: Date.now(),
    min_ctc: "",
    work_experience_max: "",
    work_experience_min: "",
  });

  let isAddmoreSelected = experience.some(
    (item) => item.use_more_experience === 1
  );

  const handleInputChange = (value, name) => {
    setAddExperience((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleError = (key, error) => {
    setErrors((prev) => ({
      ...prev,
      [key]: error,
    }));
  };

  const handleInputChangeExperience = (value, name, id) => {
    setExperience((prevData) =>
      prevData.map((item) => {
        if (item.id === id) {
          return { ...item, [name]: value };
        }
        return item;
      })
    );
  };

  const validate = () => {
    let errorCount = 0;
    if (!addExperience?.min_ctc) {
      handleError(
        "min_ctc",
        intl.formatMessage({ id: "label.error.fieldEmpty" })
      );
      errorCount += 1;
    }
    if (!addExperience?.work_experience_min) {
      handleError(
        "work_experience_min",
        intl.formatMessage({ id: "label.error.fieldEmpty" })
      );
      errorCount += 1;
    }
    if (
      !addExperience?.work_experience_max &&
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

  const handleAdd = () => {
    if (validate()) {
      setExperience((prevData) => [...prevData, addExperience]);
      setAddExperience({
        id: Date.now(),
        min_ctc: "",
        use_more_experience: 0,
        work_experience_max: null,
        work_experience_min: null,
      });
    }
  };

  const handleRemove = (data) => {
    const filteredData = experience.filter((item) => item.id !== data.id);
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
      bottomSectionStyle={{ minWidth: "980px" }}
      bottomSection={
        <ThreeRow
          className={styles.workExpContainer}
          topSection={
            <TwoColumn
              className={styles.columnCellContainer}
              leftSectionStyle={classes.flex2}
              rightSectionStyle={classes.flex1}
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
          middleSection={
            <div className={styles.addedExperience}>
              {experience.map((item) => {
                return (
                  <TwoColumn
                    key={item?.id}
                    className={styles.columnCellContainer}
                    leftSectionStyle={classes.flex2}
                    rightSectionStyle={classes.flex1}
                    leftSection={
                      <ThreeColumn
                        className={styles.alignCenter}
                        isLeftFillSpace
                        isRightFillSpace
                        leftSection={
                          <CustomInputNumber
                            placeholder={intl.formatMessage({
                              id: "label.from",
                            })}
                            onChange={(val) => {
                              handleInputChangeExperience(
                                val,
                                "work_experience_min",
                                item?.id
                              );
                            }}
                            value={item?.work_experience_min}
                            customInputNumberStyles={
                              styles.customInputNumberStyles
                            }
                            customContainerStyles={styles.customContainerStyles}
                          />
                        }
                        middleSection={<div className={styles.dash} />}
                        rightSection={
                          item?.use_more_experience ? (
                            <CustomInputNumber
                              disabled={true}
                              value={"and more"}
                              customInputNumberStyles={
                                styles.customInputNumberStyles
                              }
                              customContainerStyles={
                                styles.customContainerStyles
                              }
                            />
                          ) : (
                            <CustomInputNumber
                              placeholder={intl.formatMessage({
                                id: "label.to",
                              })}
                              onChange={(val) => {
                                handleInputChangeExperience(
                                  val,
                                  "work_experience_max",
                                  item.id
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
                        className={styles.alignCenter}
                        isLeftFillSpace
                        leftSection={
                          <CustomInputNumber
                            placeholder={intl.formatMessage({
                              id: "session.min_ctc",
                            })}
                            onChange={(val) => {
                              handleInputChangeExperience(
                                val,
                                "min_ctc",
                                item.id
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
                              handleRemove(item);
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
          bottomSectionStyle={classes.bottomSectionStyle}
          bottomSection={
            !isAddmoreSelected && (
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
                      <CustomInputNumber
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
                            <CustomInputNumber
                              disabled={true}
                              value={"and more"}
                              customInputNumberStyles={
                                styles.customInputNumberStyles
                              }
                              customContainerStyles={
                                styles.customContainerStyles
                              }
                            />
                          ) : (
                            <CustomInputNumber
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
                              customContainerStyles={
                                styles.customContainerStyles
                              }
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
                      <CustomInputNumber
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
            )
          }
        />
      }
    />
  );
};

export default WorkExperienceRangeTemplate;
